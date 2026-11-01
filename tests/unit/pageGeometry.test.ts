import { describe, it, expect } from 'vitest';
import { GeometryCalculator } from '../../utils/layout/GeometryCalculator';
import { PageConfig } from '../../types';

describe('Stage 3: Word-Fidelity Page Geometry & Rendering', () => {
  const baseConfig: PageConfig = {
    size: 'A4',
    orientation: 'portrait',
    margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
    marginPreset: 'normal',
    background: 'none',
    headerDistance: 0.5,
    footerDistance: 0.5,
    verticalAlign: 'top',
  };

  it('calculates exact A4 physical dimensions with 1-inch margins', () => {
    const frame = GeometryCalculator.calculate(baseConfig, 96);

    // A4 is 210 mm = 793.7007874... px @ 96 DPI
    // A4 is 297 mm = 1122.519685... px @ 96 DPI
    expect(frame.width).toBeCloseTo(793.70, 1);
    expect(frame.height).toBeCloseTo(1122.52, 1);

    // Margins are 1 inch = 96 px
    expect(frame.marginTop).toBe(96);
    expect(frame.marginBottom).toBe(96);
    expect(frame.marginLeft).toBe(96);
    expect(frame.marginRight).toBe(96);

    // Body width = 793.70 - 192 = 601.70 px
    expect(frame.bodyWidth).toBeCloseTo(601.70, 1);
    // Body height = 1122.52 - 192 = 930.52 px
    expect(frame.bodyHeight).toBeCloseTo(930.52, 1);
  });

  it('correctly calculates Letter dimensions in portrait and landscape', () => {
    const letterPortrait: PageConfig = {
      ...baseConfig,
      size: 'Letter',
      orientation: 'portrait',
    };
    const portraitFrame = GeometryCalculator.calculate(letterPortrait, 96);
    expect(portraitFrame.width).toBe(816);
    expect(portraitFrame.height).toBe(1056);

    const letterLandscape: PageConfig = {
      ...baseConfig,
      size: 'Letter',
      orientation: 'landscape',
    };
    const landscapeFrame = GeometryCalculator.calculate(letterLandscape, 96);
    expect(landscapeFrame.width).toBe(1056);
    expect(landscapeFrame.height).toBe(816);
  });

  it('accounts for gutter spacing and header distance cleanly', () => {
    const withGutter: PageConfig = {
      ...baseConfig,
      size: 'Letter',
      margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0.5 },
      gutterPosition: 'left',
    };
    const frame = GeometryCalculator.calculate(withGutter, 96);

    // Left margin gets + 0.5 in (48 px) gutter
    expect(frame.marginLeft).toBe(96 + 48);
    // Body width is reduced by gutter
    expect(frame.bodyWidth).toBe(816 - (144 + 96));
  });
});
