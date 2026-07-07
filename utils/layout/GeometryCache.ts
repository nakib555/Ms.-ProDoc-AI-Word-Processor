import { PageConfig } from '../../types';
import { getLayoutId } from './MeasurementCache';

export interface GeometryCacheEntry {
  height: number;
  baseline?: number;
  lines?: number;
}

export class GeometryCache {
  private cache = new Map<string, GeometryCacheEntry>();

  private buildKey(node: HTMLElement, width: number, pageConfig: PageConfig): string {
    const id = getLayoutId(node);
    const configHash = `${pageConfig.size}-${pageConfig.orientation}-${pageConfig.margins.top}-${pageConfig.margins.bottom}-${pageConfig.columns || 1}`;
    const styleHash = node.style?.cssText || '';
    const className = node.className || '';
    return `${id}::w=${width}::cfg=${configHash}::style=${styleHash}::class=${className}`;
  }

  get(node: HTMLElement, width: number, pageConfig: PageConfig): GeometryCacheEntry | undefined {
    const key = this.buildKey(node, width, pageConfig);
    return this.cache.get(key);
  }

  set(node: HTMLElement, width: number, pageConfig: PageConfig, entry: GeometryCacheEntry): void {
    const key = this.buildKey(node, width, pageConfig);
    this.cache.set(key, entry);
  }

  clear(): void {
    this.cache.clear();
  }
}
