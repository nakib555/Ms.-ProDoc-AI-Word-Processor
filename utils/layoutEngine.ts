
import { PageConfig } from '../types';
import { PAGE_SIZES } from '../constants';

// Standard print DPI
const DPI = 96;

// Safety buffer to prevent content from touching the exact pixel edge of the margin
// helping to avoid "shived" (cut off) rendering at the bottom.
// Increased to 15px to ensure clear separation and prevent table borders from being clipped.
const SAFETY_BUFFER = 15; 

// Minimum space required to attempt fitting content. 
// If remaining space is less than this (approx one line), move to next page.
const MIN_LINE_HEIGHT = 20;

// Result now includes config per page
export interface PaginatorResult {
    pages: { html: string, config: PageConfig }[];
    pageHeight: number; // Kept for compatibility, represents first page
    pageWidth: number; // Kept for compatibility, represents first page
}

/**
 * PageFrame: Defines the constraints of a page layout.
 */
class PageFrame {
  width: number;
  height: number;
  
  // Margins in pixels
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  
  // The writable area dimensions
  bodyWidth: number;
  bodyHeight: number;

  constructor(config: PageConfig) {
    const base = PAGE_SIZES[config.size as string] || PAGE_SIZES['Letter'];
    
    // Handle custom sizes or presets
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

/**
 * LayoutSandbox: An off-screen DOM environment for measuring content.
 */
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

  setWidth(width: number) {
      this.el.style.width = `${width}px`;
  }

  measure(node: Node): number {
    this.el.innerHTML = '';
    this.el.appendChild(node.cloneNode(true));
    // Use offsetHeight to capture borders/padding accurately
    return this.el.getBoundingClientRect().height;
  }

  destroy() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}

const isAtomic = (node: Node): boolean => {
    if (node.nodeType !== Node.ELEMENT_NODE) return false;
    const el = node as HTMLElement;
    return ['IMG', 'VIDEO', 'IFRAME', 'HR', 'MATH-FIELD'].includes(el.tagName) ||
           el.classList.contains('equation-wrapper') ||
           el.classList.contains('prodoc-page-break') ||
           el.classList.contains('prodoc-section-break');
};

const splitBlock = (
    originalNode: HTMLElement, 
    remainingHeight: number, 
    sandbox: LayoutSandbox
): { keep: HTMLElement | null, move: HTMLElement | null } => {
    
    // Apply strict safety buffer to splitting logic
    const effectiveLimit = Math.max(0, remainingHeight - SAFETY_BUFFER);

    if (isAtomic(originalNode)) {
        return { keep: null, move: originalNode.cloneNode(true) as HTMLElement };
    }

    // --- MS WORD-LIKE TABLE SPLITTING LOGIC ---
    if (originalNode.tagName === 'TABLE') {
        const table = originalNode as HTMLTableElement;
        const rows = Array.from(table.rows);

        // Prepare Clone Containers
        const keepTable = table.cloneNode(false) as HTMLTableElement;
        const moveTable = table.cloneNode(false) as HTMLTableElement;

        // Sandbox for incremental measurement
        sandbox.el.innerHTML = '';
        const measureTable = table.cloneNode(false) as HTMLTableElement;
        sandbox.el.appendChild(measureTable);

        let splitIndex = 0;
        
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i].cloneNode(true) as HTMLTableRowElement;
            measureTable.appendChild(row);
            
            const newTotalHeight = measureTable.getBoundingClientRect().height;
            
            // Strict check: If adding this row exceeds the limit.
            if (newTotalHeight > effectiveLimit) {
                // This row causes overflow.
                
                // Rule 1: If it's the very first row, the whole table must move to next page.
                if (i === 0) {
                     return { keep: null, move: originalNode.cloneNode(true) as HTMLElement };
                }
                
                // Split here: Previous rows stay, this row and subsequent go to moveTable
                splitIndex = i;
                break;
            }
            
            // If we reached the end and it all fits
            if (i === rows.length - 1) {
                splitIndex = rows.length;
            }
        }

        // If all fit
        if (splitIndex === rows.length) {
             return { keep: originalNode.cloneNode(true) as HTMLElement, move: null };
        }

        // Populate Keep Table
        for (let i = 0; i < splitIndex; i++) {
            keepTable.appendChild(rows[i].cloneNode(true));
        }

        // Populate Move Table
        for (let i = splitIndex; i < rows.length; i++) {
            moveTable.appendChild(rows[i].cloneNode(true));
        }

        // Mark the moveTable as a continuation caused by page break
        moveTable.setAttribute('data-continuation', 'true');

        return { keep: keepTable, move: moveTable };
    }
    // --- END TABLE LOGIC ---

    sandbox.el.innerHTML = '';
    const keepNode = originalNode.cloneNode(false) as HTMLElement;
    sandbox.el.appendChild(keepNode);
    const moveNode = originalNode.cloneNode(false) as HTMLElement;

    const findBinarySplitIndex = (text: string, parent: HTMLElement): number => {
        let low = 0;
        let high = text.length;
        let best = 0;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const sub = text.substring(0, mid);
            const tempNode = document.createTextNode(sub);
            parent.appendChild(tempNode);
            
            const h = keepNode.getBoundingClientRect().height;
            parent.removeChild(tempNode);
            
            // Strict check against effective limit
            if (h <= effectiveLimit) {
                best = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return best;
    };

    const moveSiblings = (nodes: Node[], startIdx: number, target: HTMLElement) => {
        for (let i = startIdx; i < nodes.length; i++) {
            target.appendChild(nodes[i].cloneNode(true));
        }
    };

    const processNodes = (nodes: Node[], parentKeep: HTMLElement, parentMove: HTMLElement): boolean => {
        for (let i = 0; i < nodes.length; i++) {
            const child = nodes[i];
            const childClone = child.cloneNode(true);
            parentKeep.appendChild(childClone);
            
            const currentHeight = keepNode.getBoundingClientRect().height;
            
            if (currentHeight <= effectiveLimit) {
                continue;
            }
            
            parentKeep.removeChild(childClone);
            
            if (isAtomic(child)) {
                parentMove.appendChild(child.cloneNode(true));
                moveSiblings(nodes, i + 1, parentMove);
                return true;
            }
            
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent || '';
                const splitIndex = findBinarySplitIndex(text, parentKeep);
                
                if (splitIndex > 0) {
                    parentKeep.appendChild(document.createTextNode(text.substring(0, splitIndex)));
                }
                const remainder = text.substring(splitIndex);
                if (remainder || splitIndex === 0) {
                    parentMove.appendChild(document.createTextNode(remainder));
                }
                
                moveSiblings(nodes, i + 1, parentMove);
                return true;
            }
            
            if (child.nodeType === Node.ELEMENT_NODE) {
                const el = child as HTMLElement;
                const childKeep = el.cloneNode(false) as HTMLElement;
                const childMove = el.cloneNode(false) as HTMLElement;
                
                parentKeep.appendChild(childKeep);
                
                if (keepNode.getBoundingClientRect().height > effectiveLimit) {
                    parentKeep.removeChild(childKeep);
                    parentMove.appendChild(el.cloneNode(true));
                    moveSiblings(nodes, i + 1, parentMove);
                    return true;
                }
                
                const childNodes = Array.from(el.childNodes);
                const didSplitInside = processNodes(childNodes, childKeep, childMove);
                
                parentMove.appendChild(childMove);
                
                if (didSplitInside) {
                    moveSiblings(nodes, i + 1, parentMove);
                    return true;
                }
            }
        }
        return false;
    };

    const originalChildren = Array.from(originalNode.childNodes);
    processNodes(originalChildren, keepNode, moveNode);

    if (!keepNode.hasChildNodes() && moveNode.hasChildNodes()) {
        return { keep: null, move: moveNode };
    }

    return { keep: keepNode, move: moveNode };
};

export const paginateContent = (html: string, initialConfig: PageConfig): PaginatorResult => {
  const initialFrame = new PageFrame(initialConfig);

  if (typeof document === 'undefined') {
    return { pages: [{ html, config: initialConfig }], pageHeight: initialFrame.height, pageWidth: initialFrame.width };
  }

  const sandbox = new LayoutSandbox();
  const pages: { html: string, config: PageConfig }[] = [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  // Dynamic Table Merging Logic
  const splitTables = Array.from(body.querySelectorAll('table[data-continuation="true"]'));
  splitTables.forEach(splitTable => {
      const prev = splitTable.previousElementSibling;
      if (prev && prev.tagName === 'TABLE') {
          while (splitTable.firstChild) {
              prev.appendChild(splitTable.firstChild);
          }
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
  sandbox.setWidth(currentFrame.bodyWidth);

  let currentPageNodes: HTMLElement[] = [];
  let currentH = 0;

  const flushPage = () => {
      const div = document.createElement('div');
      currentPageNodes.forEach(n => div.appendChild(n));
      pages.push({ html: div.innerHTML, config: { ...currentConfig } });
      currentPageNodes = [];
      currentH = 0;
  };

  for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];

      // Handle Section Break (Changes Layout)
      if (node.classList?.contains('prodoc-section-break')) {
          const configData = node.getAttribute('data-config');
          if (configData) {
              try {
                  const newSettings = JSON.parse(decodeURIComponent(configData));
                  currentConfig = { ...currentConfig, ...newSettings };
                  currentFrame = new PageFrame(currentConfig);
                  sandbox.setWidth(currentFrame.bodyWidth);
              } catch (e) {
                  console.error("Failed to parse section break config", e);
              }
          }
          
          currentPageNodes.push(node);
          flushPage(); 
          continue;
      }

      // Handle Page Break
      const isPageBreak = node.classList?.contains('prodoc-page-break') || 
                          node.style?.pageBreakAfter === 'always' ||
                          node.style?.breakAfter === 'page';

      if (isPageBreak) {
          currentPageNodes.push(node);
          flushPage(); 
          continue; 
      }

      // Check remaining space. If it's very small (tiny gap), force a page break 
      // before we even measure the new node. This prevents trying to cram 
      // content into a space smaller than SAFETY_BUFFER + MIN_LINE_HEIGHT.
      const remainingForStart = Math.max(0, currentFrame.bodyHeight - currentH - SAFETY_BUFFER);
      if (currentH > 0 && remainingForStart < MIN_LINE_HEIGHT) {
          flushPage();
          i--; // Re-process node on new page
          continue;
      }

      // Measure
      const nodeH = sandbox.measure(node);

      // Compare with safety buffer included to ensure bottom clearance
      if (currentH + nodeH > currentFrame.bodyHeight - SAFETY_BUFFER) {
          const remainingSpace = Math.max(0, currentFrame.bodyHeight - currentH);
          
          const split = splitBlock(node, remainingSpace, sandbox);

          if (split.keep && (split.keep.hasChildNodes() || split.keep.tagName === 'IMG' || split.keep.tagName === 'TABLE')) {
              currentPageNodes.push(split.keep);
              flushPage(); 
              
              if (split.move && (split.move.hasChildNodes() || split.move.tagName === 'IMG' || split.move.tagName === 'TABLE')) {
                  nodes[i] = split.move;
                  i--; // Re-process remainder
              }
          } else {
              if (currentPageNodes.length > 0) {
                  flushPage();
                  i--; 
              } else {
                  // Fallback for oversized single elements that fit nowhere
                  currentPageNodes.push(node);
                  flushPage();
              }
          }
      } else {
          currentPageNodes.push(node);
          currentH += nodeH;
      }
  }

  if (currentPageNodes.length > 0) {
      flushPage();
  }

  if (pages.length === 0) {
      pages.push({ html: '<p><br></p>', config: initialConfig });
  }

  sandbox.destroy();

  return {
      pages,
      pageHeight: initialFrame.height,
      pageWidth: initialFrame.width
  };
};
