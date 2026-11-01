/**
 * Centralized Physical Measurement & Conversion Core
 *
 * Provides high-precision bidirectional unit conversions across:
 * - Twips (1/20 of a point; 1 inch = 1440 twips) - Primary document layout unit
 * - Millimeters (mm) - International standard page sizing
 * - Inches (in) - Imperial standard page sizing
 * - Points (pt) - Typographic measurements (1 inch = 72 pt)
 * - CSS Pixels (px) - Screen display mapping (@ 96 DPI standard)
 * - EMUs (English Metric Units; 1 inch = 914,400 EMUs) - Document interchange
 *
 * Implements double-precision calculations with zero cumulative rounding drift.
 */

export const TWIPS_PER_INCH = 1440;
export const MM_PER_INCH = 25.4;
export const TWIPS_PER_MM = TWIPS_PER_INCH / MM_PER_INCH; // ~56.69291338582677
export const POINTS_PER_INCH = 72;
export const TWIPS_PER_POINT = 20;
export const DEFAULT_DPI = 96;
export const TWIPS_PER_PX = TWIPS_PER_INCH / DEFAULT_DPI; // 15
export const EMUS_PER_INCH = 914400;
export const EMUS_PER_TWIP = 635;
export const EMUS_PER_POINT = 12700;

// --- Physical Screen Calibration ---
// In standard CSS, 1 inch = 96 CSS pixels.
// Real monitors vary in pixel density (PPI). Optional calibration allows physical ruler matching.
export interface ScreenCalibration {
  enabled: boolean;
  physicalDpi: number; // Defaults to standard 96 CSS px/inch
}

let activeCalibration: ScreenCalibration = {
  enabled: false,
  physicalDpi: DEFAULT_DPI,
};

export const getScreenCalibration = (): ScreenCalibration => ({ ...activeCalibration });

export const setScreenCalibration = (patch: Partial<ScreenCalibration>): void => {
  activeCalibration = { ...activeCalibration, ...patch };
};

export const getEffectiveDpi = (usePhysicalCalibration: boolean = false): number => {
  return usePhysicalCalibration && activeCalibration.enabled ? activeCalibration.physicalDpi : DEFAULT_DPI;
};

// --- Basic Bidirectional Conversions ---

export const twipsToPx = (twips: number, dpi: number = DEFAULT_DPI): number => {
  return (twips / TWIPS_PER_INCH) * dpi;
};

export const pxToTwips = (px: number, dpi: number = DEFAULT_DPI): number => {
  return (px / dpi) * TWIPS_PER_INCH;
};

export const mmToTwips = (mm: number): number => {
  return (mm / MM_PER_INCH) * TWIPS_PER_INCH;
};

export const twipsToMm = (twips: number): number => {
  return (twips / TWIPS_PER_INCH) * MM_PER_INCH;
};

export const inchesToTwips = (inches: number): number => {
  return inches * TWIPS_PER_INCH;
};

export const twipsToInches = (twips: number): number => {
  return twips / TWIPS_PER_INCH;
};

export const ptToTwips = (pt: number): number => {
  return pt * TWIPS_PER_POINT;
};

export const twipsToPt = (twips: number): number => {
  return twips / TWIPS_PER_POINT;
};

export const mmToPx = (mm: number, dpi: number = DEFAULT_DPI): number => {
  return (mm / MM_PER_INCH) * dpi;
};

export const pxToMm = (px: number, dpi: number = DEFAULT_DPI): number => {
  return (px / dpi) * MM_PER_INCH;
};

export const inchesToPx = (inches: number, dpi: number = DEFAULT_DPI): number => {
  return inches * dpi;
};

export const pxToInches = (px: number, dpi: number = DEFAULT_DPI): number => {
  return px / dpi;
};

export const ptToPx = (pt: number, dpi: number = DEFAULT_DPI): number => {
  return (pt / POINTS_PER_INCH) * dpi;
};

export const pxToPt = (px: number, dpi: number = DEFAULT_DPI): number => {
  return (px / dpi) * POINTS_PER_INCH;
};

export const emuToInches = (emu: number): number => {
  return emu / EMUS_PER_INCH;
};

export const inchesToEmu = (inches: number): number => {
  return inches * EMUS_PER_INCH;
};

export const twipsToEmu = (twips: number): number => {
  return twips * EMUS_PER_TWIP;
};

export const emuToTwips = (emu: number): number => {
  return emu / EMUS_PER_TWIP;
};

// --- Standard Physical Paper Definitions ---

export interface PhysicalPaperDefinition {
  name: string;
  widthMm: number;
  heightMm: number;
  widthInches: number;
  heightInches: number;
  widthTwips: number;
  heightTwips: number;
  widthPx: number;  // Fractional @ 96 DPI
  heightPx: number; // Fractional @ 96 DPI
}

const createPaperDef = (
  name: string,
  widthMm: number,
  heightMm: number,
  exactWidthTwips?: number,
  exactHeightTwips?: number,
  explicitWidthInches?: number,
  explicitHeightInches?: number
): PhysicalPaperDefinition => {
  const widthInches = explicitWidthInches ?? (widthMm / MM_PER_INCH);
  const heightInches = explicitHeightInches ?? (heightMm / MM_PER_INCH);
  const widthTwips = exactWidthTwips ?? Math.round(widthInches * TWIPS_PER_INCH);
  const heightTwips = exactHeightTwips ?? Math.round(heightInches * TWIPS_PER_INCH);
  const widthPx = widthInches * DEFAULT_DPI;
  const heightPx = heightInches * DEFAULT_DPI;

  return {
    name,
    widthMm,
    heightMm,
    widthInches,
    heightInches,
    widthTwips,
    heightTwips,
    widthPx,
    heightPx,
  };
};

// ISO 216 and ANSI/North American standard physical sizes
// OpenXML-standard twip definitions for A4, Letter, Legal, Tabloid, etc.
export const PHYSICAL_PAPER_SIZES: Record<string, PhysicalPaperDefinition> = {
  // ISO A Series (Exact mm definition)
  'A0': createPaperDef('A0', 841, 1189, 47679, 67408),
  'A1': createPaperDef('A1', 594, 841, 33676, 47679),
  'A2': createPaperDef('A2', 420, 594, 23811, 33676),
  'A3': createPaperDef('A3', 297, 420, 16838, 23811),
  'A4': createPaperDef('A4', 210, 297, 11906, 16838), // MS Word OpenXML standard: w:w="11906" w:h="16838"
  'A5': createPaperDef('A5', 148, 210, 8391, 11906),
  'A6': createPaperDef('A6', 105, 148, 5953, 8391),

  // ISO B Series
  'B4': createPaperDef('B4', 250, 353, 14173, 20013),
  'B5': createPaperDef('B5', 176, 250, 9978, 14173),

  // North American Standard Sizes (Exact inch definition)
  'Letter': createPaperDef('Letter', 8.5 * MM_PER_INCH, 11 * MM_PER_INCH, 12240, 15840),
  'Legal': createPaperDef('Legal', 8.5 * MM_PER_INCH, 14 * MM_PER_INCH, 12240, 20160),
  'Tabloid': createPaperDef('Tabloid', 11 * MM_PER_INCH, 17 * MM_PER_INCH, 15840, 24480),
  'Ledger': createPaperDef('Ledger', 17 * MM_PER_INCH, 11 * MM_PER_INCH, 24480, 15840),
  'Executive': createPaperDef('Executive', 7.25 * MM_PER_INCH, 10.5 * MM_PER_INCH, 10440, 15120),
  'Half Letter': createPaperDef('Half Letter', 5.5 * MM_PER_INCH, 8.5 * MM_PER_INCH, 7920, 12240),
  'Statement': createPaperDef('Statement', 5.5 * MM_PER_INCH, 8.5 * MM_PER_INCH, 7920, 12240),
  'Folio': createPaperDef('Folio', 8.5 * MM_PER_INCH, 13 * MM_PER_INCH, 12240, 18720),
};

/**
 * Resolves exact physical paper dimensions for any standard or custom paper size.
 */
export const getPhysicalDimensions = (
  size: string,
  orientation: 'portrait' | 'landscape' = 'portrait',
  customWidthInches?: number,
  customHeightInches?: number
): PhysicalPaperDefinition => {
  let base: PhysicalPaperDefinition;

  if (size === 'Custom' && customWidthInches && customHeightInches) {
    base = createPaperDef(
      'Custom',
      customWidthInches * MM_PER_INCH,
      customHeightInches * MM_PER_INCH,
      Math.round(customWidthInches * TWIPS_PER_INCH),
      Math.round(customHeightInches * TWIPS_PER_INCH),
      customWidthInches,
      customHeightInches
    );
  } else {
    base = PHYSICAL_PAPER_SIZES[size] || PHYSICAL_PAPER_SIZES['Letter'];
  }

  if (orientation === 'landscape') {
    return {
      name: `${base.name} (Landscape)`,
      widthMm: base.heightMm,
      heightMm: base.widthMm,
      widthInches: base.heightInches,
      heightInches: base.widthInches,
      widthTwips: base.heightTwips,
      heightTwips: base.widthTwips,
      widthPx: base.heightPx,
      heightPx: base.widthPx,
    };
  }

  return base;
};
