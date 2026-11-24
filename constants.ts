
import { RibbonTab, MarginValues } from './types';
import { PHYSICAL_PAPER_SIZES } from './utils/measurement';

export const FONTS = [
  'Arial', 'Inter', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Noto Serif',
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Poppins', 'Nunito',
  'Playfair Display', 'Merriweather', 'Lora', 'PT Sans', 'PT Serif'
];

export const FONT_SIZES = [
  '8', '9', '10', '11', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48', '72'
];

export const TABS = [
  RibbonTab.FORMAT,
  RibbonTab.INSERT,
  RibbonTab.LAYOUT,
  RibbonTab.STRUCTURE,
  RibbonTab.COLLABORATE,
  RibbonTab.TEMPLATES,
  RibbonTab.VIEW
];

export const DEFAULT_CONTENT = `
<h1 style="font-size: 24pt; font-weight: bold; color: #1e293b; margin-bottom: 8px;">Document Title</h1>
<p style="font-size: 11pt; color: #64748b; margin-bottom: 24px;">Professional Document &bull; ProDoc Editor</p>
<p style="font-size: 11pt; line-height: 1.5; color: #334155; margin-bottom: 16px;">
  Welcome to your document. This editor provides Microsoft Word-level precision with exact physical page dimensions, typography, and pure vector PDF export.
</p>
<h2 style="font-size: 16pt; font-weight: 600; color: #1e293b; margin-top: 24px; margin-bottom: 12px;">Core Capabilities</h2>
<ul style="font-size: 11pt; line-height: 1.6; color: #334155; margin-bottom: 20px;">
  <li><strong>Pure Vector PDF:</strong> Sharp, selectable, and copyable text at any zoom level with true ISO 216 &amp; North American dimensions.</li>
  <li><strong>Word-Grade Pagination:</strong> Automated widow/orphan control, table cell preservation, and multi-column flows.</li>
  <li><strong>International Typography:</strong> Native DOM shaping with complex script support for English, Bengali, and Arabic.</li>
</ul>
<table style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-top: 16px; margin-bottom: 24px; font-size: 10.5pt;">
  <thead>
    <tr style="background-color: #f8fafc;">
      <th style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-weight: 600; color: #1e293b;">Feature</th>
      <th style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-weight: 600; color: #1e293b;">Engine Implementation</th>
      <th style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: center; font-weight: 600; color: #1e293b;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;">Vector Rendering</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;">jsPDF vector graphics &amp; text coordinates</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: center; color: #16a34a; font-weight: 600;">Active</td>
    </tr>
    <tr>
      <td style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;">Layout Precision</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px 12px; color: #334155;">Twip-based double precision conversions</td>
      <td style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: center; color: #16a34a; font-weight: 600;">Active</td>
    </tr>
  </tbody>
</table>
<p style="font-size: 11pt; line-height: 1.5; color: #334155;">
  Start typing to edit this document, or insert tables, formulas, and images using the ribbon above.
</p>
`;

// Layout Constants
export const PAGE_MARGIN_PADDING = 24;

// Derived directly from canonical PHYSICAL_PAPER_SIZES @ 96 DPI (1 inch = 96px)
export const PAGE_SIZES: Record<string, { width: number; height: number }> = Object.fromEntries(
  Object.entries(PHYSICAL_PAPER_SIZES).map(([key, def]) => [
    key,
    { width: def.widthPx, height: def.heightPx },
  ])
);

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
  normal: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  narrow: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  moderate: { top: 1.0, bottom: 1.0, left: 0.75, right: 0.75, gutter: 0 },
  wide: { top: 1.0, bottom: 1.0, left: 2.0, right: 2.0, gutter: 0 },
  mirrored: { top: 1.0, bottom: 1.0, left: 1.25, right: 1.0, gutter: 0 },
  classic: { top: 1.0, bottom: 1.0, left: 1.25, right: 1.25, gutter: 0 },
  
  // Extended Presets
  academicStandard: { top: 1.0, bottom: 1.0, left: 1.5, right: 1.0, gutter: 0 },
  apa: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  mla: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  chicago: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  thesisTopHeavy: { top: 1.5, bottom: 1.0, left: 1.5, right: 1.0, gutter: 0 },
  thesisBalanced: { top: 1.25, bottom: 1.25, left: 1.25, right: 1.25, gutter: 0 },
  corporateClean: { top: 1.0, bottom: 0.75, left: 1.0, right: 1.0, gutter: 0 },
  executiveLetter: { top: 1.25, bottom: 1.0, left: 1.25, right: 1.0, gutter: 0 },
  novelBook: { top: 1.0, bottom: 1.0, left: 1.25, right: 0.75, gutter: 0 },
  magazineLayout: { top: 0.75, bottom: 0.75, left: 0.5, right: 0.5, gutter: 0 },
  heavyBinding: { top: 1.0, bottom: 1.0, left: 1.5, right: 1.0, gutter: 0 },
  narrowHeader: { top: 0.5, bottom: 0.75, left: 0.5, right: 0.5, gutter: 0 },
  wideBottom: { top: 0.75, bottom: 1.5, left: 0.75, right: 0.75, gutter: 0 },
  symmetricalWide: { top: 1.5, bottom: 1.5, left: 1.5, right: 1.5, gutter: 0 },
  legalFormat: { top: 1.0, bottom: 1.0, left: 1.25, right: 1.0, gutter: 0 },
  formDocument: { top: 0.5, bottom: 0.5, left: 0.75, right: 0.75, gutter: 0 },
  envelope: { top: 0.25, bottom: 0.25, left: 0.5, right: 0.5, gutter: 0 },
  labelSheet: { top: 0.2, bottom: 0.2, left: 0.2, right: 0.2, gutter: 0 },
  posterMinimal: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  posterBalanced: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  compactReport: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  extendedReport: { top: 1.25, bottom: 1.25, left: 1.25, right: 1.25, gutter: 0 },
  letterhead: { top: 1.0, bottom: 1.0, left: 1.5, right: 1.5, gutter: 0 },
  newsletter: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  flyer: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  brochureFold: { top: 0.75, bottom: 0.75, left: 1.0, right: 1.0, gutter: 0 },
  doubleColumn: { top: 1.0, bottom: 1.0, left: 0.75, right: 0.75, gutter: 0 },
  photoLayout: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  postcard: { top: 0.2, bottom: 0.2, left: 0.2, right: 0.2, gutter: 0 },
  greetingCard: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  businessProposal: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  marketingPlan: { top: 1.0, bottom: 1.0, left: 0.75, right: 0.75, gutter: 0 },
  resumeStandard: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  resumeCompact: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  coverLetter: { top: 1.0, bottom: 1.0, left: 1.25, right: 1.25, gutter: 0 },
  binderFriendly: { top: 1.0, bottom: 1.0, left: 1.5, right: 1.0, gutter: 0 },
  trainingManual: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  projectPlan: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  technicalReport: { top: 1.0, bottom: 1.0, left: 0.75, right: 0.75, gutter: 0 },
  financialReport: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  invoice: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  certificate: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  invitation: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  menuLayout: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  newsletterCompact: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  magazineWide: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  annualReport: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  slideNotes: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  academicCompact: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  academicWide: { top: 1.25, bottom: 1.25, left: 1.25, right: 1.25, gutter: 0 },
  conferencePaper: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  whitepaper: { top: 1.0, bottom: 1.0, left: 0.75, right: 0.75, gutter: 0 },
  trainingHandout: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  instructionManual: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  labReport: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  researchPaperNarrow: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  researchPaperStandard: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  dissertationTopHeavy: { top: 1.5, bottom: 1.0, left: 1.5, right: 1.0, gutter: 0 },
  dissertationBalanced: { top: 1.25, bottom: 1.25, left: 1.25, right: 1.25, gutter: 0 },
  bookManuscript: { top: 1.0, bottom: 1.0, left: 1.25, right: 0.75, gutter: 0 },
  childrenBook: { top: 0.75, bottom: 0.75, left: 1.0, right: 0.75, gutter: 0 },
  comicBook: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  technicalManualWide: { top: 1.5, bottom: 1.5, left: 1.5, right: 1.5, gutter: 0 },
  artPortfolio: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  photographyBook: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  weddingProgram: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  eventProgram: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  festivalGuide: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  realEstateFlyer: { top: 0.25, bottom: 0.25, left: 0.25, right: 0.25, gutter: 0 },
  propertyBrochure: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  travelGuide: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  productCatalog: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  menuCompact: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  menuWide: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  recipeBook: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  planner: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  journal: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  diary: { top: 0.75, bottom: 0.75, left: 0.75, right: 0.75, gutter: 0 },
  manualCompact: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
  manualWide: { top: 1.25, bottom: 1.25, left: 1.25, right: 1.25, gutter: 0 },
  technicalSpec: { top: 1.0, bottom: 1.0, left: 1.0, right: 1.0, gutter: 0 },
  engineeringDrawing: { top: 1.0, bottom: 1.0, left: 1.25, right: 1.0, gutter: 0 },
  blueprint: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, gutter: 0 },
};
