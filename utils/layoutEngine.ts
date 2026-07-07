import { PageConfig } from '../types';
import { PAGE_SIZES } from '../constants';
import { JSONDocumentModel, jsonDocumentToHtml } from './documentModel';
import {
  LayoutVersion,
  LayoutDiagnostics,
  LayoutState,
  LayoutEnvironmentImpl,
  MeasurementCache,
  MeasurementService,
  PaginationAction,
  OverflowReason,
  getLayoutId,
  isAtomicElement,
  containsPageBreak,
  SplitStatus,
  PaginationDecisionService,
  LayoutEngine,
  LayoutEngineConfiguration
} from './layout';

import type {
  LayoutEnvironment,
  PaginationDecision,
  LayoutContext,
  SplitResult,
  SplitMode,
  OversizedMode,
  BlockPolicy,
  SplitStrategy,
  SplitContext
} from './layout';

export {
  LayoutVersion,
  LayoutDiagnostics,
  LayoutState,
  LayoutEnvironmentImpl,
  MeasurementCache,
  PaginationAction,
  OverflowReason,
  getLayoutId,
  isAtomicElement,
  containsPageBreak,
  SplitStatus,
  LayoutEngine
};

export type {
  LayoutEnvironment,
  PaginationDecision,
  LayoutContext,
  SplitResult,
  SplitMode,
  OversizedMode,
  BlockPolicy,
  SplitStrategy,
  SplitContext,
  LayoutEngineConfiguration
};

const DPI = 96;
const SAFETY_BUFFER = 15; 
const MIN_LINE_HEIGHT = 20;

export interface LayoutBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'table' | 'image' | 'equation' | 'pageBreak' | 'unknown';
  height: number;
  width: number;
  htmlContent: string; // The parsed/rendered visual HTML for this block
  style?: Record<string, string>;
}

export interface LayoutColumn {
  width: number;
  height: number;
  blocks: LayoutBlock[];
}

export interface LayoutPage {
  pageIndex: number;
  width: number;
  height: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  columns: LayoutColumn[];
  config: PageConfig;
}

export interface LayoutTree {
  documentId: string;
  width: number;
  height: number;
  pages: LayoutPage[];
}

export interface PaginatorResult {
    pages: { html: string, config: PageConfig }[];
    pageHeight: number;
    pageWidth: number;
}

class PageFrame {
  width: number;
  height: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  bodyWidth: number;
  bodyHeight: number;

  constructor(config: PageConfig) {
    const base = PAGE_SIZES[config.size as string] || PAGE_SIZES['Letter'];
    let baseW = base.width;
    let baseH = base.height;
    if (config.size === 'Custom' && config.customWidth && config.customHeight) {
        baseW = config.customWidth * DPI;
        baseH = config.customHeight * DPI;
    }

    if (config.orientation === 'portrait') {
        this.width = baseW;
        this.height = baseH;
    } else {
        this.width = baseH;
        this.height = baseW;
    }

    const headerDistPx = (config.headerDistance || 0) * DPI;
    const footerDistPx = (config.footerDistance || 0) * DPI;

    this.marginTop = Math.max(config.margins.top * DPI, headerDistPx);
    this.marginBottom = Math.max(config.margins.bottom * DPI, footerDistPx);
    this.marginLeft = config.margins.left * DPI;
    this.marginRight = config.margins.right * DPI;

    const gutterPx = (config.margins.gutter || 0) * DPI;
    if (config.gutterPosition === 'top') {
      this.marginTop += gutterPx;
    } else {
      this.marginLeft += gutterPx;
    }

    this.bodyWidth = Math.max(0, this.width - (this.marginLeft + this.marginRight));
    this.bodyHeight = Math.max(0, this.height - (this.marginTop + this.marginBottom));
  }
}

class LayoutSandbox {
  el: HTMLElement;
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'prodoc-editor text-lg leading-loose text-slate-900'; 
    this.el.style.position = 'absolute';
    this.el.style.visibility = 'hidden';
    this.el.style.height = 'auto';
    this.el.style.top = '-10000px';
    this.el.style.left = '-10000px';
    this.el.style.padding = '0';
    this.el.style.margin = '0';
    this.el.style.fontFamily = 'Calibri, Inter, sans-serif';
    this.el.style.wordWrap = 'break-word';
    this.el.style.overflowWrap = 'break-word';
    this.el.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(this.el);
  }
  setWidth(width: number) { this.el.style.width = `${width}px`; }
  measure(node: Node, cache?: MeasurementCache, width?: number): number {
    if (node.nodeType === Node.ELEMENT_NODE && cache) {
        const el = node as HTMLElement;
        const cached = cache.get(el, width || 0);
        if (cached !== undefined) return cached;
    }
    this.el.innerHTML = '';
    this.el.appendChild(node.cloneNode(true));
    const height = this.el.getBoundingClientRect().height;
    if (node.nodeType === Node.ELEMENT_NODE && cache) {
        cache.set(node as HTMLElement, height, width || 0);
    }
    return height;
  }
  destroy() { if (this.el.parentNode) this.el.parentNode.removeChild(this.el); }
}

export interface PagePlacementResult {
    pageIndex: number;
    heightUsed: number;
    nodeCount: number;
}


export const paginateContent = (html: string, initialConfig: PageConfig): PaginatorResult => {
  if (typeof document === 'undefined') return { pages: [{ html, config: initialConfig }], pageHeight: 0, pageWidth: 0 };
  const initialFrame = new PageFrame(initialConfig);
  const sandbox = new LayoutSandbox();
  
  try {
      const pages: { html: string, config: PageConfig }[] = [];

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const body = doc.body;

      const splitTables = Array.from(body.querySelectorAll('table[data-continuation="true"]'));
      splitTables.forEach(splitTable => {
          // Remove any repeated headers in the split part before merging back
          const repeatedHeaders = Array.from(splitTable.querySelectorAll('tr[data-repeated-header-row="true"]'));
          repeatedHeaders.forEach(row => row.remove());

          const prev = splitTable.previousElementSibling;
          if (prev && prev.tagName === 'TABLE') {
              while (splitTable.firstChild) prev.appendChild(splitTable.firstChild);
              prev.removeAttribute('data-split-bottom');
              splitTable.remove();
          } else {
              splitTable.removeAttribute('data-continuation');
          }
      });

      const nodes: HTMLElement[] = [];
      Array.from(body.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
              if (node.textContent && (node.textContent.trim() || node.textContent.includes('\n'))) {
                  const p = document.createElement('p');
                  p.appendChild(node.cloneNode(true));
                  nodes.push(p);
              }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
              nodes.push(node.cloneNode(true) as HTMLElement);
          }
      });

      let currentConfig = { ...initialConfig };
      let currentFrame = new PageFrame(currentConfig);
      
      // Multi-column support logic
      const getEffectiveDimensions = (frame: PageFrame, config: PageConfig) => {
          const cols = config.columns || 1;
          const gap = (config.columnGap || 0.5) * DPI;
          const effectiveWidth = (frame.bodyWidth - (cols - 1) * gap) / cols;
          const effectiveHeight = frame.bodyHeight * cols;
          return { effectiveWidth, effectiveHeight };
      };

      let { effectiveWidth, effectiveHeight } = getEffectiveDimensions(currentFrame, currentConfig);
      sandbox.setWidth(effectiveWidth);

      let currentPageNodes: HTMLElement[] = [];
      let currentH = 0;
      let lastWasBreak = false; // Track if the last item processed forced a break

      const flushPage = () => {
          const div = document.createElement('div');
          currentPageNodes.forEach(n => div.appendChild(n));
          pages.push({ html: div.innerHTML, config: { ...currentConfig } });
          currentPageNodes = [];
          currentH = 0;
      };

      // Initialize LayoutEngine
      const engineConfig: LayoutEngineConfiguration = {
          pageSize: currentConfig.size || 'Letter',
          dpi: DPI,
          safetyBuffer: SAFETY_BUFFER,
          minLineHeight: MIN_LINE_HEIGHT,
          debug: false,
          diagnosticsEnabled: false
      };

      const engine = new LayoutEngine({
          configuration: engineConfig
      });

      // Initialize LayoutContext
      const layoutVersion = new LayoutVersion();
      const environment = new LayoutEnvironmentImpl(currentConfig, false);
      const state = new LayoutState();
      const diagnostics = new LayoutDiagnostics(false);
      const measuredCache = new MeasurementCache(layoutVersion);
      const measurementService = new MeasurementService(sandbox, measuredCache);

      const context: LayoutContext = {
          engine,
          environment,
          state,
          diagnostics,
          measurementService
      };

      for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // 1. Handle Section Breaks
          if (node.classList?.contains('prodoc-section-break')) {
              const configData = node.getAttribute('data-config');
              if (configData) {
                  try {
                      const newSettings = JSON.parse(decodeURIComponent(configData));
                      currentConfig = { ...currentConfig, ...newSettings };
                      currentFrame = new PageFrame(currentConfig);
                      const dims = getEffectiveDimensions(currentFrame, currentConfig);
                      effectiveWidth = dims.effectiveWidth;
                      effectiveHeight = dims.effectiveHeight;
                      sandbox.setWidth(effectiveWidth);
                      
                      // Update the context environment
                      context.environment = new LayoutEnvironmentImpl(currentConfig, false);
                      layoutVersion.increment();
                  } catch (e) { console.error("Failed to parse section break", e); }
              }
              if (currentPageNodes.length > 0) {
                  flushPage();
              } else if (pages.length === 0) { // Force blank first page if section break is first item
                  pages.push({ html: '<p><br/></p>', config: initialConfig }); 
              }
              lastWasBreak = true;
              continue;
          }

          lastWasBreak = false;

          // Check if we need to flush page before we start measuring the next block
          const remainingForStart = Math.max(0, effectiveHeight - currentH - SAFETY_BUFFER);
          if (currentH > 0 && remainingForStart < MIN_LINE_HEIGHT) {
              flushPage();
              i--;
              continue;
          }

          // Measure the node height (utilizing MeasurementCache & MeasurementService)
          const nodeH = context.measurementService.measure(node, effectiveWidth);

          // Get decision from our Pagination Decision engine
          const decision = PaginationDecisionService.decide(
              node,
              nodeH,
              currentH,
              effectiveHeight,
              context,
              effectiveWidth,
              state.currentPageIndex,
              state.currentColumnIndex,
              layoutVersion.get()
          );

          context.diagnostics.log(`Decision for node ${getLayoutId(node)}: Action=${PaginationAction[decision.action]}, NodeHeight=${nodeH}, CurrentHeight=${currentH}`);

          switch (decision.action) {
              case PaginationAction.Place:
                  currentPageNodes.push(node);
                  currentH += nodeH;
                  break;

              case PaginationAction.MoveNextPage:
                  if (currentPageNodes.length > 0) {
                      flushPage();
                      i--; // retry on next page
                  } else {
                      // If page is already empty, force place it to prevent infinite loop
                      currentPageNodes.push(node);
                      currentH += nodeH;
                  }
                  break;

              case PaginationAction.ForceOverflow:
                  currentPageNodes.push(node);
                  currentH += nodeH;
                  flushPage();
                  break;

              case PaginationAction.Split:
                  if (decision.keep && (decision.keep.hasChildNodes() || decision.keep.tagName === 'IMG' || decision.keep.tagName === 'TABLE')) {
                      currentPageNodes.push(decision.keep);
                      flushPage();
                      if (decision.move && (decision.move.hasChildNodes() || decision.move.tagName === 'IMG' || decision.move.tagName === 'TABLE')) {
                          // Clear layout ID of the move-part to allow fresh processing
                          decision.move.removeAttribute('data-layout-id');
                          nodes[i] = decision.move;
                          i--; // retry on next page with remaining part
                      }
                  } else {
                      if (currentPageNodes.length > 0) {
                          flushPage();
                          i--; // retry entire node on empty page
                      } else {
                          // If page is empty and we can't keep anything, force place entire node
                          currentPageNodes.push(node);
                          currentH += nodeH;
                      }
                  }
                  break;

              case PaginationAction.Atomic:
                  // For atomic elements that don't fit, we either move to next page or force place
                  if (currentPageNodes.length > 0) {
                      flushPage();
                      i--; // retry on next page
                  } else {
                      currentPageNodes.push(node);
                      currentH += nodeH;
                      flushPage();
                  }
                  break;
          }
      }

      if (currentPageNodes.length > 0) {
          flushPage();
      } else if (lastWasBreak || pages.length === 0) {
          // If document ends with a break (page or section), force a new blank page
          pages.push({ html: '<p><br></p>', config: { ...currentConfig } });
      }

      return { pages, pageHeight: initialFrame.height, pageWidth: initialFrame.width };
  } finally {
      sandbox.destroy();
  }
};

/**
 * Computes a target-agnostic, platform-independent virtual Layout Tree
 * from a canonical JSONDocumentModel structure.
 */
export function computeLayoutTree(doc: JSONDocumentModel): LayoutTree {
  const html = jsonDocumentToHtml(doc);
  const paginated = paginateContent(html, doc.pageConfig);
  const frame = new PageFrame(doc.pageConfig);

  const pages: LayoutPage[] = paginated.pages.map((p, pIdx) => {
    let blocks: LayoutBlock[] = [];
    if (typeof document !== 'undefined') {
      const parser = new DOMParser();
      const parsedDoc = parser.parseFromString(p.html, 'text/html');
      const body = parsedDoc.body;
      
      blocks = Array.from(body.children).map((el, bIdx) => {
        const element = el as HTMLElement;
        let type: LayoutBlock['type'] = 'paragraph';
        if (element.tagName.startsWith('H')) type = 'heading';
        else if (element.tagName === 'TABLE') type = 'table';
        else if (element.querySelector('img') || element.tagName === 'IMG') type = 'image';
        else if (element.classList.contains('equation-wrapper')) type = 'equation';
        else if (element.classList.contains('prodoc-page-break')) type = 'pageBreak';

        return {
          id: element.id || `layout-block-${pIdx}-${bIdx}`,
          type,
          height: element.getBoundingClientRect?.().height || MIN_LINE_HEIGHT,
          width: element.getBoundingClientRect?.().width || frame.bodyWidth,
          htmlContent: element.outerHTML,
          style: {
            textAlign: element.style.textAlign || 'left',
            marginTop: element.style.marginTop || '',
            marginBottom: element.style.marginBottom || '',
            marginLeft: element.style.marginLeft || ''
          }
        };
      });
    }

    const column: LayoutColumn = {
      width: frame.bodyWidth,
      height: frame.bodyHeight,
      blocks
    };

    return {
      pageIndex: pIdx,
      width: frame.width,
      height: frame.height,
      marginTop: frame.marginTop,
      marginBottom: frame.marginBottom,
      marginLeft: frame.marginLeft,
      marginRight: frame.marginRight,
      columns: [column],
      config: p.config
    };
  });

  return {
    documentId: 'doc-canonical',
    width: frame.width,
    height: frame.height,
    pages
  };
}
