/**
 * Precise Unit Conversion Utilities for Physical Document Layout and PDF Engine
 * 
 * Standards:
 * - 1 inch = 25.4 mm
 * - 1 pt = 1/72 inch (PostScript standard point used by PDF engines)
 * - 1 mm = 72 / 25.4 pt = 2.834645669291339 pt
 * - 1 inch = 96 px (standard web display DPI)
 * - A4 = 210 x 297 mm = 595.28 x 841.89 pt
 * - A5 = 148 x 210 mm = 419.53 x 595.28 pt
 * - Letter = 215.9 x 279.4 mm (8.5 x 11 in) = 612 x 792 pt
 * - Legal = 215.9 x 355.6 mm (8.5 x 14 in) = 612 x 1008 pt
 */

export const MM_PER_INCH = 25.4;
export const PTS_PER_INCH = 72;
export const PTS_PER_MM = PTS_PER_INCH / MM_PER_INCH; // ~2.834645669...
export const DEFAULT_DPI = 96;

/** Convert millimeters to PDF points */
export function mmToPt(mm: number): number {
  return Number((mm * PTS_PER_MM).toFixed(2));
}

/** Convert PDF points to millimeters */
export function ptToMm(pt: number): number {
  return Number((pt / PTS_PER_MM).toFixed(2));
}

/** Convert millimeters to inches */
export function mmToIn(mm: number): number {
  return Number((mm / MM_PER_INCH).toFixed(3));
}

/** Convert inches to millimeters */
export function inToMm(inches: number): number {
  return Number((inches * MM_PER_INCH).toFixed(2));
}

/** Convert millimeters to screen pixels at given DPI */
export function mmToPx(mm: number, dpi: number = DEFAULT_DPI): number {
  return Number(((mm / MM_PER_INCH) * dpi).toFixed(2));
}

/** Convert screen pixels to millimeters at given DPI */
export function pxToMm(px: number, dpi: number = DEFAULT_DPI): number {
  return Number(((px / dpi) * MM_PER_INCH).toFixed(2));
}

/** Convert inches to PDF points */
export function inToPt(inches: number): number {
  return Number((inches * PTS_PER_INCH).toFixed(2));
}

/** Convert PDF points to inches */
export function ptToIn(pt: number): number {
  return Number((pt / PTS_PER_INCH).toFixed(3));
}

/** Exact Physical Dimensions in Millimeters */
export const PAPER_DIMENSIONS_MM: Record<string, { width: number; height: number; label: string }> = {
  'A4': { width: 210, height: 297, label: 'A4 (210 × 297 mm)' },
  'A5': { width: 148, height: 210, label: 'A5 (148 × 210 mm)' },
  'Letter': { width: 215.9, height: 279.4, label: 'Letter (215.9 × 279.4 mm)' },
  'Legal': { width: 215.9, height: 355.6, label: 'Legal (215.9 × 355.6 mm)' },
  'A3': { width: 297, height: 420, label: 'A3 (297 × 420 mm)' },
  'Executive': { width: 184.15, height: 266.7, label: 'Executive (184.2 × 266.7 mm)' },
  'Tabloid': { width: 279.4, height: 431.8, label: 'Tabloid (279.4 × 431.8 mm)' },
};

/**
 * Validates document margins against paper dimensions.
 * Ensures minimum 30mm printable content width and height to prevent broken layout.
 */
export function validateMargins(
  paperWidthMm: number,
  paperHeightMm: number,
  marginsMm: { top: number; bottom: number; left: number; right: number }
): { valid: boolean; error?: string; printableWidthMm: number; printableHeightMm: number } {
  const printableWidthMm = paperWidthMm - (marginsMm.left + marginsMm.right);
  const printableHeightMm = paperHeightMm - (marginsMm.top + marginsMm.bottom);

  if (marginsMm.top < 0 || marginsMm.bottom < 0 || marginsMm.left < 0 || marginsMm.right < 0) {
    return {
      valid: false,
      error: 'Margins cannot be negative.',
      printableWidthMm,
      printableHeightMm
    };
  }

  if (printableWidthMm < 30) {
    return {
      valid: false,
      error: `Horizontal margins (${marginsMm.left + marginsMm.right} mm) exceed printable paper width. Minimum printable width is 30 mm.`,
      printableWidthMm,
      printableHeightMm
    };
  }

  if (printableHeightMm < 30) {
    return {
      valid: false,
      error: `Vertical margins (${marginsMm.top + marginsMm.bottom} mm) exceed printable paper height. Minimum printable height is 30 mm.`,
      printableWidthMm,
      printableHeightMm
    };
  }

  return {
    valid: true,
    printableWidthMm,
    printableHeightMm
  };
}

/**
 * Calculates page dimensions in millimeters, pixels, and points for any PageConfig.
 */
export function getPhysicalDimensions(
  size: string,
  orientation: 'portrait' | 'landscape',
  customWidthMm?: number,
  customHeightMm?: number
) {
  let widthMm: number;
  let heightMm: number;

  if (size === 'Custom' && customWidthMm && customHeightMm) {
    widthMm = customWidthMm;
    heightMm = customHeightMm;
  } else if (PAPER_DIMENSIONS_MM[size]) {
    widthMm = PAPER_DIMENSIONS_MM[size].width;
    heightMm = PAPER_DIMENSIONS_MM[size].height;
  } else {
    // Default fallback to A4 or Letter
    widthMm = 210;
    heightMm = 297;
  }

  if (orientation === 'landscape') {
    const temp = widthMm;
    widthMm = heightMm;
    heightMm = temp;
  }

  const widthPt = mmToPt(widthMm);
  const heightPt = mmToPt(heightMm);
  const widthPx = mmToPx(widthMm);
  const heightPx = mmToPx(heightMm);
  const widthIn = mmToIn(widthMm);
  const heightIn = mmToIn(heightMm);

  return {
    widthMm,
    heightMm,
    widthPt,
    heightPt,
    widthPx,
    heightPx,
    widthIn,
    heightIn
  };
}
