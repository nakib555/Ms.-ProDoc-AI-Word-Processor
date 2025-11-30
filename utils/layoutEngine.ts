
import { PageConfig, PaginatorResult } from '../types';
import { PAGE_SIZES } from '../constants';

// Standard print DPI
const DPI = 96;

/**
 * PageFrame: Defines the constraints of a page layout.
 * Enforces MS Word-like absolute boundaries where content cannot
 * flow into the header/footer zones defined by their distance from edge
 * if that distance exceeds the margins.
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
    
    // 1. Determine Sheet Dimensions
    if (config.orientation === 'portrait') {
        this.width = config.size === 'Custom' && config.customWidth ? config.customWidth * DPI : base.width;
        this.height = config.size === 'Custom' && config.customHeight ? config.customHeight * DPI : base.height;
    } else {
        // Landscape swap
        this.width = config.size === 'Custom' && config.customHeight ? config.customHeight * DPI : base.height;
        this.height = config.size === 'Custom' && config.customWidth ? config.customWidth * DPI : base.width;
    }

    // 2. Calculate Margins with Absolute Boundary Protection
    // "First page top header is the absolute margin"
    // Content starts strictly below the header distance zone if margin is smaller.
    const headerDistPx = (config.headerDistance || 0) * DPI;
    const footerDistPx = (config.footerDistance || 0) * DPI;

    this.marginTop = Math.max(config.margins.top * DPI, headerDistPx);
    this.marginBottom = Math.max(config.margins.bottom * DPI, footerDistPx);
    
    this.marginLeft = config.margins.left * DPI;
    this.marginRight = config.margins.right * DPI;

    // 3. Apply Gutter
    // Gutter reduces the writable area either from left or top
    const gutterPx = (config.margins.gutter || 0) * DPI;
    if (config.gutterPosition === 'top') {
      this.marginTop += gutterPx;
    } else {
      this.marginLeft += gutterPx;
    }

    // 4. Calculate Body Frame
    // This is the "safe zone" for main flow text.
    this.bodyWidth = Math.max(0, this.width - (this.marginLeft + this.marginRight));
    this.bodyHeight = Math.max(0, this.height - (this.marginTop + this.marginBottom));
  }
}

/**
 * LayoutSandbox: An off-screen DOM environment for measuring content
 * accurately using the browser's rendering engine.
 */
class LayoutSandbox {
  private el: HTMLElement;

  constructor(width: number) {
    this.el = document.createElement('div');
    // Apply editor classes to ensure font/line-height matches exactly
    this.el.className = 'prodoc-editor'; 
    this.el.style.position = 'absolute';
    this.el.style.visibility = 'hidden';
    this.el.style.width = `${width}px`;
    this.el.style.height = 'auto';
    this.el.style.top = '-10000px';
    this.el.style.left = '-10000px';
    this.el.style.padding = '0';
    this.el.style.margin = '0';
    // Ensure word-break matches editor to guarantee accurate splits
    this.el.style.wordWrap = 'break-word';
    this.el.style.overflowWrap = 'break-word';
    this.el.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(this.el);
  }

  measure(node: Node): number {
    this.el.innerHTML = '';
    this.el.appendChild(node.cloneNode(true));
    // Use getBoundingClientRect for sub-pixel precision which is crucial for page breaks
    const rect = this.el.getBoundingClientRect();
    return rect.height;
  }

  /**
   * Attempts to split a large node that doesn't fit.
   * Uses a text-based heuristic to split paragraphs.
   */
  splitNode(node: HTMLElement, remainingHeight: number): { keep: HTMLElement, move: HTMLElement } | null {
    // Only attempt split on flow content
    const validTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'DIV', 'BLOCKQUOTE'];
    if (!validTags.includes(node.tagName)) return null;
    
    // Don't split complex atomic elements or if remaining space is too small (orphans)
    // Assuming roughly 18px per line min
    if (remainingHeight < 18 || node.querySelector('img, table, video, iframe, hr, .equation-wrapper')) return null;

    const clone = node.cloneNode(true) as HTMLElement;
    this.el.innerHTML = '';
    this.el.appendChild(clone);

    // Get plain text words to perform binary search split
    // This assumes simple text flow. Complex nested spans might lose formatting in this naive split,
    // but preserving structure is extremely complex for a client-side text editor.
    // We treat the block as text-dominant.
    const words = clone.innerText.split(' ');
    if (words.length < 2) return null;

    let low = 0;
    let high = words.length - 1;
    let bestSplitIndex = 0;

    // Binary search for the maximum amount of text that fits in `remainingHeight`
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        // Try fitting first 'mid' words
        const testText = words.slice(0, mid).join(' ');
        clone.innerText = testText || '\u00A0'; // Use nbsp if empty to maintain line height
        
        // Measure
        const height = this.el.getBoundingClientRect().height;

        if (height <= remainingHeight) {
            bestSplitIndex = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    if (bestSplitIndex === 0) return null; // Can't even fit the first word

    // Construct the split nodes
    // Note: This approach simplifies the node to plain text. 
    // Ideally, we'd walk the DOM tree to split, but for this demo, text splitting is the compromise.
    const keepNode = node.cloneNode(false) as HTMLElement;
    const moveNode = node.cloneNode(false) as HTMLElement;

    keepNode.innerText = words.slice(0, bestSplitIndex).join(' ');
    moveNode.innerText = words.slice(bestSplitIndex).join(' ');

    // If the move node is empty or just whitespace, don't split
    if (!moveNode.innerText.trim()) return null;

    return { keep: keepNode, move: moveNode };
  }

  destroy() {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}

/**
 * Main Pagination Function
 * Implements a "Flow Algorithm" similar to Word's layout engine.
 */
export const paginateContent = (html: string, config: PageConfig): PaginatorResult => {
  // SSR Guard
  if (typeof document === 'undefined') {
    const frame = new PageFrame(config);
    return { pages: [html], pageHeight: frame.height, pageWidth: frame.width };
  }

  // 1. Setup Constraints
  const frame = new PageFrame(config);
  const sandbox = new LayoutSandbox(frame.bodyWidth);
  const pages: string[] = [];

  // 2. Parse Source Content
  // We treat the document as a flat stream of top-level blocks
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  // Normalize: Ensure all top-level text nodes are wrapped in P to behave as blocks
  const nodes: HTMLElement[] = [];
  Array.from(body.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
          // Wrap loose text or whitespace that isn't just a newline
          if (node.textContent && (node.textContent.trim() || node.textContent.includes('\n'))) {
              const p = document.createElement('p');
              p.appendChild(node.cloneNode(true));
              nodes.push(p);
          }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
          nodes.push(node.cloneNode(true) as HTMLElement);
      }
  });

  // 3. Flow Content
  let currentPageNodes: HTMLElement[] = [];
  let currentH = 0;

  const flushPage = () => {
      const div = document.createElement('div');
      currentPageNodes.forEach(n => div.appendChild(n));
      pages.push(div.innerHTML);
      currentPageNodes = [];
      currentH = 0;
  };

  for (const node of nodes) {
      // 3a. Handle explicit breaks (Page Break, Section Break)
      const isBreak = node.classList?.contains('prodoc-page-break') || 
                      node.style?.pageBreakAfter === 'always' ||
                      node.style?.breakAfter === 'page';

      if (isBreak) {
          // Add the break element to the current page so it can be visualized if desired
          // or acts as the spacer at the end of the page.
          currentPageNodes.push(node);
          flushPage(); 
          continue; 
      }

      // 3b. Measure content
      const nodeH = sandbox.measure(node);

      // 3c. Check constraints
      // Allow a small tolerance (0.5px) for sub-pixel rendering differences
      if (currentH + nodeH > frame.bodyHeight + 0.5) {
          // OVERFLOW DETECTED: Content is going beyond the footer boundary.
          // Action: Auto-create new page and move content.
          
          // Case 1: Node fits on a fresh page?
          if (nodeH <= frame.bodyHeight) {
              flushPage(); // Create new page
              currentPageNodes.push(node); // Move whole node to new page
              currentH = nodeH;
          } 
          // Case 2: Node is huge (taller than a page). Must split.
          else {
              const remainingSpace = frame.bodyHeight - currentH;
              
              // Attempt to split the node to fill the current page
              const split = sandbox.splitNode(node, remainingSpace);

              if (split) {
                  // Add first chunk to current page
                  currentPageNodes.push(split.keep);
                  flushPage(); // Flush immediately triggers "auto create new page"
                  
                  // Add remainder to next page (which will become the new current page context)
                  currentPageNodes.push(split.move);
                  currentH = sandbox.measure(split.move);
              } else {
                  // Can't split? Force it onto a new page to maximize space
                  flushPage();
                  currentPageNodes.push(node);
                  currentH = nodeH; 
              }
          }
      } else {
          // Fits in current page
          currentPageNodes.push(node);
          currentH += nodeH;
      }
  }

  // 4. Finalize
  if (currentPageNodes.length > 0) {
      flushPage();
  }

  // Ensure at least one page
  if (pages.length === 0) {
      pages.push('<p><br></p>');
  }

  // Cleanup
  sandbox.destroy();

  return {
      pages,
      pageHeight: frame.height,
      pageWidth: frame.width
  };
};