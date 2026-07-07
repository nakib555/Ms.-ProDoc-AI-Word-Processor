import { PageConfig } from '../types';
import { JSONDocumentModel, jsonDocumentToHtml } from './documentModel';
import {
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
  LayoutEngine,
  LayoutEngineConfiguration,
  LayoutSandboxImpl,
  GeometryCalculator,
  Paginator
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
  LayoutEngine,
  LayoutSandboxImpl
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
    const calculated = GeometryCalculator.calculate(config, DPI);
    this.width = calculated.width;
    this.height = calculated.height;
    this.marginTop = calculated.marginTop;
    this.marginBottom = calculated.marginBottom;
    this.marginLeft = calculated.marginLeft;
    this.marginRight = calculated.marginRight;
    this.bodyWidth = calculated.bodyWidth;
    this.bodyHeight = calculated.bodyHeight;
  }
}

export interface PagePlacementResult {
    pageIndex: number;
    heightUsed: number;
    nodeCount: number;
}


export const paginateContent = (html: string, initialConfig: PageConfig): PaginatorResult => {
  const engineConfig: LayoutEngineConfiguration = {
    pageSize: initialConfig.size || 'Letter',
    dpi: DPI,
    safetyBuffer: SAFETY_BUFFER,
    minLineHeight: MIN_LINE_HEIGHT,
    debug: false,
    diagnosticsEnabled: false
  };

  const engine = new LayoutEngine({
    configuration: engineConfig
  });

  return Paginator.paginate(html, initialConfig, engine);
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
