import { describe, it, expect } from 'vitest';
import {
  TWIPS_PER_INCH,
  MM_PER_INCH,
  POINTS_PER_INCH,
  DEFAULT_DPI,
  EMUS_PER_INCH,
  twipsToPx,
  pxToTwips,
  mmToTwips,
  twipsToMm,
  inchesToTwips,
  twipsToInches,
  ptToTwips,
  twipsToPt,
  mmToPx,
  pxToMm,
  inchesToPx,
  pxToInches,
  ptToPx,
  pxToPt,
  emuToInches,
  inchesToEmu,
  getPhysicalDimensions,
  PHYSICAL_PAPER_SIZES,
} from '../../utils/measurement';

describe('Stage 1: Centralized Physical Measurement Core', () => {
  it('confirms exact fundamental physical conversion constants', () => {
    expect(TWIPS_PER_INCH).toBe(1440);
    expect(MM_PER_INCH).toBe(25.4);
    expect(POINTS_PER_INCH).toBe(72);
    expect(DEFAULT_DPI).toBe(96);
    expect(EMUS_PER_INCH).toBe(914400);

    // 1 inch = 96 px @ 96 DPI
    expect(inchesToPx(1)).toBe(96);
    // 1 inch = 72 pt
    expect(twipsToPt(1440)).toBe(72);
    // 1 pt = 20 twips
    expect(ptToTwips(1)).toBe(20);
    // 1 mm in twips
    expect(mmToTwips(25.4)).toBe(1440);
    expect(twipsToMm(1440)).toBe(25.4);
  });

  it('guarantees bidirectional conversions without cumulative rounding drift', () => {
    const originalTwips = 12240; // 8.5 inches
    const inches = twipsToInches(originalTwips);
    const backToTwips = inchesToTwips(inches);
    expect(backToTwips).toBe(originalTwips);

    const px = twipsToPx(originalTwips);
    expect(px).toBe(816);
    expect(pxToTwips(px)).toBe(originalTwips);

    const mm = twipsToMm(originalTwips);
    expect(mm).toBeCloseTo(215.9, 4);
    expect(mmToTwips(mm)).toBeCloseTo(originalTwips, 4);

    const pt = twipsToPt(originalTwips);
    expect(pt).toBe(612);
    expect(ptToTwips(pt)).toBe(originalTwips);
  });

  it('verifies exact Microsoft Word OpenXML dimensions for A4', () => {
    const a4 = PHYSICAL_PAPER_SIZES['A4'];
    expect(a4).toBeDefined();
    expect(a4.widthMm).toBe(210);
    expect(a4.heightMm).toBe(297);
    expect(a4.widthTwips).toBe(11906); // OpenXML w:w="11906"
    expect(a4.heightTwips).toBe(16838); // OpenXML w:h="16838"

    // Aspect ratio 210 : 297 = 0.7070707...
    const mmRatio = a4.widthMm / a4.heightMm;
    const pxRatio = a4.widthPx / a4.heightPx;
    expect(pxRatio).toBeCloseTo(mmRatio, 4);
  });

  it('verifies exact North American Letter dimensions', () => {
    const letter = PHYSICAL_PAPER_SIZES['Letter'];
    expect(letter).toBeDefined();
    expect(letter.widthInches).toBe(8.5);
    expect(letter.heightInches).toBe(11);
    expect(letter.widthMm).toBeCloseTo(215.9, 4);
    expect(letter.heightMm).toBeCloseTo(279.4, 4);
    expect(letter.widthTwips).toBe(12240);
    expect(letter.heightTwips).toBe(15840);
    expect(letter.widthPx).toBe(816);
    expect(letter.heightPx).toBe(1056);
  });

  it('correctly inverts dimensions in landscape orientation', () => {
    const a4Landscape = getPhysicalDimensions('A4', 'landscape');
    expect(a4Landscape.widthMm).toBe(297);
    expect(a4Landscape.heightMm).toBe(210);
    expect(a4Landscape.widthTwips).toBe(16838);
    expect(a4Landscape.heightTwips).toBe(11906);
  });

  it('computes custom dimensions accurately', () => {
    const custom = getPhysicalDimensions('Custom', 'portrait', 6, 9);
    expect(custom.widthInches).toBe(6);
    expect(custom.heightInches).toBe(9);
    expect(custom.widthTwips).toBe(6 * 1440);
    expect(custom.heightTwips).toBe(9 * 1440);
    expect(custom.widthPx).toBe(6 * 96);
    expect(custom.heightPx).toBe(9 * 96);
  });

  it('verifies EMU conversions for document interchange', () => {
    expect(inchesToEmu(1)).toBe(914400);
    expect(emuToInches(914400)).toBe(1);
  });
});
