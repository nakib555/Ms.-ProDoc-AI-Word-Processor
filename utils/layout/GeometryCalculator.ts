import { PageConfig } from '../../types';
import { PageFrame } from './PageFrame';
import { getPhysicalDimensions, DEFAULT_DPI } from '../measurement';

export class GeometryCalculator {
  static calculate(config: PageConfig, dpi = DEFAULT_DPI): PageFrame {
    const phys = getPhysicalDimensions(
      config.size as string,
      config.orientation,
      config.customWidth,
      config.customHeight
    );

    // Derived from exact physical definitions
    const width = (phys.widthTwips / 1440) * dpi;
    const height = (phys.heightTwips / 1440) * dpi;

    const headerDistPx = (config.headerDistance || 0.5) * dpi;
    const footerDistPx = (config.footerDistance || 0.5) * dpi;

    const m = config.margins || { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 };
    let marginTop = Math.max(m.top * dpi, headerDistPx);
    const marginBottom = Math.max(m.bottom * dpi, footerDistPx);
    let marginLeft = m.left * dpi;
    const marginRight = m.right * dpi;

    const gutterPx = (m.gutter || 0) * dpi;
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
      bodyHeight,
    };
  }
}
