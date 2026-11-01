# Implementation Plan: Microsoft Word-Level Physical Document Dimensions & Rendering Accuracy

Upgrade the document editor's measurement core, typography measurement, page layout, screen rendering, pagination, and printing systems to achieve physical dimension accuracy comparable to Microsoft Word, executed in stages with automated test checkpoints.

---

## Architecture Overview

```
                               ┌────────────────────────────────────────────────────────┐
                               │           Centralized Measurement Core                 │
                               │  1 inch = 1440 twips = 25.4 mm = 72 pt = 96 CSS px     │
                               │        Twip / EMU Internal Source of Truth             │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
                    ┌─────────────────────────────────────┴─────────────────────────────────────┐
                    ▼                                                                           ▼
      ┌───────────────────────────┐                                               ┌───────────────────────────┐
      │  Exact Paper Dimensions   │                                               │ Hybrid Typography Engine  │
      │  A4: 210 × 297 mm         │                                               │ Canvas: Fast text width   │
      │  Letter: 8.5 × 11 in      │                                               │ DOM Probe: Heights/metrics│
      │  A3, A5, Legal, Tabloid   │                                               │ Font-face loading guards  │
      └─────────────┬─────────────┘                                               └─────────────┬─────────────┘
                    │                                                                           │
                    └─────────────────────────────────────┬─────────────────────────────────────┘
                                                          ▼
                               ┌────────────────────────────────────────────────────────┐
                               │             Word-Fidelity Pagination                   │
                               │  Widow/Orphan (2 lines) · Keep-with-next headings      │
                               │  Multi-page table splitting · Page breaks · Gutters    │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
                    ┌─────────────────────────────────────┴─────────────────────────────────────┐
                    ▼                                                                           ▼
      ┌───────────────────────────┐                                               ┌───────────────────────────┐
      │    Screen Rendering       │                                               │ Unified Print & PDF Path  │
      │  Exact physical aspect    │                                               │ CSS @page: size: 210mm... │
      │  True 100% CSS mapping    │                                               │ Exact physical margins    │
      │  Virtual window (<250 DOM)│                                               │ Vector text in PDF        │
      └───────────────────────────┘                                               └───────────────────────────┘
```

---

## Stage-by-Stage Implementation & Automated Test Checkpoints

### Stage 1: Centralized Physical Measurement & Conversion Core
- **File**: `utils/measurement.ts`
- **Specification**:
  - Internal standard unit: **Twips** (1 inch = 1440 twips; 1 pt = 20 twips; 1 mm = 1440 / 25.4 = 56.69291338582677 twips; 1 EMU = 1/635 twip).
  - Bidirectional, high-precision conversion utilities with zero cumulative floating-point rounding drift:
    - `twipsToPx(twips: number, dpi?: number): number`
    - `pxToTwips(px: number, dpi?: number): number`
    - `mmToTwips(mm: number): number`
    - `twipsToMm(twips: number): number`
    - `inchesToTwips(inches: number): number`
    - `twipsToInches(twips: number): number`
    - `ptToTwips(pt: number): number`
    - `twipsToPt(twips: number): number`
    - `mmToPx(mm: number, dpi?: number): number`
    - `pxToMm(px: number, dpi?: number): number`
    - `inchesToPx(inches: number, dpi?: number): number`
    - `pxToInches(px: number, dpi?: number): number`
    - `ptToPx(pt: number, dpi?: number): number`
    - `pxToPt(px: number, dpi?: number): number`
    - `emuToInches(emu: number): number`
    - `inchesToEmu(inches: number): number`
  - Exact international paper definitions in Twips & Physical Millimeters / Inches:
    - `A4`: 210 × 297 mm (11,906 × 16,838 twips)
    - `A3`: 297 × 420 mm (16,838 × 23,811 twips)
    - `A5`: 148 × 210 mm (8,391 × 11,906 twips)
    - `Letter`: 8.5 × 11 in (12,240 × 15,840 twips)
    - `Legal`: 8.5 × 14 in (12,240 × 20,160 twips)
    - `Tabloid`: 11 × 17 in (15,840 × 24,480 twips)
    - `Executive`, `Folio`, `Statement`, and `Custom` paper support.
- **Automated Test Checkpoint 1**:
  - Create `tests/unit/physicalMeasurement.test.ts`.
  - Validate:
    - $1\text{ in} = 25.4\text{ mm} = 96\text{ CSS px} = 72\text{ pt} = 1440\text{ twips} = 914,400\text{ EMU}$.
    - A4 width = 210 mm, height = 297 mm (exact twip matching OpenXML `w:w="11906" w:h="16838"`).
    - Letter width = 215.9 mm (8.5 in), height = 279.4 mm (11 in).
    - Multi-step roundtrip conversions ($A \to B \to C \to A$) within $\pm 0.0001\text{ twips}$.

---

### Stage 2: Typography & Hybrid Canvas + DOM Text Measurement Engine
- **Files**: `utils/typographyEngine.ts`, `utils/layout/LayoutSandboxImpl.ts`, `utils/layout/MeasurementService.ts`
- **Specification**:
  - **Hybrid Measurement System**:
    - **Canvas Subsystem**: Fast-path text metrics (`measureText()`) on cached `CanvasRenderingContext2D` to compute line wrapping, word boundaries, and character advances in microseconds.
    - **DOM Probe Subsystem**: Isolated layout sandbox to measure browser-rendered line heights, sub-pixel ascenders/descenders, paragraph margins, inline styles (bold, italic, superscripts), and complex elements (math formulas, tables).
    - **Font-Loading Guards**: Integrate `await document.fonts.ready` before final pagination to eliminate font-swap reflow jumps.
    - **Measurement Caching**: Multi-level cache keyed by `hash(text, font, size, width, lineHeight)` with automatic cache invalidation when styles or content change.
  - **Typography Attributes**:
    - Points (`pt`) as source of truth for font size.
    - Accurate line heights based on font family metrics (e.g., Calibri 1.15 line pitch, Times New Roman 1.15, Arial 1.15).
    - Paragraph spacing before & after (`space-before`, `space-after`) in exact points/twips.
    - First-line indents and left/right indents in exact inches/twips.
    - Line wrapping calculated strictly against available body width ($W_{\text{body}} = W_{\text{page}} - \text{Margin}_{\text{left}} - \text{Margin}_{\text{right}} - \text{Gutter}$).
- **Automated Test Checkpoint 2**:
  - Create `tests/unit/typographyEngine.test.ts`.
  - Validate:
    - Canvas text-width measurement matches DOM probe within $\pm 1\text{px}$.
    - Available content width wrapping prevents text overflow beyond page margin boundaries.
    - Font-loading guard resolves cleanly without throwing in headless/jsdom or browser environments.

---

### Stage 3: Word-Fidelity Screen Rendering & Page Geometry
- **Files**: `utils/layout/GeometryCalculator.ts`, `components/EditorPage.tsx`, `components/ribbon/tabs/ViewTab/views/PrintLayoutView.tsx`, `components/Ruler.tsx`, `components/PageSetupModal.tsx`
- **Specification**:
  - `GeometryCalculator.ts`:
    - Derive page width, height, body width, and body height directly from exact twip definitions rather than rounded integer pixels.
    - Support gutter positions (`left`, `top`), mirrored margins (`inside`, `outside`), and header/footer distances.
  - `EditorPage.tsx`:
    - Render pages with exact CSS physical dimensions (`width: 210mm`, `min-height: 297mm` or precise fractional pixels `@ 96 DPI` = `793.701px × 1122.520px`).
    - Clean Slate Executive aesthetic with pure `#ffffff` paper sheet and subtle drop shadow.
  - `PrintLayoutView.tsx`:
    - 100% zoom maps exact physical dimensions to screen.
    - Zoom levels (`50%`, `75%`, `100%`, `125%`, `150%`, `200%`, Fit Width, Fit Page) apply purely as viewport scale transforms, never altering the underlying document twips or margin dimensions.
  - `Ruler.tsx`:
    - Render calibrated inch and millimeter rulers with zero cumulative graduation drift.
- **Automated Test Checkpoint 3**:
  - Create `tests/unit/pageGeometry.test.ts`.
  - Validate geometry calculations for portrait and landscape across A4, Letter, Legal, A3, A5, and custom sizes.
  - Verify ruler graduations align exactly with page margins and body width.

---

### Stage 4: Professional Pagination & Page Splitting Engine
- **Files**: `utils/layout/Paginator.ts`, `utils/layout/IncrementalPaginator.ts`, `utils/layout/SplitStrategy.ts`, `utils/layout/PageBuilder.ts`
- **Specification**:
  - **Automatic Text Flow**: Seamless paragraph flow across page boundaries.
  - **Widow & Orphan Control**: Enforce minimum 2 lines at bottom of page (orphan) and top of next page (widow), preventing lone lines.
  - **Keep-with-Next**: Headings (`h1`, `h2`, `h3`) never appear alone at the bottom of a page without at least 2 lines of subsequent paragraph content.
  - **Page Breaks**: Explicit `.prodoc-page-break` and section break handling.
  - **Multi-Page Table Splitting**:
    - Large tables split between rows cleanly across page boundaries.
    - Header rows (`<thead>`) optionally repeat on subsequent pages.
    - Individual table row height respected; oversized cells handled gracefully.
  - **Headers & Footers**:
    - Header distance and footer distance measured in twips from the top and bottom sheet edges.
- **Automated Test Checkpoint 4**:
  - Create `tests/unit/wordPagination.test.ts`.
  - Validate widow/orphan rules, keep-with-next heading splits, and multi-page table row splitting.

---

### Stage 5: Unified Dedicated Print & PDF Engine
- **Files**: `utils/printUtils.ts`, `index.css`
- **Specification**:
  - Dedicated `@page` CSS generation:
    - Inject `@page { size: 210mm 297mm; margin: 0; }` for A4 portrait, `@page { size: 8.5in 11in; margin: 0; }` for Letter, etc.
    - Enforce print-specific styles (`@media print`) that hide all ribbons, rulers, sidebars, and viewport scaling, printing only pure physical document pages.
  - Native browser print (`window.print()`):
    - Uses dedicated print portal rendered from the authoritative document model.
  - Vector PDF export (`generatePdfPrint`):
    - Generates vector-accurate PDFs using exact physical dimensions in points/mm via `jsPDF`, preserving selectable vector text, table borders, and image aspect ratios.
- **Automated Test Checkpoint 5**:
  - Create `tests/unit/printFidelity.test.ts`.
  - Verify `@page` style generation, PDF page size configuration, and physical margin parity between screen, print preview, and PDF export.

---

### Stage 6: Full Verification, Performance & 4GB RAM Validation
- **Specification**:
  - Validate 100, 500, and 1,000-page document scaling under the strict 4GB RAM DOM node budget (< 250 mounted nodes total).
  - Verify 0 lag during rapid scrolling with $O(\log N)$ binary search page visibility.
  - Run full test suite (`npm test`).
  - Run `lint_applet` (ensure 0 errors) and `compile_applet`.
  - Follow 10-second idle protocol and verify console is free of uncaught errors.

---

## Verification Plan

### Automated Test Suites
- `tests/unit/physicalMeasurement.test.ts` (Twips, mm, inches, pt, EMU, zero rounding drift)
- `tests/unit/typographyEngine.test.ts` (Canvas + DOM hybrid measurement, font guards, line wrapping)
- `tests/unit/pageGeometry.test.ts` (A4, Letter, A3, Legal, custom sizes, gutters, rulers)
- `tests/unit/wordPagination.test.ts` (Widow/orphan, keep-with-next, table splitting)
- `tests/unit/printFidelity.test.ts` (Print preview, CSS @page, PDF export layout)
- Full test suite: `npx vitest run` (all 11+ test suites must pass 100%)

### Manual & Performance Verification
- Inspect dev server on port 3000.
- Switch between A4, Letter, Legal, A3, A5 and verify physical dimensions in screen, print dialog, and PDF download.
- Verify 100% zoom matches physical CSS units.
- Verify 1,000-page document maintains smooth 60 FPS scrolling and instantaneous input responsiveness on 4GB RAM devices.
