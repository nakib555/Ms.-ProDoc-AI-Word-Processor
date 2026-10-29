import { LayoutVersion } from './LayoutVersion';
import { LayoutDiagnostics } from './LayoutDiagnostics';

export function hashString(str: string): string {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

export function getLayoutId(node: HTMLElement): string {
  let id = node.getAttribute('data-layout-id');
  if (id) return id;
  
  const contentSnippet = node.childElementCount === 0 ? (node.textContent || '') : (node.innerHTML || '');
  const styleStr = node.style?.cssText || '';
  const signature = `${node.tagName}::${node.className}::${styleStr}::${contentSnippet}`;
  id = `blk-${hashString(signature)}`;
  node.setAttribute('data-layout-id', id);
  return id;
}

export class MeasurementCache {
  private cache: Map<string, number> = new Map();
  private layoutVersion: LayoutVersion;
  private maxCacheSize: number = 20000;

  constructor(layoutVersion: LayoutVersion) {
    this.layoutVersion = layoutVersion;
  }

  setLayoutVersion(version: LayoutVersion): void {
    this.layoutVersion = version;
  }

  private buildKey(node: HTMLElement, pageWidth: number): string {
    const id = getLayoutId(node);
    const version = this.layoutVersion.get();
    const roundedWidth = Math.round(pageWidth);
    return `${id}::v=${version}::w=${roundedWidth}`;
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
    if (this.cache.size > this.maxCacheSize) {
      // Evict oldest entries
      const keys = this.cache.keys();
      for (let i = 0; i < 5000; i++) {
        const next = keys.next();
        if (next.done) break;
        this.cache.delete(next.value);
      }
    }
    const key = this.buildKey(node, pageWidth);
    this.cache.set(key, height);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

