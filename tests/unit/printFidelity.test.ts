import { describe, it, expect } from 'vitest';
import { calculatePrintMargins } from '../../utils/printUtils';
import { getPhysicalDimensions } from '../../utils/measurement';
import { PageConfig } from '../../types';

describe('Stage 5: Unified Dedicated Print & PDF Engine', () => {
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

  it('generates exact ISO 216 physical dimensions for print styles', () => {
    const a4 = getPhysicalDimensions('A4', 'portrait');
    expect(a4.widthMm).toBe(210);
    expect(a4.heightMm).toBe(297);
    expect(a4.widthInches).toBeCloseTo(8.2677, 3);
    expect(a4.heightInches).toBeCloseTo(11.6929, 3);

    // Vector PDF point dimensions (1 in = 72 pt)
    const pdfWidthPt = a4.widthInches * 72;
    const pdfHeightPt = a4.heightInches * 72;
    expect(pdfWidthPt).toBeCloseTo(595.28, 1);
    expect(pdfHeightPt).toBeCloseTo(841.89, 1);
  });

  it('correctly calculates physical print margins and gutters', () => {
    const withGutter: PageConfig = {
      ...baseConfig,
      margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0.25 },
      gutterPosition: 'left',
    };
    const margins = calculatePrintMargins(withGutter, 1);
    expect(margins.left).toBe(1.25);
    expect(margins.right).toBe(1);
    expect(margins.top).toBe(1);
    expect(margins.bottom).toBe(1);
  });

  it('correctly alternates mirrored margins on odd and even pages', () => {
    const mirrored: PageConfig = {
      ...baseConfig,
      multiplePages: 'mirrorMargins',
      margins: { top: 1, bottom: 1, left: 1.25, right: 0.75, gutter: 0.25 },
      gutterPosition: 'left',
    };
    // Page 1 (Odd): inside (left) = left + gutter = 1.25 + 0.25 = 1.5; outside (right) = 0.75
    const odd = calculatePrintMargins(mirrored, 1);
    expect(odd.left).toBe(1.5);
    expect(odd.right).toBe(0.75);

    // Page 2 (Even): inside is on the right; outside is on the left
    const even = calculatePrintMargins(mirrored, 2);
    expect(even.left).toBe(0.75);
    expect(even.right).toBe(1.5);
  });
});
