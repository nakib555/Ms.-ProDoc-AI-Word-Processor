import { LayoutVersion } from './LayoutVersion';
import { LayoutDiagnostics } from './LayoutDiagnostics';

export function getLayoutId(node: HTMLElement): string {
  let id = node.getAttribute('data-layout-id');
  if (!id) {
    id = `layout-${Math.random().toString(36).substring(2, 11)}`;
    node.setAttribute('data-layout-id', id);
  }
  return id;
}

export class MeasurementCache {
  private cache: Map<string, number> = new Map();
  private layoutVersion: LayoutVersion;

  constructor(layoutVersion: LayoutVersion) {
    this.layoutVersion = layoutVersion;
  }

  private buildKey(node: HTMLElement, pageWidth: number): string {
    const id = getLayoutId(node);
    const version = this.layoutVersion.get();
    
    // Extract styling that directly affects layout height
    const styleHash = node.style?.cssText || '';
    const fontHash = `${node.style?.fontFamily || ''}-${node.style?.fontSize || ''}-${node.style?.lineHeight || ''}`;
    const className = node.className || '';
    const innerContent = node.innerHTML || '';

    return `${id}::v=${version}::w=${pageWidth}::style=${styleHash}::font=${fontHash}::class=${className}::content=${innerContent}`;
  }

  get(node: HTMLElement, pageWidth: number, diagnostics?: LayoutDiagnostics): number | undefined {
    const key = this.buildKey(node, pageWidth);
    const cached = this.cache.get(key);
    
    if (diagnostics) {
      if (cached !== undefined) {
        diagnostics.logEvent({
          type: 'CACHE_HIT',
          timestamp: typeof performance !== 'undefined' ? performance.now() : Date.now(),
          payload: { id: getLayoutId(node), height: cached, pageWidth }
        });
      } else {
        diagnostics.logEvent({
          type: 'CACHE_MISS',
          timestamp: typeof performance !== 'undefined' ? performance.now() : Date.now(),
          payload: { id: getLayoutId(node), pageWidth }
        });
      }
    }
    
    return cached;
  }

  set(node: HTMLElement, height: number, pageWidth: number): void {
    const key = this.buildKey(node, pageWidth);
    this.cache.set(key, height);
  }

  clear(): void {
    this.cache.clear();
  }
}
