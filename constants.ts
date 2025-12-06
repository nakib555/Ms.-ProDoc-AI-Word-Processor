
import { RibbonTab, MarginValues } from './types';

export const DPI = 1200;

const toPx = (inches: number) => Math.round(inches * DPI);

export const FONTS = [
  'Arial', 'Inter', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Noto Serif'
];

export const FONT_SIZES = [
  '8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'
];

export const TABS = [
  RibbonTab.FILE,
  RibbonTab.HOME,
  RibbonTab.INSERT,
  RibbonTab.DRAW,
  RibbonTab.DESIGN,
  RibbonTab.LAYOUT,
  RibbonTab.REFERENCES,
  RibbonTab.MAILINGS,
  RibbonTab.REVIEW,
  RibbonTab.VIEW,
  RibbonTab.AI_ASSISTANT
];

export const DEFAULT_CONTENT = `<p><br></p>`;

// Layout Constants
export const PAGE_MARGIN_PADDING = toPx(0.25); // Approx 24px at 96dpi, scaled

// NOTE: Width/Height in Pixels @ 1200 DPI
export const PAGE_SIZES: Record<string, { width: number, height: number }> = {
  // --- ISO A-Series (Approximate inches) ---
  'A0': { width: toPx(33.11), height: toPx(46.81) },
  'A1': { width: toPx(23.39), height: toPx(33.11) },
  'A2': { width: toPx(16.54), height: toPx(23.39) },
  'A3': { width: toPx(11.69), height: toPx(16.54) },
  'A4': { width: toPx(8.27), height: toPx(11.69) },
  'A5': { width: toPx(5.83), height: toPx(8.27) },
  'A6': { width: toPx(4.13), height: toPx(5.83) },
  'A7': { width: toPx(2.91), height: toPx(4.13) },
  'A8': { width: toPx(2.05), height: toPx(2.91) },
  'A9': { width: toPx(1.46), height: toPx(2.05) },
  'A10': { width: toPx(1.02), height: toPx(1.46) },

  // --- ISO B-Series ---
  'B0': { width: toPx(39.37), height: toPx(55.67) },
  'B1': { width: toPx(27.83), height: toPx(39.37) },
  'B2': { width: toPx(19.69), height: toPx(27.83) },
  'B3': { width: toPx(13.90), height: toPx(19.69) },
  'B4': { width: toPx(9.84), height: toPx(13.90) },
  'B5': { width: toPx(6.93), height: toPx(9.84) },
  'B6': { width: toPx(4.92), height: toPx(6.93) },
  'B7': { width: toPx(3.46), height: toPx(4.92) },
  'B8': { width: toPx(2.44), height: toPx(3.46) },
  'B9': { width: toPx(1.73), height: toPx(2.44) },
  'B10': { width: toPx(1.22), height: toPx(1.73) },
  
  // Legacy JIS Support (Approx)
  'B4 (JIS)': { width: toPx(10.12), height: toPx(14.33) },
  'B5 (JIS)': { width: toPx(7.17), height: toPx(10.12) },

  // --- North American ---
  'Letter': { width: toPx(8.5), height: toPx(11) },
  'Legal': { width: toPx(8.5), height: toPx(14) },
  'Half Letter': { width: toPx(5.5), height: toPx(8.5) },
  'Statement': { width: toPx(5.5), height: toPx(8.5) },
  'Junior Legal': { width: toPx(5), height: toPx(8) },
  'Tabloid': { width: toPx(11), height: toPx(17) },
  'Ledger': { width: toPx(17), height: toPx(11) },
  'Executive': { width: toPx(7.25), height: toPx(10.5) },
  'Government Letter': { width: toPx(8), height: toPx(10.5) },
  'Government Legal': { width: toPx(8), height: toPx(13) },
  'Folio': { width: toPx(8.5), height: toPx(13) },
  'Quarto': { width: toPx(8), height: toPx(10) },
  'Note': { width: toPx(8.5), height: toPx(11) },

  // --- Architectural ---
  'Arch A': { width: toPx(9), height: toPx(12) },
  'Arch B': { width: toPx(12), height: toPx(18) },
  'Arch C': { width: toPx(18), height: toPx(24) },
  'Arch D': { width: toPx(24), height: toPx(36) },
  'Arch E': { width: toPx(36), height: toPx(48) },
  'Arch E1': { width: toPx(30), height: toPx(42) },
  'Arch E2': { width: toPx(26), height: toPx(38) }, // Approx
  'Arch E3': { width: toPx(27), height: toPx(39) }, // Approx

  // --- Engineering ---
  'ANSI C': { width: toPx(17), height: toPx(22) },
  'ANSI D': { width: toPx(22), height: toPx(34) },
  'ANSI E': { width: toPx(34), height: toPx(44) },

  // --- Photo ---
  '2R': { width: toPx(2.5), height: toPx(3.5) },
  '3R': { width: toPx(3.5), height: toPx(5) },
  '4R': { width: toPx(4), height: toPx(6) },
  '5R': { width: toPx(5), height: toPx(7) },
  '6R': { width: toPx(6), height: toPx(8) },
  '8R': { width: toPx(8), height: toPx(10) },
  '10R': { width: toPx(10), height: toPx(12) },
  '11x14': { width: toPx(11), height: toPx(14) },
  '12x18': { width: toPx(12), height: toPx(18) },
  '16x20': { width: toPx(16), height: toPx(20) },
  '20x24': { width: toPx(20), height: toPx(24) },

  // --- Envelopes ---
  'Envelope #6 3/4': { width: toPx(3.625), height: toPx(6.5) },
  'Envelope #8': { width: toPx(3.625), height: toPx(7.5) },
  'Envelope #9': { width: toPx(3.875), height: toPx(8.875) },
  'Envelope #10': { width: toPx(4.125), height: toPx(9.5) },
  'Envelope #11': { width: toPx(4.5), height: toPx(10.375) },
  'Envelope #12': { width: toPx(4.75), height: toPx(11) },
  'Envelope #14': { width: toPx(5), height: toPx(11.5) },
  'Envelope Monarch': { width: toPx(3.875), height: toPx(7.5) },
  'Envelope DL': { width: toPx(4.33), height: toPx(8.66) },
  'Envelope C4': { width: toPx(9.02), height: toPx(12.76) },
  'Envelope C5': { width: toPx(6.38), height: toPx(9.02) },
  'Envelope C6': { width: toPx(4.49), height: toPx(6.38) },
  'Envelope B4': { width: toPx(9.84), height: toPx(13.9) },
  'Envelope B5': { width: toPx(6.93), height: toPx(9.84) },

  // --- Cards & Misc ---
  'Index Card 3x5': { width: toPx(3), height: toPx(5) },
  'Index Card 4x6': { width: toPx(4), height: toPx(6) },
  'Index Card 5x8': { width: toPx(5), height: toPx(8) },
  'Postcard': { width: toPx(4.25), height: toPx(6) },
  'Square 5x5': { width: toPx(5), height: toPx(5) },
  'Square 6x6': { width: toPx(6), height: toPx(6) },
};

export const PAPER_FORMATS = [
  // --- Standard North American ---
  { id: 'Letter', label: 'Letter', width: '8.5"', height: '11"' },
  { id: 'Legal', label: 'Legal', width: '8.5"', height: '14"' },
  { id: 'Executive', label: 'Executive', width: '7.25"', height: '10.5"' },
  { id: 'Statement', label: 'Statement', width: '5.5"', height: '8.5"' },
  { id: 'Tabloid', label: 'Tabloid', width: '11"', height: '17