
import { PageConfig, PaginatorResult } from '../types';
import { PAGE_SIZES } from '../constants';

// Helper to create a hidden sandbox for measurement
const createSandbox = (width: number) => {
  const sandbox = document.createElement('div');
  sandbox.style.position = 'absolute';
  sandbox.style.visibility = 'hidden';
  sandbox.style.width = `${width}px`;
  sandbox.style.height = 'auto';
  sandbox.style.top = '-9999px';
  sandbox.style.left = '-9999px';
  sandbox.className = 'prodoc-editor'; // Match editor styles
  document.body.appendChild(sandbox);
  return sandbox;
};

// Fix: Rewritten getPageDimensions to correctly calculate content dimensions
const getPageDimensions = (config: PageConfig) => {
  const base = PAGE_SIZES[config.size as string] || PAGE_SIZES['Letter'];
  let totalWidth = config.orientation === 'portrait' ? base.width : base.height;
  let totalHeight = config.orientation === 'portrait' ? base.height : base.width;
  
  const margins = config.margins;
  
  // Calculate vertical and horizontal space consumed by margins and gutter
  let consumedVerticalSpace = (margins.top + margins.bottom) * 96;
  let consumedHorizontalSpace = (margins.left + margins.right) * 96;

  // Add gutter space based on its position
  const gutterPx = (margins.gutter || 0) * 96; // Get gutter from margins, convert to px

  if (config.gutterPosition === 'top') {
    consumedVerticalSpace += gutterPx;
  } else { // Default or 'left'. Gutter primarily affects horizontal space for content.
           // For mirrored pages, it effectively adds to the 'inside' margin.
    consumedHorizontalSpace += gutterPx; 
  }

  // Calculate the available content area
  let contentWidth = totalWidth - consumedHorizontalSpace;
  let contentHeight = totalHeight - consumedVerticalSpace;

  return { 
    width: totalWidth, 
    height: totalHeight, 
    contentHeight: Math.max(100, contentHeight), // Ensure minimum height
    contentWidth: Math.max(100, contentWidth) // Ensure minimum width
  };
};

export const paginateContent = (html: string, config: PageConfig): PaginatorResult => {
  const { width, height, contentHeight, contentWidth } = getPageDimensions(config);
  
  // If code runs server-side or no document
  if (typeof document === 'undefined') {
    return { pages: [html], pageHeight: height, pageWidth: width };
  }

  const sandbox = createSandbox(contentWidth);
  sandbox.innerHTML = html;

  const pages: string[] = [];
  let currentPageNodes: Node[] = [];
  let currentHeight = 0;

  // Walk through top-level nodes (Paragraphs, Divs, Tables)
  const children = Array.from(sandbox.childNodes);

  children.forEach((node) => {
    // Clone node to measure it individually in context if needed, 
    // but here we just check its rendered height in the flow.
    
    // In a complex engine, we'd append one by one to a clean sandbox.
    // Let's do the robust "append and check" method.
    const nodeHeight = (node as HTMLElement).offsetHeight || 20; // Fallback for text nodes
    
    // Basic Greedy Algorithm
    if (currentHeight + nodeHeight > contentHeight) {
      // Overflow!
      if (currentPageNodes.length > 0) {
        // Push current page
        const pageWrapper = document.createElement('div');
        currentPageNodes.forEach(n => pageWrapper.appendChild(n.cloneNode(true)));
        pages.push(pageWrapper.innerHTML);
        
        // Reset for next page
        currentPageNodes = [node];
        currentHeight = nodeHeight;
      } else {
        // Single node is taller than page (e.g. massive image or table)
        // In a real engine we'd split it. Here we force it onto a page.
        const pageWrapper = document.createElement('div');
        pageWrapper.appendChild(node.cloneNode(true));
        pages.push(pageWrapper.innerHTML);
        currentPageNodes = [];
        currentHeight = 0;
      }
    } else {
      currentPageNodes.push(node);
      currentHeight += nodeHeight;
    }
  });

  // Push final page
  if (currentPageNodes.length > 0) {
    const pageWrapper = document.createElement('div');
    currentPageNodes.forEach(n => pageWrapper.appendChild(n.cloneNode(true)));
    pages.push(pageWrapper.innerHTML);
  }

  // Cleanup
  document.body.removeChild(sandbox);

  // Ensure at least one page
  if (pages.length === 0) pages.push('');

  return {
    pages,
    pageHeight: height,
    pageWidth: width
  };
};
