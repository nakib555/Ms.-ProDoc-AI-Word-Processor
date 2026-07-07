import { LayoutEngine } from './LayoutEngine';
import { LayoutEnvironment } from './LayoutEnvironment';
import { LayoutState } from './LayoutState';
import { LayoutDiagnostics } from './LayoutDiagnostics';
import { MeasurementService } from './MeasurementService';

export interface LayoutContext {
  readonly engine: LayoutEngine;
  environment: LayoutEnvironment;
  state: LayoutState;
  diagnostics: LayoutDiagnostics;
  measurementService: MeasurementService;
}
