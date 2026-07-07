export interface LayoutEngineConfiguration {
  readonly pageSize: string;
  readonly dpi: number;
  readonly safetyBuffer: number;
  readonly minLineHeight: number;
  readonly debug: boolean;
  readonly diagnosticsEnabled: boolean;
  readonly cacheSize?: number;
}
