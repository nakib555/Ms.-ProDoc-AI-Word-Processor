
import { RibbonTab, MarginValues } from './types';

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
export const PAGE_MARGIN_PADDING = 24;

// NOTE: Width/Height in Pixels @ 96 DPI (1 inch = 96px)
export const PAGE_SIZES: Record<string, { width: number, height: number }> = {
  // --- ISO A-Series ---
  'A0': { width: 3179, height: 4494 },
  'A1': { width: 2245, height: 3179 },
  'A2': { width: 1588, height: 2245 },
  'A3': { width: 1122, height: 1588 },
  'A4': { width: 794, height: 1122 },
  'A5': { width: 560, height: 794 },
  'A6': { width: 396, height: 560 },
  'A7': { width: 279, height: 396 },
  'A8': { width: 197, height: 279 },
  'A9': { width: 140, height: 197 },
  'A10': { width: 98, height: 140 },

  // --- ISO B-Series ---
  'B0': { width: 3780, height: 5344 },
  'B1': { width: 2672, height: 3780 },
  'B2': { width: 1890, height: 2672 },
  'B3': { width: 1334, height: 1890 },
  'B4': { width: 945, height: 1334 },
  'B5': { width: 665, height: 945 },
  'B6': { width: 472, height: 665 },
  'B7': { width: 332, height: 472 },
  'B8': { width: 234, height: 332 },
  'B9': { width: 166, height: 234 },
  'B10': { width: 117, height: 166 },
  
  // Legacy JIS Support
  'B4 (JIS)': { width: 945, height: 1334 },
  'B5 (JIS)': { width: 665, height: 945 },

  // --- North American ---
  'Letter': { width: 816, height: 1056 },
  'Legal': { width: 816, height: 1344 },
  'Half Letter': { width: 528, height: 816 },
  'Statement': { width: 528, height: 816 },
  'Junior Legal': { width: 480, height: 768 },
  'Tabloid': { width: 1056, height: 1632 },
  'Ledger': { width: 1632, height: 1056 },
  'Executive': { width: 696, height: 1008 },
  'Government Letter': { width: 768, height: 1008 },
  'Government Legal': { width: 768, height: 1248 },
  'Folio': { width: 816, height: 1248 },
  'Quarto': { width: 768, height: 960 },
  'Note': { width: 816, height: 1056 },

  // --- Architectural ---
  'Arch A': { width: 864, height: 1152 },
  'Arch B': { width: 1152, height: 1728 },
  'Arch C': { width: 1728, height: 2304 },
  'Arch D': { width: 2304, height: 3456 },
  'Arch E': { width: 3456, height: 4608 },
  'Arch E1': { width: 2880, height: 4032 },
  'Arch E2': { width: 2496, height: 3648 },
  'Arch E3': { width: 2592, height: 3744 },

  // --- Engineering ---
  'ANSI C': { width: 1632, height: 2112 },
  'ANSI D': { width: 2112, height: 3264 },
  'ANSI E': { width: 3264, height: 4224 },

  // --- Photo ---
  '2R': { width: 240, height: 336 },
  '3R': { width: 336, height: 480 },
  '4R': { width: 384, height: 576 },
  '5R': { width: 480, height: 672 },
  '6R': { width: 576, height: 768 },
  '8R': { width: 768, height: 960 },
  '10R': { width: 960, height: 1152 },
  '11x14': { width: 1056, height: 1344 },
  '12x18': { width: 1152, height: 1728 },
  '16x20': { width: 1536, height: 1920 },
  '20x24': { width: 1920, height: 2304 },

  // --- Envelopes ---
  'Envelope #6 3/4': { width: 348, height: 624 },
  'Envelope #8': { width: 348, height: 720 },
  'Envelope #9': { width: 372, height: 852 },
  'Envelope #10': { width: 396, height: 912 },
  'Envelope #11': { width: 432, height: 996 },
  'Envelope #12': { width: 456, height: 1056 },
  'Envelope #14': { width: 480, height: 1104 },
  'Envelope Monarch': { width: 372, height: 720 },
  'Envelope DL': { width: 416, height: 831 },
  'Envelope C4': { width: 866, height: 1225 },
  'Envelope C5': { width: 612, height: 866 },
  'Envelope C6': { width: 431, height: 612 },
  'Envelope B4': { width: 945, height: 1334 },
  'Envelope B5': { width: 665, height: 945 },

  // --- Cards & Misc ---
  'Index Card 3x5': { width: 288, height: 480 },
  'Index Card 4x6': { width: 384, height: 576 },
  'Index Card 5x8': { width: 480, height: 768 },
  'Postcard': { width: 408, height: 576 },
  'Square 5x5': { width: 480, height: 480 },
  'Square 6x6': { width: 576, height: 576 },
};

export const PAPER_FORMATS = [
  // --- Standard North American ---
  { id: 'Letter', label: 'Letter', width: '8.5"', height: '11"' },
  { id: 'Legal', label: 'Legal', width: '8.5"', height: '14"' },
  { id: 'Executive', label: 'Executive', width: '7.25"', height: '10.5"' },
  { id: 'Statement', label: 'Statement', width: '5.5"', height: '8.5"' },
  { id: 'Tabloid', label: 'Tabloid', width: '11"', height: '17"' },
  { id: 'Ledger', label: 'Ledger', width: '17"', height: '11"' },
  { id: 'Junior Legal', label: 'Junior Legal', width: '5"', height: '8"' },
  { id: 'Government Letter', label: 'Gov. Letter', width: '8"', height: '10.5"' },
  { id: 'Government Legal', label: 'Gov. Legal', width: '8"', height: '13"' },
  { id: 'Folio', label: 'Folio', width: '8.5"', height: '13"' },
  { id: 'Quarto', label: 'Quarto', width: '8"', height: '10"' },
  { id: 'Note', label: 'Note', width: '8.5"', height: '11"' },

  // --- ISO A-Series ---
  { id: 'A0', label: 'A0', width: '33.11"', height: '46.81"' },
  { id: 'A1', label: 'A1', width: '23.39"', height: '33.11"' },
  { id: 'A2', label: 'A2', width: '16.54"', height: '23.39"' },
  { id: 'A3', label: 'A3', width: '11.69"', height: '16.54"' },
  { id: 'A4', label: 'A4', width: '8.27"', height: '11.69"' },
  { id: 'A5', label: 'A5', width: '5.83"', height: '8.27"' },
  { id: 'A6', label: 'A6', width: '4.13"', height: '5.83"' },
  { id: 'A7', label: 'A7', width: '2.91"', height: '4.13"' },
  { id: 'A8', label: 'A8', width: '2.05"', height: '2.91"' },
  { id: 'A9', label: 'A9', width: '1.46"', height: '2.05"' },
  { id: 'A10', label: 'A10', width: '1.02"', height: '1.46"' },

  // --- ISO B-Series ---
  { id: 'B0', label: 'B0', width: '39.37"', height: '55.67"' },
  { id: 'B1', label: 'B1', width: '27.83"', height: '39.37"' },
  { id: 'B2', label: 'B2', width: '19.69"', height: '27.83"' },
  { id: 'B3', label: 'B3', width: '13.90"', height: '19.69"' },
  { id: 'B4', label: 'B4', width: '9.84"', height: '13.90"' },
  { id: 'B5', label: 'B5', width: '6.93"', height: '9.84"' },
  { id: 'B6', label: 'B6', width: '4.92"', height: '6.93"' },
  { id: 'B7', label: 'B7', width: '3.46"', height: '4.92"' },
  { id: 'B8', label: 'B8', width: '2.44"', height: '3.46"' },
  { id: 'B9', label: 'B9', width: '1.73"', height: '2.44"' },
  { id: 'B10', label: 'B10', width: '1.22"', height: '1.73"' },
  
  // --- Envelopes ---
  { id: 'Envelope #10', label: 'Envelope #10', width: '4.125"', height: '9.5"' },
  { id: 'Envelope DL', label: 'Envelope DL', width: '4.33"', height: '8.66"' },
  { id: 'Envelope C4', label: 'Envelope C4', width: '9.02"', height: '12.76"' },
  { id: 'Envelope C5', label: 'Envelope C5', width: '6.38"', height: '9.02"' },
  { id: 'Envelope C6', label: 'Envelope C6', width: '4.49"', height: '6.38"' },
  { id: 'Envelope Monarch', label: 'Envelope Monarch', width: '3.875"', height: '7.5"' },
  { id: 'Envelope #6 3/4', label: 'Envelope #6 3/4', width: '3.625"', height: '6.5"' },
  { id: 'Envelope #8', label: 'Envelope #8', width: '3.625"', height: '7.5"' },
  { id: 'Envelope #9', label: 'Envelope #9', width: '3.875"', height: '8.875"' },
  { id: 'Envelope #11', label: 'Envelope #11', width: '4.5"', height: '10.375"' },
  { id: 'Envelope #12', label: 'Envelope #12', width: '4.75"', height: '11"' },
  { id: 'Envelope #14', label: 'Envelope #14', width: '5"', height: '11.5"' },
  { id: 'Envelope B4', label: 'Envelope B4', width: '9.84"', height: '13.9"' },
  { id: 'Envelope B5', label: 'Envelope B5', width: '6.93"', height: '9.84"' },

  // --- Architectural ---
  { id: 'Arch A', label: 'Arch A', width: '9"', height: '12"' },
  { id: 'Arch B', label: 'Arch B', width: '12"', height: '18"' },
  { id: 'Arch C', label: 'Arch C', width: '18"', height: '24"' },
  { id: 'Arch D', label: 'Arch D', width: '24"', height: '36"' },
  { id: 'Arch E', label: 'Arch E', width: '36"', height: '48"' },
  { id: 'Arch E1', label: 'Arch E1', width: '30"', height: '42"' },
  
  // --- Engineering ---
  { id: 'ANSI C', label: 'ANSI C', width: '17"', height: '22"' },
  { id: 'ANSI D', label: 'ANSI D', width: '22"', height: '34"' },
  { id: 'ANSI E', label: 'ANSI E', width: '34"', height: '44"' },

  // --- Photo ---
  { id: '2R', label: '2R', width: '2.5"', height: '3.5"' },
  { id: '3R', label: '3R', width: '3.5"', height: '5"' },
  { id: '4R', label: '4R (4x6)', width: '4"', height: '6"' },
  { id: '5R', label: '5R (5x7)', width: '5"', height: '7"' },
  { id: '6R', label: '6R (6x8)', width: '6"', height: '8"' },
  { id: '8R', label: '8R (8x10)', width: '8"', height: '10"' },
  { id: '10R', label: '10R (10x12)', width: '10"', height: '12"' },
  { id: '11x14', label: '11x14', width: '11"', height: '14"' },
  { id: '12x18', label: '12x18', width: '12"', height: '18"' },
  { id: '16x20', label: '16x20', width: '16"', height: '20"' },
  { id: '20x24', label: '20x24', width: '20"', height: '24"' },

  // --- Cards & Misc ---
  { id: 'Index Card 3x5', label: 'Index Card 3x5', width: '3"', height: '5"' },
  { id: 'Index Card 4x6', label: 'Index Card 4x6', width: '4"', height: '6"' },
  { id: 'Index Card 5x8', label: 'Index Card 5x8', width: '5"', height: '8"' },
  { id: 'Postcard', label: 'Postcard', width: '4.25"', height: '6"' },
  { id: 'Square 5x5', label: 'Square 5x5', width: '5"', height: '5"' },
  { id: 'Square 6x6', label: 'Square 6x6', width: '6"', height: '6"' },
];

export const MARGIN_PRESETS: Record<string, MarginValues> = {
  normal: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
  narrow: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  moderate: { top: 1, bottom: 1, left: 0.75, right: 0.75, gutter: 0 },
  wide: { top: 1, bottom: 1, left: 2, right: 2, gutter: 0 },
  // Mirrored: Left becomes Inside, Right becomes Outside
  mirrored: { top: 1, bottom: 1, left: 1.25, right: 1, gutter: 0 }, 
  office2003: { top: 1, bottom: 1, left: 1.25, right: 1.25, gutter: 0 },
};
