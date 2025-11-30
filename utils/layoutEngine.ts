
import { PageConfig, PaginatorResult } from '../types';
import { PAGE_SIZES } from '../constants';

// Standard print DPI
const DPI = 96;

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
    
    if (config.orientation === 'portrait') {
        this.width = config.size === 'Custom' && config.customWidth ? config.customWidth * DPI : base.width;
        this.height = config.size === 'Custom' && config.customHeight ? config.customHeight * DPI : base.height;
    } else {
        this.width = config.size === 'Custom' && config.customHeight ? config.customHeight * DPI : base.height;
        this.height = config.size === 'Custom' && config.customWidth ? config.customWidth * DPI : base.width;
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

  constructor(width: number) {
    this.el = document.createElement('div');
    this.el.className = 'prodoc-editor text-lg leading-loose text-slate-900'; 
    this.el.style.position = 'absolute';
    this.el.style.visibility = 'hidden';
    this.el.style.width = `${width}px`;
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

  measure(node: Node): number {
    this.el.innerHTML = '';
    this.el.appendChild(node.cloneNode(true));
    return this.el.getBoundingClientRect().height;
  }

  destroy() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}

// Helper to check if node is atomic (should not be split)
const isAtomic = (node: Node): boolean => {
    if (node.nodeType !== Node.ELEMENT_NODE) return false;
    const el = node as HTMLElement;
    return ['IMG', 'VIDEO', 'TABLE', 'IFRAME', 'HR', 'MATH-FIELD'].includes(el.tagName) ||
           el.classList.contains('equation-wrapper') ||
           el.classList.contains('prodoc-page-break');
};

/**
 * Recursively splits a node to fit within remainingHeight.
 * Uses binary search for text nodes and recursion for element nodes.
 */
const splitBlock = (
    originalNode: HTMLElement, 
    remainingHeight: number, 
    sandbox: LayoutSandbox
): { keep: HTMLElement | null, move: HTMLElement | null } => {
    
    // 1. Check Atomic
    if (isAtomic(originalNode)) {
        return { keep: null, move: originalNode.cloneNode(true) as HTMLElement };
    }

    // 2. Prepare Sandbox
    sandbox.el.innerHTML = '';
    // Create the root container for 'keep' part
    const keepNode = originalNode.cloneNode(false) as HTMLElement;
    sandbox.el.appendChild(keepNode);
    
    // Create the root container for 'move' part
    const moveNode = originalNode.cloneNode(false) as HTMLElement;

    // Helper: Binary Search for Text Node Split
    const findBinarySplitIndex = (text: string, parent: HTMLElement): number => {
        let low = 0;
        let high = text.length;
        let best = 0;
        
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            // Try substring
            const sub = text.substring(0, mid);
            // We temporarily add text to measure
            const tempNode = document.createTextNode(sub);
            parent.appendChild(tempNode);
            
            // Measure the WHOLE block from the sandbox root
            // This accounts for all wrapping context
            const h = keepNode.getBoundingClientRect().height;
            parent.removeChild(tempNode);
            
            if (h <= remainingHeight) {
                best = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return best;
    };

    // Helper: Move remaining siblings to moveNode
    const moveSiblings = (nodes: Node[], startIdx: number, target: HTMLElement) => {
        for (let i = startIdx; i < nodes.length; i++) {
            target.appendChild(nodes[i].cloneNode(true));
        }
    };

    // Recursive processor
    const processNodes = (nodes: Node[], parentKeep: HTMLElement, parentMove: HTMLElement): boolean => {
        for (let i = 0; i < nodes.length; i++) {
            const child = nodes[i];
            
            // A. Try adding the whole child to Keep
            const childClone = child.cloneNode(true);
            parentKeep.appendChild(childClone);
            
            // Measure
            const currentHeight = keepNode.getBoundingClientRect().height;
            
            if (currentHeight <= remainingHeight) {
                // Fits!
                continue;
            }
            
            // B. Overflow Detected
            parentKeep.removeChild(childClone); // Backtrack
            
            // If atomic, it must move entirely
            if (isAtomic(child)) {
                parentMove.appendChild(child.cloneNode(true));
                moveSiblings(nodes, i + 1, parentMove);
                return true; // Split occurred
            }
            
            // If Text, binary search split
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent || '';
                const splitIndex = findBinarySplitIndex(text, parentKeep);
                
                // Add fitting part
                if (splitIndex > 0) {
                    parentKeep.appendChild(document.createTextNode(text.substring(0, splitIndex)));
                }
                
                // Add moving part
                const remainder = text.substring(splitIndex);
                // Even if empty string (unlikely if loop correct), good to be safe
                if (remainder || splitIndex === 0) {
                    parentMove.appendChild(document.createTextNode(remainder));
                }
                
                moveSiblings(nodes, i + 1, parentMove);
                return true;
            }
            
            // If Element, recurse
            if (child.nodeType === Node.ELEMENT_NODE) {
                const el = child as HTMLElement;
                const childKeep = el.cloneNode(false) as HTMLElement;
                const childMove = el.cloneNode(false) as HTMLElement;
                
                parentKeep.appendChild(childKeep);
                
                // Quick check: does empty container overflow? (e.g. padding/border)
                if (keepNode.getBoundingClientRect().height > remainingHeight) {
                    parentKeep.removeChild(childKeep);
                    parentMove.appendChild(el.cloneNode(true));
                    moveSiblings(nodes, i + 1, parentMove);
                    return true;
                }
                
                const childNodes = Array.from(el.childNodes);
                const didSplitInside = processNodes(childNodes, childKeep, childMove);
                
                // Always add the move structure if we entered recursion
                parentMove.appendChild(childMove);
                
                if (didSplitInside) {
                    moveSiblings(nodes, i + 1, parentMove);
                    return true;
                }
                
                // If we reach here, processNodes returned false, meaning all children fit?
                // But we established earlier that `childClone` (whole) DID NOT fit.
                // This implies wrapping overhead or inline complexity.
                // Logic dictates `processNodes` will eventually hit a text node or atomic that overflows.
            }
        }
        return false;
    };

    const originalChildren = Array.from(originalNode.childNodes);
    processNodes(originalChildren, keepNode, moveNode);

    // If keepNode is empty but moveNode isn't, it means NOTHING fit.
    // Return null to indicate the whole block should move to next page
    if (!keepNode.hasChildNodes() && moveNode.hasChildNodes()) {
        return { keep: null, move: moveNode };
    }

    return { keep: keepNode, move: moveNode };
};

/**
 * Main Pagination Function
 */
export const paginateContent = (html: string, config: PageConfig): PaginatorResult => {
  if (typeof document === 'undefined') {
    const frame = new PageFrame(config);
    return { pages: [html], pageHeight: frame.height, pageWidth: frame.width };
  }

  const frame = new PageFrame(config);
  const sandbox = new LayoutSandbox(frame.bodyWidth);
  const pages: string[] = [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  // Normalize nodes
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

  let currentPageNodes: HTMLElement[] = [];
  let currentH = 0;

  const flushPage = () => {
      const div = document.createElement('div');
      currentPageNodes.forEach(n => div.appendChild(n));
      pages.push(div.innerHTML);
      currentPageNodes = [];
      currentH = 0;
  };

  for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i];

      // Explicit Breaks
      const isBreak = node.classList?.contains('prodoc-page-break') || 
                      node.style?.pageBreakAfter === 'always' ||
                      node.style?.breakAfter === 'page';

      if (isBreak) {
          currentPageNodes.push(node);
          flushPage(); 
          continue; 
      }

      // Measure entire node first
      const nodeH = sandbox.measure(node);

      // Check if it fits
      // Using a small tolerance (0.5) to handle sub-pixel differences
      if (currentH + nodeH > frame.bodyHeight + 0.5) {
          // It overflows. Try to split it.
          const remainingSpace = Math.max(0, frame.bodyHeight - currentH);
          
          const split = splitBlock(node, remainingSpace, sandbox);

          if (split.keep && split.keep.hasChildNodes()) {
              // We successfully fit a piece on this page
              currentPageNodes.push(split.keep);
              flushPage(); // Close this page
              
              // Process the remainder on the next page
              if (split.move && split.move.hasChildNodes()) {
                  // We update the current node in iteration to be the remainder
                  // and decrement i to re-process it for the next page (in case it needs splitting again!)
                  nodes[i] = split.move;
                  i--; 
              }
          } else {
              // Could not split or nothing fit.
              if (currentPageNodes.length > 0) {
                  // Flush current page and push whole node to next
                  flushPage();
                  i--; 
              } else {
                  // If page is empty and it still doesn't fit, it's just too big (huge image?)
                  // Place it anyway to avoid infinite loop
                  currentPageNodes.push(node);
                  flushPage();
              }
          }
      } else {
          // Fits
          currentPageNodes.push(node);
          currentH += nodeH;
      }
  }

  if (currentPageNodes.length > 0) {
      flushPage();
  }

  if (pages.length === 0) {
      pages.push('<p><br></p>');
  }

  sandbox.destroy();

  return {
      pages,
      pageHeight: frame.height,
      pageWidth: frame.width
  };
};
