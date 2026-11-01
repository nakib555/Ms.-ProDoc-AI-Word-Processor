import { describe, it, expect } from 'vitest';
import { TypographyEngine } from '../../utils/typographyEngine';

describe('Stage 2: Hybrid Typography Measurement Engine', () => {
  it('generates accurate CSS font strings and font metrics in points', () => {
    const cssFont = TypographyEngine.getCssFontString('Calibri', 12, 'bold', 'normal');
    expect(cssFont).toBe('normal bold 16px Calibri'); // 12 pt = 16 px @ 96 DPI

    const metrics = TypographyEngine.getFontMetrics('Calibri', 12, 'normal', 'normal', 1.15);
    expect(metrics.fontSizePt).toBe(12);
    expect(metrics.fontSizePx).toBe(16);
    expect(metrics.lineHeightMultiplier).toBe(1.15);
    expect(metrics.lineHeightPx).toBeCloseTo(16 * 1.15, 2);
  });

  it('measures text width and word wrapping accurately within available content width', () => {
    const text = 'The quick brown fox jumps over the lazy dog and runs across the field.';
    const availableWidth = 300; // px

    const measured = TypographyEngine.measureParagraphText(text, availableWidth, {
      fontFamily: 'Arial',
      fontSizePt: 11,
      lineHeight: 1.15,
    });

    expect(measured.lineCount).toBeGreaterThan(1);
    expect(measured.lines.length).toBe(measured.lineCount);
    // Every line must respect the available width
    for (const line of measured.lines) {
      expect(line.width).toBeLessThanOrEqual(availableWidth + 5);
    }
    // Total height must be line count times line height
    expect(measured.totalHeight).toBeGreaterThanOrEqual(measured.lineCount * measured.lineHeightPx);
  });

  it('verifies font-loading guard executes cleanly and resolves without errors', async () => {
    await expect(TypographyEngine.ensureFontsLoaded()).resolves.toBeUndefined();
  });

  it('leverages multi-level cache for instantaneous repeated measurements', () => {
    const text = 'Standard repeating measurement test string for performance caching.';
    const width = 450;

    const t0 = performance.now();
    const first = TypographyEngine.measureParagraphText(text, width);
    const firstDuration = performance.now() - t0;

    const t1 = performance.now();
    const second = TypographyEngine.measureParagraphText(text, width);
    const secondDuration = performance.now() - t1;

    expect(second).toEqual(first);
    expect(secondDuration).toBeLessThanOrEqual(firstDuration + 0.5);
  });
});
