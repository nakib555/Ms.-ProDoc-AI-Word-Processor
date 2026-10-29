import { LayoutSandbox } from './SplitStrategy';
import { MeasurementCache } from './MeasurementCache';

export class LayoutSandboxImpl implements LayoutSandbox {
  el: HTMLElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'prodoc-editor break-words text-slate-900'; 
    this.el.style.position = 'absolute';
    this.el.style.visibility = 'hidden';
    this.el.style.height = 'auto';
    this.el.style.top = '-10000px';
    this.el.style.left = '-10000px';
    this.el.style.padding = '0';
    this.el.style.margin = '0';
    this.el.style.fontFamily = 'Calibri, Inter, sans-serif';
    this.el.style.fontSize = '11pt';
    this.el.style.lineHeight = '1.35';
    this.el.style.wordWrap = 'break-word';
    this.el.style.overflowWrap = 'break-word';
    this.el.style.whiteSpace = 'pre-wrap';
    this.el.style.contain = 'layout style';
    if (typeof document !== 'undefined' && document.body) {
      document.body.appendChild(this.el);
    }
  }

  setWidth(width: number): void {
    const wStr = `${Math.round(width)}px`;
    if (this.el.style.width !== wStr) {
      this.el.style.width = wStr;
    }
  }

  measure(node: Node, cache?: MeasurementCache, width?: number): number {
    const effectiveWidth = width || (this.el.clientWidth || 800);
    if (node.nodeType === Node.ELEMENT_NODE && cache) {
      const el = node as HTMLElement;
      const cached = cache.get(el, effectiveWidth);
      if (cached !== undefined) return cached;
    }
    this.el.appendChild(node);
    const height = Math.ceil(this.el.getBoundingClientRect().height);
    this.el.removeChild(node);
    if (node.nodeType === Node.ELEMENT_NODE && cache) {
      cache.set(node as HTMLElement, height, effectiveWidth);
    }
    return height;
  }

  destroy(): void {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}

