export class BlockNormalizer {
  private static fragmentContainer: HTMLDivElement | null = null;

  private static getContainer(): HTMLDivElement {
    if (!BlockNormalizer.fragmentContainer && typeof document !== 'undefined') {
      BlockNormalizer.fragmentContainer = document.createElement('div');
    }
    return BlockNormalizer.fragmentContainer!;
  }

  static normalize(html: string): HTMLElement[] {
    if (typeof document === 'undefined') return [];
    
    const container = BlockNormalizer.getContainer();
    container.innerHTML = html;

    // Merge previously split contiguous tables (Improvement #1 & #6)
    const splitTables = container.querySelectorAll('table[data-continuation="true"]');
    for (let i = 0; i < splitTables.length; i++) {
      const splitTable = splitTables[i] as HTMLElement;
      const repeatedHeaders = splitTable.querySelectorAll('tr[data-repeated-header-row="true"]');
      for (let j = 0; j < repeatedHeaders.length; j++) {
        repeatedHeaders[j].remove();
      }

      const prev = splitTable.previousElementSibling;
      if (prev && prev.tagName === 'TABLE') {
        while (splitTable.firstChild) {
          prev.appendChild(splitTable.firstChild);
        }
        prev.removeAttribute('data-split-bottom');
        splitTable.remove();
      } else {
        splitTable.removeAttribute('data-continuation');
      }
    }

    // If the content is wrapped in generic container <div> elements, unwrap them so block pagination works on individual paragraphs, tables, and headings
    while (
      container.children.length === 1 &&
      container.firstElementChild?.tagName === 'DIV' &&
      container.firstElementChild.children.length > 0 &&
      !container.firstElementChild.classList.contains('prodoc-page-break')
    ) {
      const wrapper = container.firstElementChild as HTMLElement;
      while (wrapper.firstChild) {
        container.insertBefore(wrapper.firstChild, wrapper);
      }
      wrapper.remove();
    }

    const nodes: HTMLElement[] = [];
    const childNodes = container.childNodes;
    const len = childNodes.length;
    
    for (let i = 0; i < len; i++) {
      const node = childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (text && (text.trim() || text.includes('\n'))) {
          const p = document.createElement('p');
          p.textContent = text;
          nodes.push(p);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        nodes.push(node as HTMLElement);
      }
    }

    return nodes;
  }
}
