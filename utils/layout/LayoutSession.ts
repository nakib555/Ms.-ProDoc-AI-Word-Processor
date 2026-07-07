import { LayoutEngine } from './LayoutEngine';
import { LayoutEnvironment } from './LayoutEnvironment';
import { LayoutState } from './LayoutState';
import { LayoutDiagnostics } from './LayoutDiagnostics';
import { MeasurementService } from './MeasurementService';
import { PageFrame } from './PageFrame';
import { PageConfig } from '../../types';
import { GeometryCache } from './GeometryCache';

export class LayoutSession {
  readonly engine: LayoutEngine;
  environment: LayoutEnvironment;
  readonly state: LayoutState;
  readonly diagnostics: LayoutDiagnostics;
  readonly measurementService: MeasurementService;
  readonly geometryCache: GeometryCache;
  
  pageConfig: PageConfig;
  pageFrame: PageFrame;
  currentPageIndex = 0;
  currentColumnIndex = 0;
  currentHeight = 0;
  readonly abortSignal?: AbortSignal;

  constructor(options: {
    engine: LayoutEngine;
    environment: LayoutEnvironment;
    state: LayoutState;
    diagnostics: LayoutDiagnostics;
    measurementService: MeasurementService;
    geometryCache: GeometryCache;
    pageConfig: PageConfig;
    pageFrame: PageFrame;
    abortSignal?: AbortSignal;
  }) {
    this.engine = options.engine;
    this.environment = options.environment;
    this.state = options.state;
    this.diagnostics = options.diagnostics;
    this.measurementService = options.measurementService;
    this.geometryCache = options.geometryCache;
    this.pageConfig = options.pageConfig;
    this.pageFrame = options.pageFrame;
    this.abortSignal = options.abortSignal;
  }

  checkCancelled(): void {
    if (this.abortSignal?.aborted) {
      throw new DOMException('Layout computation was aborted', 'AbortError');
    }
  }
}
