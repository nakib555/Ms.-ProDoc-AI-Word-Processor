import { PageConfig } from '../../types';
import { PAGE_SIZES } from '../../constants';
import { PageFrame } from './PageFrame';

const DPI = 96;

export class GeometryCalculator {
  static calculate(config: PageConfig, dpi = DPI): PageFrame {
    const base = PAGE_SIZES[config.size as string] || PAGE_SIZES['Letter'];
    let baseW = base.width;
    let baseH = base.height;
    if (config.size === 'Custom' && config.customWidth && config.customHeight) {
      baseW = config.customWidth * dpi;
      baseH = config.customHeight * dpi;
    }

    let width: number;
    let height: number;
    if (config.orientation === 'portrait') {
      width = baseW;
      height = baseH;
    } else {
      width = baseH;
      height = baseW;
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
