import { PageConfig } from '../../types';
import { LayoutEngine } from './LayoutEngine';
import { LayoutSandboxImpl } from './LayoutSandboxImpl';
import { LayoutVersion } from './LayoutVersion';
import { LayoutEnvironmentImpl } from './LayoutEnvironment';
import { LayoutState } from './LayoutState';
import { LayoutDiagnostics } from './LayoutDiagnostics';
import { MeasurementCache } from './MeasurementCache';
import { MeasurementService } from './MeasurementService';
import { GeometryCalculator } from './GeometryCalculator';
import { GeometryCache } from './GeometryCache';
import { LayoutSession } from './LayoutSession';
import { BlockNormalizer } from './BlockNormalizer';
import { PageBuilder } from './PageBuilder';
import { PaginationLoop } from './PaginationLoop';

const DPI = 96;
const SAFETY_BUFFER = 15;
const MIN_LINE_HEIGHT = 20;

export interface PaginatorResult {
  pages: { html: string; config: PageConfig }[];
  pageHeight: number;
  pageWidth: number;
}

export class Paginator {
  static paginate(
    html: string,
    initialConfig: PageConfig,
    engine: LayoutEngine,
    abortSignal?: AbortSignal
  ): PaginatorResult {
    if (typeof document === 'undefined') {
      return {
        pages: [{ html, config: initialConfig }],
        pageHeight: 0,
        pageWidth: 0
      };
    }

    const sandbox = new LayoutSandboxImpl();
    const geometryCache = new GeometryCache();
    const layoutVersion = new LayoutVersion();
    const initialFrame = GeometryCalculator.calculate(initialConfig, DPI);
    
    // Normalize input HTML into standard block elements
    const normalizedNodes = BlockNormalizer.normalize(html);

    // Initialize session elements
    const environment = new LayoutEnvironmentImpl(initialConfig, false);
    const state = new LayoutState();
    const diagnostics = new LayoutDiagnostics(false);
    const measuredCache = new MeasurementCache(layoutVersion);
    const measurementService = new MeasurementService(sandbox, measuredCache);

    // Initialize layout session
    const session = new LayoutSession({
      engine,
      environment,
      state,
      diagnostics,
      measurementService,
      geometryCache,
      pageConfig: initialConfig,
      pageFrame: initialFrame,
      abortSignal
    });

    // Create page builder
    const builder = new PageBuilder(initialConfig);

    try {
      // Execute structured pagination loop
      PaginationLoop.run(
        normalizedNodes,
        session,
        builder,
        DPI,
        SAFETY_BUFFER,
        MIN_LINE_HEIGHT
      );

      return {
        pages: builder.getPages(),
        pageHeight: initialFrame.height,
        pageWidth: initialFrame.width
      };
    } finally {
      sandbox.destroy();
    }
  }
}
