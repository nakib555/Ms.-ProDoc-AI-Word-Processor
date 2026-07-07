import { LayoutSandbox } from './SplitStrategy';
import { MeasurementCache } from './MeasurementCache';

export class LayoutSandboxImpl implements LayoutSandbox {
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

  setWidth(width: number): void {
    this.el.style.width = `${width}px`;
  }

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

  destroy(): void {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}
