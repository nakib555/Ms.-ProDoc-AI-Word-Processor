# Feature Inventory: ProDoc Word Processor

## 1. System Architecture & Foundation
- **Framework Stack**: React 19.2.0, Vite 6.2.0, TypeScript 5.8.2, Tailwind CSS.
- **Editor Engine**: Hybrid architecture with Tiptap/ProseMirror (`@tiptap/core`, `@tiptap/react`, `@tiptap/starter-kit`) and custom multi-page canvas layout engine (`utils/layout/`).
- **Data Persistence**: Versioned schema model (`utils/documentModel.ts`, supporting v1, v2, v3 schema transitions) with localStorage persistence and 1500ms debounced auto-save (`hooks/useAutoSave.ts`).
- **Mathematical Expression Engine**: MathLive (`mathlive` 0.101.0) LaTeX formula editor with inline/block equation rendering and auto-correct (`utils/mathAutoCorrect.ts`).

---

## 2. Ribbon Navigation & Functional Tabs
| Tab | Key Subsystems & Tools | Status |
| :--- | :--- | :--- |
| **Home** | Clipboard (cut/copy/paste), Font styling (family, size, bold, italic, underline, strikethrough, subscript, superscript, color, highlight), Paragraph alignments (left, center, right, justify, indent, spacing, lists), Voice (Read Aloud TTS), Find & Replace. | Active |
| **Insert** | Tables (insert, dynamic matrix, styles, properties, formula evaluation), Illustrations (images, resizing, captions, shapes), Equations (MathLive formulas, symbols, presets), Links & Bookmarks, Header & Footer, Page Break, Date & Time. | Active |
| **Draw** | Freehand drawing tools, ink annotations, pen width and color selectors, eraser. | Active |
| **Design** | Document themes (Office, Modern, Elegant, Contrast), color palettes, watermark system (draft, confidential, custom), page color. | Active |
| **Layout** | Margins (Normal, Narrow, Moderate, Wide, Custom), Orientation (Portrait, Landscape), Page Sizes (Letter, Legal, A4, Executive, Custom), Multi-column layouts, Line numbers, Paragraph indentation. | Active |
| **References** | Table of Contents engine, Footnotes, Endnotes, Citation graph, Cross-references, Caption indexing. | Active |
| **Mailings** | Envelopes, Labels, Recipient list manager, Merge fields. | Active |
| **Review** | Word count dialog, Spell & grammar service, Comments sidebar, Notes drawer, JSON document tree inspector. | Active |
| **View** | View Modes (Print Layout with pagination, Web Layout, Read Mode), Zoom controls (preset zoom, fit-width, fit-page, pinch-to-zoom with focal centering), Ruler toggle, Gridlines, Formatting marks toggle. | Active |
| **File** | Info modal, New document, Open from disk, Save / Save As (.docjson, .docx, .html, .txt, .pdf), Print modal, Share modal. | Active |

---

## 3. Layout, Pagination & Viewports
- **Print Layout Engine**: Paginated multi-page view (`PrintLayoutView.tsx`) with dynamic geometry calculation, margin offsets, headers/footers, and page breaks.
- **Web Layout Engine**: Responsive continuous scrolling view (`WebLayoutView.tsx`) with prose styling and scaling.
- **Read Mode**: Distraction-free two-page book reader view (`ReadLayoutView.tsx`).
- **Touch & Gesture System**: Industry-grade multi-touch engine powered by `@use-gesture/react` (`useTouchZoom.tsx`) featuring 60–120 FPS GPU hardware-accelerated transforms, smooth CSS transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) on transform updates, concurrent two-finger panning and pinching, midpoint focal-point tracking, scroll offset compensation, trackpad Ctrl+wheel support, double-tap zoom toggle, and live floating zoom HUD.

---

## 4. Import / Export Capabilities
- **Supported Formats**:
  - `.docjson` (v1, v2, v3 schema formats with automatic migration).
  - `.docx` (via Mammoth.js and docx import engine).
  - `.html` (with sanitization and structural conversion).
  - `.txt` (plain text extractor).
  - `.pdf` (print dialog export).
