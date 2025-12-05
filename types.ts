
import React from 'react';

export interface DocumentState {
  content: string;
  wordCount: number;
  charCount: number;
  lastSaved: Date | null;
  zoom: number;
  isSaved: boolean;
}

export interface EditorConfig {
  fontFamily: string;
  fontSize: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: 'justifyLeft' | 'justifyCenter' | 'justifyRight' | 'justifyFull';
}

export enum RibbonTab {
  FILE = 'File',
  HOME = 'Home',
  INSERT = 'Insert',
  DRAW = 'Draw',
  DESIGN = 'Design',
  LAYOUT = 'Layout',
  REFERENCES = 'References',
  MAILINGS = 'Mailings',
  REVIEW = 'Review',
  VIEW = 'View',
  AI_ASSISTANT = '🤖 AI Assistant',
  // Contextual Tabs
  TABLE_DESIGN = 'Table Design',
  TABLE_LAYOUT = 'Table Layout',
  EQUATION = 'Equation',
  HEADER_FOOTER = 'Header & Footer',
}

export interface AIResponse {
  text: string;
  error?: string;
}

export type AIOperation = 
  | 'summarize' 
  | 'fix_grammar' 
  | 'make_professional' 
  | 'expand' 
  | 'shorten'
  | 'simplify'
  | 'tone_friendly'
  | 'tone_confident'
  | 'tone_casual'
  | 'continue_writing'
  | 'generate_content'
  | 'edit_content'
  | 'translate_es'
  | 'translate_fr'
  | 'translate_de'
  | 'generate_outline'
  | 'generate_template_list'
  | 'translate_content';

export type ViewMode = 'print' | 'web' | 'read';
export type PageMovement = 'vertical' | 'side-to-side';

export type SaveStatus = 'saved' | 'saving' | 'unsaved';

export type PageSize = 
  // North American
  | 'Letter' | 'Legal' | 'Half Letter' | 'Statement' | 'Junior Legal' | 'Tabloid' | 'Ledger' | 'Executive' 
  | 'Government Letter' | 'Government Legal' | 'Folio' | 'Quarto' | 'Note'
  // ISO A
  | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10'
  // ISO B
  | 'B0' | 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'B10'
  // JIS B (Legacy)
  | 'B4 (JIS)' | 'B5 (JIS)'
  // Architectural
  | 'Arch A' | 'Arch B' | 'Arch C' | 'Arch D' | 'Arch E' | 'Arch E1' | 'Arch E2' | 'Arch E3'
  // Engineering
  | 'ANSI C' | 'ANSI D' | 'ANSI E'
  // Photo
  | '2R' | '3R' | '4R' | '5R' | '6R' | '8R' | '10R' | '11x14' | '12x18' | '16x20' | '20x24'
  // Envelopes
  | 'Envelope #6 3/4' | 'Envelope #8' | 'Envelope #9' | 'Envelope #10' | 'Envelope #11' | 'Envelope #12' | 'Envelope #14'
  | 'Envelope Monarch' | 'Envelope DL' | 'Envelope C4' | 'Envelope C5' | 'Envelope C6' | 'Envelope B4' | 'Envelope B5'
  // Misc
  | 'Index Card 3x5' | 'Index Card 4x6' | 'Index Card 5x8' | 'Postcard' | 'Square 5x5' | 'Square 6x6'
  | 'Custom';

export type PageOrientation = 'portrait' | 'landscape';
export type PageBackground = 'none' | 'ruled' | 'grid';
export type VerticalAlignment = 'top' | 'center' | 'justify' | 'bottom';
export type MultiplePagesType = 'normal' | 'mirrorMargins' | 'twoPagesPerSheet' | 'bookFold';
export type ApplyToType = 'wholeDocument' | 'thisSection' | 'thisPointForward';
export type SheetsPerBookletType = 'all' | '16' | '8' | '4' | '2';

export type MarginPreset = 'normal' | 'narrow' | 'moderate' | 'wide' | 'mirrored' | 'office2003' | 'custom';

export interface MarginValues {
  top: number;    // inches
  bottom: number; // inches
  left: number;   // inches (or Inside if mirrored)
  right: number;  // inches (or Outside if mirrored)
  gutter: number; // inches
}

export interface PageConfig {
  size: PageSize;
  orientation: PageOrientation;
  margins: MarginValues;      // The explicit numeric values
  marginPreset: MarginPreset; // The active preset name
  background: PageBackground;
  pageColor?: string;
  watermark?: string;
  
  // Advanced Layout - Page Setup Dialog
  headerDistance: number; // inches from edge
  footerDistance: number; // inches from edge
  verticalAlign: VerticalAlignment;
  customWidth?: number; // For custom size
  customHeight?: number; // For custom size
  gutterPosition?: 'left' | 'top';
  sectionStart?: 'newpage' | 'continuous' | 'even' | 'odd';
  differentOddEven?: boolean;
  differentFirstPage?: boolean;
  multiplePages?: MultiplePagesType; // MS Word style page layout
  mirrorMargins?: boolean; // Legacy helper, derived from multiplePages usually
  applyTo?: ApplyToType;
  sheetsPerBooklet?: SheetsPerBookletType;
  
  // Paper Source
  paperSourceFirstPage?: string;
  paperSourceOtherPages?: string;
}

export interface CustomStyle {
  id: string;
  name: string;
  styles: React.CSSProperties;
  tagName: string; // e.g., 'SPAN', 'P', 'H1'
}

export interface PaginatorResult {
  pages: string[];
  pageHeight: number;
  pageWidth: number;
}

export interface ReadModeConfig {
  theme: 'light' | 'sepia' | 'dark';
  columns: 1 | 2;
  textScale: number; // 1 is default (100%)
}

export type ActiveElementType = 'text' | 'table' | 'image' | 'equation' | 'header' | 'footer' | 'none';
export type EditingArea = 'body' | 'header' | 'footer';
