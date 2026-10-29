import { PageConfig } from '../../types';
import { PageFrame } from './PageFrame';
import { getPhysicalDimensions, mmToPx, inToMm } from '../unitConversion';
import { PAGE_SIZES } from '../../constants';

const DPI = 96;

export class GeometryCalculator {
  static calculate(config: PageConfig, dpi = DPI): PageFrame {
    // If standard physical dimensions exist, use exact millimeter conversions
    let width: number;
    let height: number;

    if (config.size === 'Custom' && config.customWidth && config.customHeight) {
      // customWidth/customHeight might be specified in inches or mm (if > 50, likely mm)
      const isMm = config.customWidth > 50;
      const widthMm = isMm ? config.customWidth : inToMm(config.customWidth);
      const heightMm = isMm ? config.customHeight : inToMm(config.customHeight);
      const dims = getPhysicalDimensions('Custom', config.orientation, widthMm, heightMm);
      width = dpi === 96 ? dims.widthPx : mmToPx(dims.widthMm, dpi);
      height = dpi === 96 ? dims.heightPx : mmToPx(dims.heightMm, dpi);
    } else {
      const dims = getPhysicalDimensions(config.size as string, config.orientation);
      if (dims.widthMm && dims.heightMm) {
        width = dpi === 96 ? dims.widthPx : mmToPx(dims.widthMm, dpi);
        height = dpi === 96 ? dims.heightPx : mmToPx(dims.heightMm, dpi);
      } else {
        const base = PAGE_SIZES[config.size as string] || PAGE_SIZES['Letter'];
        if (config.orientation === 'portrait') {
          width = (base.width / 96) * dpi;
          height = (base.height / 96) * dpi;
        } else {
          width = (base.height / 96) * dpi;
          height = (base.width / 96) * dpi;
        }
      }
    }

    const headerDistPx = (config.headerDistance || 0) * dpi;
    const footerDistPx = (config.footerDistance || 0) * dpi;

    let marginTop = Math.max(config.margins.top * dpi, headerDistPx);
    const marginBottom = Math.max(config.margins.bottom * dpi, footerDistPx);
    let marginLeft = config.margins.left * dpi;
    const marginRight = config.margins.right * dpi;

    const gutterPx = (config.margins.gutter || 0) * dpi;
    if (config.gutterPosition === 'top') {
      marginTop += gutterPx;
    } else {
      marginLeft += gutterPx;
    }

    const bodyWidth = Math.max(0, width - (marginLeft + marginRight));
    const bodyHeight = Math.max(0, height - (marginTop + marginBottom));

    return {
      width,
      height,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      bodyWidth,
      bodyHeight
    };
  }
}

