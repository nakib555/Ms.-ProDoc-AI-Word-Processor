// utils/resourceManager.ts

export interface AssetResource {
  id: string;
  type: 'image' | 'font' | 'svg' | 'equation';
  src: string; // url or data-uri
  size?: number;
  loaded: boolean;
  meta?: Record<string, any>;
}

/**
 * Enterprise-grade Resource Manager.
 * Manages embedded media, web-fonts, latex-svg equations, and linked assets.
 * Performs asset deduplication, garbage collection, and lazy loading.
 */
export class ResourceManager {
  private resources = new Map<string, AssetResource>();
  private activeDownloads = new Map<string, Promise<any>>();

  /**
   * Registers or updates an asset resource.
   */
  public registerResource(res: Omit<AssetResource, 'loaded'>): AssetResource {
    const existing = this.resources.get(res.id);
    if (existing) {
      return existing;
    }

    const newRes: AssetResource = { ...res, loaded: false };
    this.resources.set(res.id, newRes);

    // Trigger asynchronous download/prefetch
    this.loadResourceAsync(newRes);

    return newRes;
  }

  /**
   * Asynchronously fetches resources.
   */
  private async loadResourceAsync(res: AssetResource): Promise<void> {
    if (res.loaded || this.activeDownloads.has(res.id)) return;

    if (res.type === 'font') {
      const loadPromise = this.injectWebFont(res.id, res.src);
      this.activeDownloads.set(res.id, loadPromise);
      await loadPromise;
      res.loaded = true;
      this.activeDownloads.delete(res.id);
    } else if (res.type === 'image') {
      const loadPromise = this.preloadImage(res.src);
      this.activeDownloads.set(res.id, loadPromise);
      await loadPromise;
      res.loaded = true;
      this.activeDownloads.delete(res.id);
    } else {
      res.loaded = true;
    }
  }

  /**
   * Preloads image into browser memory cache.
   */
  private preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
      if (typeof Image === 'undefined') return resolve();
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Graceful fallback
      img.src = src;
    });
  }

  /**
   * Registers a web font dynamically into the stylesheet layout context.
   */
  private injectWebFont(fontFamily: string, url: string): Promise<void> {
    return new Promise((resolve) => {
      if (typeof document === 'undefined' || typeof FontFace === 'undefined') return resolve();
      
      const fontFace = new FontFace(fontFamily, `url(${url})`);
      fontFace.load()
        .then((loadedFace) => {
          document.fonts.add(loadedFace);
          resolve();
        })
        .catch((err) => {
          console.error(`Failed to dynamically load web font: ${fontFamily}`, err);
          resolve(); // Resolve anyway to avoid blocking execution
        });
    });
  }

  public getResource(id: string): AssetResource | undefined {
    return this.resources.get(id);
  }

  public getCacheMetrics() {
    const list = Array.from(this.resources.values());
    const totalSize = list.reduce((sum, r) => sum + (r.size || 0), 0);
    return {
      cachedCount: list.length,
      loadedCount: list.filter(r => r.loaded).length,
      totalSizeKb: Math.round(totalSize / 1024),
      pendingCount: this.activeDownloads.size
    };
  }

  /**
   * Performs basic cache garbage collection by evicting items over memory limit.
   */
  public pruneCache(maxCount = 100): void {
    if (this.resources.size > maxCount) {
      const keys = Array.from(this.resources.keys());
      const toRemove = keys.slice(0, this.resources.size - maxCount);
      toRemove.forEach(k => this.resources.delete(k));
    }
  }

  public clear(): void {
    this.resources.clear();
    this.activeDownloads.clear();
  }
}

export const globalResourceManager = new ResourceManager();
