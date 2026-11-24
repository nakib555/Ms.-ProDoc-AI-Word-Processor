import { mergeContinuationTables } from '../tableUtils';

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

    // Merge previously split contiguous tables cleanly without nesting <tbody> elements
    mergeContinuationTables(container);

    // If the content is wrapped in generic container <div> elements, unwrap them so block pagination works on individual paragraphs, tables, and headings
    while (
      container.children.length === 1 &&
      container.firstElementChild?.tagName === 'DIV' &&
      container.firstElementChild.children.length > 0 &&
      !container.firstElementChild.classList.contains('prodoc-page-break')
    ) {
      const wrapper = container.firstElementChild as HTMLElement;
      const dirAttr = wrapper.getAttribute('dir');
      const alignStyle = wrapper.style.textAlign;
      while (wrapper.firstChild) {
        const child = wrapper.firstChild;
        if (child.nodeType === Node.ELEMENT_NODE) {
          const el = child as HTMLElement;
          if (dirAttr && !el.getAttribute('dir')) {
            el.setAttribute('dir', dirAttr);
          }
          if (alignStyle && !el.style.textAlign) {
            el.style.textAlign = alignStyle;
          }
        }
        container.insertBefore(child, wrapper);
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
        const el = node as HTMLElement;
        el.removeAttribute('data-layout-id');
        el.querySelectorAll('[data-layout-id]').forEach((child) => {
          child.removeAttribute('data-layout-id');
        });
        nodes.push(el);
      }
    }

    return nodes;
  }
}
