export class BlockNormalizer {
  static normalize(html: string): HTMLElement[] {
    if (typeof document === 'undefined') return [];
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;

    // Merge previously split contiguous tables (Improvement #1 & #6)
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

    return nodes;
  }
}
