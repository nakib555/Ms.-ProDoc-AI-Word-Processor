import { PageConfig } from '../../types';
import { PAGE_SIZES } from '../../constants';

const DPI = 96;

export interface LayoutEnvironment {
  dpi: number;
  safetyBuffer: number;
  minLineHeight: number;
  pageWidth: number;
  pageHeight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  bodyWidth: number;
  bodyHeight: number;
  columns: number;
  columnGap: number;
  effectiveWidth: number;
  effectiveHeight: number;
  debug: boolean;
  pageConfig: PageConfig;
}

export class LayoutEnvironmentImpl implements LayoutEnvironment {
  dpi = DPI;
  safetyBuffer = 15;
  minLineHeight = 20;
  pageWidth: number;
  pageHeight: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  bodyWidth: number;
  bodyHeight: number;
  columns: number;
  columnGap: number;
  effectiveWidth: number;
  effectiveHeight: number;
  debug: boolean;
  pageConfig: PageConfig;

  constructor(config: PageConfig, debug = false) {
    this.pageConfig = config;
    this.debug = debug;

    const base = PAGE_SIZES[config.size as string] || PAGE_SIZES['Letter'];
    let baseW = base.width;
    let baseH = base.height;
    if (config.size === 'Custom' && config.customWidth && config.customHeight) {
      baseW = config.customWidth * DPI;
      baseH = config.customHeight * DPI;
    }

    if (config.orientation === 'portrait') {
      this.pageWidth = baseW;
      this.pageHeight = baseH;
    } else {
      this.pageWidth = baseH;
      this.pageHeight = baseW;
    }

    const headerDistPx = (config.headerDistance || 0) * DPI;
    const footerDistPx = (config.footerDistance || 0) * DPI;

    this.marginTop = Math.max(config.margins.top * DPI, headerDistPx);
    this.marginBottom = Math.max(config.margins.bottom * DPI, footerDistPx);
    this.marginLeft = config.margins.left * DPI;
    this.marginRight = config.margins.right * DPI;

    const gutterPx = (config.margins.gutter || 0) * DPI;
    if (config.gutterPosition === 'top') {
      this.marginTop += gutterPx;
    } else {
      this.marginLeft += gutterPx;
    }

    this.bodyWidth = Math.max(0, this.pageWidth - (this.marginLeft + this.marginRight));
    this.bodyHeight = Math.max(0, this.pageHeight - (this.marginTop + this.marginBottom));

    this.columns = config.columns || 1;
    this.columnGap = (config.columnGap || 0.5) * DPI;

    this.effectiveWidth = (this.bodyWidth - (this.columns - 1) * this.columnGap) / this.columns;
    this.effectiveHeight = this.bodyHeight * this.columns;
  }
}
