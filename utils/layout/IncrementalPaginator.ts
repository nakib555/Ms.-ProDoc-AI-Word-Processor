import { PageConfig } from '../../types';
import { Paginator, PaginatorResult } from './Paginator';
import { LayoutEngine } from './LayoutEngine';
import { LayoutEngineConfiguration } from './LayoutEngineConfiguration';

export interface PageEntry {
  html: string;
  config: PageConfig;
}

export class IncrementalPaginator {
  private static cachedResult: PaginatorResult | null = null;
  private static cachedHtml: string = '';
  private static cachedConfig: PageConfig | null = null;

  /**
   * Paginates content incrementally or falls back to full fast cached pagination.
   * Leverages deterministic MeasurementCache so cached blocks take 0.001ms.
   */
  static paginate(
    html: string,
    config: PageConfig,
    engineConfig?: Partial<LayoutEngineConfiguration>
  ): PaginatorResult {
    // Fast path: exact same HTML and config
    if (
      IncrementalPaginator.cachedResult &&
      IncrementalPaginator.cachedHtml === html &&
      IncrementalPaginator.cachedConfig &&
      JSON.stringify(IncrementalPaginator.cachedConfig) === JSON.stringify(config)
    ) {
      return IncrementalPaginator.cachedResult;
    }

    const fullEngineConfig: LayoutEngineConfiguration = {
      pageSize: config.size || 'Letter',
      dpi: 96,
      safetyBuffer: 15,
      minLineHeight: 20,
      debug: false,
      diagnosticsEnabled: false,
      ...engineConfig
    };

    const engine = new LayoutEngine({ configuration: fullEngineConfig });

    // Invalidate measurement cache if critical page dimensions or margins changed
    if (
      IncrementalPaginator.cachedConfig &&
      (IncrementalPaginator.cachedConfig.size !== config.size ||
        IncrementalPaginator.cachedConfig.orientation !== config.orientation ||
        JSON.stringify(IncrementalPaginator.cachedConfig.margins) !== JSON.stringify(config.margins))
    ) {
      Paginator.invalidateCache();
    }

    const result = Paginator.paginate(html, config, engine);

    IncrementalPaginator.cachedResult = result;
    IncrementalPaginator.cachedHtml = html;
    IncrementalPaginator.cachedConfig = { ...config };

    return result;
  }

  static clearCache(): void {
    IncrementalPaginator.cachedResult = null;
    IncrementalPaginator.cachedHtml = '';
    IncrementalPaginator.cachedConfig = null;
    Paginator.invalidateCache();
  }
}
