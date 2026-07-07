import { LayoutSandbox } from './SplitStrategy';
import { MeasurementCache } from './MeasurementCache';

export class MeasurementService {
  private sandbox: LayoutSandbox;
  private cache: MeasurementCache;

  constructor(sandbox: LayoutSandbox, cache: MeasurementCache) {
    this.sandbox = sandbox;
    this.cache = cache;
  }

  measure(node: Node, pageWidth: number): number {
    return this.sandbox.measure(node, this.cache, pageWidth);
  }

  measureHeight(node: HTMLElement, pageWidth: number): number {
    return this.measure(node, pageWidth);
  }

  measureInline(node: Node, pageWidth: number): number {
    return this.measure(node, pageWidth);
  }

  measureTable(node: HTMLTableElement, pageWidth: number): number {
    return this.measure(node, pageWidth);
  }

  measureParagraph(node: HTMLParagraphElement | HTMLDivElement, pageWidth: number): number {
    return this.measure(node, pageWidth);
  }

  setWidth(width: number): void {
    this.sandbox.setWidth(width);
  }
}
