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

import type { MeasurementUnit, PageConfig } from '../types';

export const TWIPS_PER_INCH = 1440;
export const MM_PER_INCH = 25.4;
export const CM_PER_INCH = 2.54;
export const TWIPS_PER_MM = TWIPS_PER_INCH / MM_PER_INCH; // ~56.69291338582677
export const POINTS_PER_INCH = 72;
export const TWIPS_PER_POINT = 20;
export const DEFAULT_DPI = 96;
export const TWIPS_PER_PX = TWIPS_PER_INCH / DEFAULT_DPI; // 15
export const EMUS_PER_INCH = 914400;
export const EMUS_PER_TWIP = 635;
export const EMUS_PER_POINT = 12700;

export const SCREEN_CALIBRATION_STORAGE_KEY = 'prodoc_screen_calibration';
export const MEASUREMENT_UNIT_STORAGE_KEY = 'prodoc_measurement_unit';
export const DEFAULT_PAGE_CONFIG_STORAGE_KEY = 'prodoc_default_page_config';

// --- Physical Screen Calibration ---
// In standard CSS, 1 inch = 96 CSS pixels.
// Real monitors vary in pixel density (PPI). Optional calibration allows physical ruler matching.
export interface ScreenCalibration {
  enabled: boolean;
  physicalDpi: number; // Defaults to standard 96 CSS px/inch
}

const readStoredCalibration = (): ScreenCalibration => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(SCREEN_CALIBRATION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.physicalDpi === 'number' && parsed.physicalDpi >= 48 && parsed.physicalDpi <= 300) {
          return {
            enabled: Boolean(parsed.enabled),
            physicalDpi: parsed.physicalDpi,
          };
        }
      }
    }
  } catch {
    // Ignore storage errors
  }
  return { enabled: false, physicalDpi: DEFAULT_DPI };
};

let activeCalibration: ScreenCalibration = readStoredCalibration();

export const getScreenCalibration = (): ScreenCalibration => ({ ...activeCalibration });

export const setScreenCalibration = (patch: Partial<ScreenCalibration>): void => {
  const nextDpi = typeof patch.physicalDpi === 'number'
    ? Math.max(48, Math.min(300, Math.round(patch.physicalDpi * 10) / 10))
    : activeCalibration.physicalDpi;
  activeCalibration = {
    enabled: patch.enabled !== undefined ? patch.enabled : activeCalibration.enabled,
    physicalDpi: nextDpi,
  };
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(SCREEN_CALIBRATION_STORAGE_KEY, JSON.stringify(activeCalibration));
    }
  } catch {
    // Ignore storage errors
  }
};

export const getCalibrationScale = (calibration?: ScreenCalibration): number => {
  const cal = calibration || activeCalibration;
  if (!cal.enabled) return 1;
  const clampedDpi = Math.max(48, Math.min(300, cal.physicalDpi || DEFAULT_DPI));
  return clampedDpi / DEFAULT_DPI;
};

export const getEffectiveDpi = (usePhysicalCalibration: boolean = false): number => {
  return usePhysicalCalibration && activeCalibration.enabled ? activeCalibration.physicalDpi : DEFAULT_DPI;
};

// --- Measurement Unit Preferences & Conversions ---

export const loadMeasurementUnit = (): MeasurementUnit => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(MEASUREMENT_UNIT_STORAGE_KEY);
      if (raw === 'in' || raw === 'cm' || raw === 'mm') return raw;
    }
  } catch {
    // Ignore
  }
  return 'in';
};

export const saveMeasurementUnit = (unit: MeasurementUnit): void => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(MEASUREMENT_UNIT_STORAGE_KEY, unit);
    }
  } catch {
    // Ignore
  }
};

export const inchesToUnit = (inches: number, unit: MeasurementUnit): number => {
  if (unit === 'cm') return inches * CM_PER_INCH;
  if (unit === 'mm') return inches * MM_PER_INCH;
  return inches;
};

export const unitToInches = (value: number, unit: MeasurementUnit): number => {
  if (unit === 'cm') return value / CM_PER_INCH;
  if (unit === 'mm') return value / MM_PER_INCH;
  return value;
};

export const getUnitSuffix = (unit: MeasurementUnit): string => {
  return unit === 'in' ? '"' : unit;
};

export const formatUnitNumber = (inches: number, unit: MeasurementUnit): number => {
  const raw = inchesToUnit(inches, unit);
  if (unit === 'mm') return Math.round(raw * 10) / 10;
  return Math.round(raw * 100) / 100;
};

export const formatUnitValue = (inches: number, unit: MeasurementUnit, includeSuffix = true): string => {
  const val = formatUnitNumber(inches, unit);
  return includeSuffix ? `${val}${getUnitSuffix(unit)}` : `${val}`;
};

export const loadDefaultPageConfig = (): Partial<PageConfig> | null => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(DEFAULT_PAGE_CONFIG_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as Partial<PageConfig>;
      }
    }
  } catch {
    // Ignore
  }
  return null;
};

export const saveDefaultPageConfig = (config: PageConfig): boolean => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(DEFAULT_PAGE_CONFIG_STORAGE_KEY, JSON.stringify(config));
      return true;
    }
  } catch {
    // Ignore
  }
  return false;
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

const createInchPaperDef = (name: string, widthInches: number, heightInches: number): PhysicalPaperDefinition => {
  return createPaperDef(
    name,
    widthInches * MM_PER_INCH,
    heightInches * MM_PER_INCH,
    Math.round(widthInches * TWIPS_PER_INCH),
    Math.round(heightInches * TWIPS_PER_INCH),
    widthInches,
    heightInches
  );
};

// Full ISO 216, JIS, Architectural, ANSI, Photo, Envelope, Card, and North American paper sizes
export const PHYSICAL_PAPER_SIZES: Record<string, PhysicalPaperDefinition> = {
  // --- ISO A Series (Exact mm definition) ---
  'A0': createPaperDef('A0', 841, 1189, 47679, 67408),
  'A1': createPaperDef('A1', 594, 841, 33676, 47679),
  'A2': createPaperDef('A2', 420, 594, 23811, 33676),
  'A3': createPaperDef('A3', 297, 420, 16838, 23811),
  'A4': createPaperDef('A4', 210, 297, 11906, 16838), // MS Word OpenXML standard: w:w="11906" w:h="16838"
  'A5': createPaperDef('A5', 148, 210, 8391, 11906),
  'A6': createPaperDef('A6', 105, 148, 5953, 8391),
  'A7': createPaperDef('A7', 74, 105, 4195, 5953),
  'A8': createPaperDef('A8', 52, 74, 2948, 4195),
  'A9': createPaperDef('A9', 37, 52, 2098, 2948),
  'A10': createPaperDef('A10', 26, 37, 1474, 2098),

  // --- ISO B Series ---
  'B0': createPaperDef('B0', 1000, 1414),
  'B1': createPaperDef('B1', 707, 1000),
  'B2': createPaperDef('B2', 500, 707),
  'B3': createPaperDef('B3', 353, 500),
  'B4': createPaperDef('B4', 250, 353, 14173, 20013),
  'B5': createPaperDef('B5', 176, 250, 9978, 14173),
  'B6': createPaperDef('B6', 125, 176),
  'B7': createPaperDef('B7', 88, 125),
  'B8': createPaperDef('B8', 62, 88),
  'B9': createPaperDef('B9', 44, 62),
  'B10': createPaperDef('B10', 31, 44),

  // --- JIS B Series ---
  'B4 (JIS)': createPaperDef('B4 (JIS)', 257, 364, 14570, 20636),
  'B5 (JIS)': createPaperDef('B5 (JIS)', 182, 257, 10318, 14570),

  // --- North American Standard Sizes (Exact inch definition) ---
  'Letter': createInchPaperDef('Letter', 8.5, 11),
  'Legal': createInchPaperDef('Legal', 8.5, 14),
  'Half Letter': createInchPaperDef('Half Letter', 5.5, 8.5),
  'Statement': createInchPaperDef('Statement', 5.5, 8.5),
  'Junior Legal': createInchPaperDef('Junior Legal', 5, 8),
  'Tabloid': createInchPaperDef('Tabloid', 11, 17),
  'Ledger': createInchPaperDef('Ledger', 17, 11),
  'Executive': createInchPaperDef('Executive', 7.25, 10.5),
  'Government Letter': createInchPaperDef('Government Letter', 8, 10.5),
  'Government Legal': createInchPaperDef('Government Legal', 8, 13),
  'Folio': createInchPaperDef('Folio', 8.5, 13),
  'Quarto': createInchPaperDef('Quarto', 8, 10),
  'Note': createInchPaperDef('Note', 8.5, 11),

  // --- Architectural ---
  'Arch A': createInchPaperDef('Arch A', 9, 12),
  'Arch B': createInchPaperDef('Arch B', 12, 18),
  'Arch C': createInchPaperDef('Arch C', 18, 24),
  'Arch D': createInchPaperDef('Arch D', 24, 36),
  'Arch E': createInchPaperDef('Arch E', 36, 48),
  'Arch E1': createInchPaperDef('Arch E1', 30, 42),
  'Arch E2': createInchPaperDef('Arch E2', 26, 38),
  'Arch E3': createInchPaperDef('Arch E3', 27, 39),

  // --- Engineering ---
  'ANSI C': createInchPaperDef('ANSI C', 17, 22),
  'ANSI D': createInchPaperDef('ANSI D', 22, 34),
  'ANSI E': createInchPaperDef('ANSI E', 34, 44),

  // --- Photo ---
  '2R': createInchPaperDef('2R', 2.5, 3.5),
  '3R': createInchPaperDef('3R', 3.5, 5),
  '4R': createInchPaperDef('4R', 4, 6),
  '5R': createInchPaperDef('5R', 5, 7),
  '6R': createInchPaperDef('6R', 6, 8),
  '8R': createInchPaperDef('8R', 8, 10),
  '10R': createInchPaperDef('10R', 10, 12),
  '11x14': createInchPaperDef('11x14', 11, 14),
  '12x18': createInchPaperDef('12x18', 12, 18),
  '16x20': createInchPaperDef('16x20', 16, 20),
  '20x24': createInchPaperDef('20x24', 20, 24),

  // --- Envelopes ---
  'Envelope #6 3/4': createInchPaperDef('Envelope #6 3/4', 3.625, 6.5),
  'Envelope #8': createInchPaperDef('Envelope #8', 3.625, 7.5),
  'Envelope #9': createInchPaperDef('Envelope #9', 3.875, 8.875),
  'Envelope #10': createInchPaperDef('Envelope #10', 4.125, 9.5),
  'Envelope #11': createInchPaperDef('Envelope #11', 4.5, 10.375),
  'Envelope #12': createInchPaperDef('Envelope #12', 4.75, 11),
  'Envelope #14': createInchPaperDef('Envelope #14', 5, 11.5),
  'Envelope Monarch': createInchPaperDef('Envelope Monarch', 3.875, 7.5),
  'Envelope DL': createPaperDef('Envelope DL', 110, 220),
  'Envelope C4': createPaperDef('Envelope C4', 229, 324),
  'Envelope C5': createPaperDef('Envelope C5', 162, 229),
  'Envelope C6': createPaperDef('Envelope C6', 114, 162),
  'Envelope B4': createPaperDef('Envelope B4', 250, 353),
  'Envelope B5': createPaperDef('Envelope B5', 176, 250),

  // --- Cards & Misc ---
  'Index Card 3x5': createInchPaperDef('Index Card 3x5', 3, 5),
  'Index Card 4x6': createInchPaperDef('Index Card 4x6', 4, 6),
  'Index Card 5x8': createInchPaperDef('Index Card 5x8', 5, 8),
  'Postcard': createInchPaperDef('Postcard', 4.25, 6),
  'Square 5x5': createInchPaperDef('Square 5x5', 5, 5),
  'Square 6x6': createInchPaperDef('Square 6x6', 6, 6),
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
    base = createInchPaperDef('Custom', customWidthInches, customHeightInches);
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
