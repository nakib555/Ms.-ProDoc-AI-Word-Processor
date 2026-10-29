# MS Word-Grade Vector PDF Printing & Exact Layout Preview Engine

## Title & Summary
Engineering plan to implement high-fidelity vector PDF generation with selectable text and exact-parity print preview in Ms. ProDoc AI Word Processor. This eliminates device/OS print dialog dependencies, resolves layout and typography mismatches in the Print Preview modal, and outputs production-grade PDFs matching Microsoft Word export fidelity.

---

## User Review & Critical Decisions
> [!IMPORTANT]
> The following architectural decisions were confirmed via interactive clarification:
> - **PDF Text & Vector Rendering**: Selectable text and sharp vector rendering with high-resolution graphics, rather than low-resolution flat raster bitmaps.
> - **Print Preview Parity**: 100% exact visual and spatial match to the document's editor layout, including paper background, orientation, margins, columns, watermarks, headers, and footers.
> - **Page Geometry & Orientation**: Dynamic adaptation to custom dimensions, A4, Letter, Legal, Executive, and landscape orientations without distortion.
> - **Device Print Engine Removal**: Completely decouple PDF export from `window.print()`, guaranteeing seamless direct file download across all browsers and embedded iframe environments.

---

## 1. Verified Facts vs. Assumptions vs. Missing Information

### Verified Facts (Confirmed from Codebase Evidence)
1. **Preview Typography Discrepancy**: `PrintModal.tsx` (`renderPageContent`) manually set `text-lg` (18px) and `leading-loose` (line-height: 2) with `fontFamily: 'Inter, sans-serif'`. In contrast, `EditorPage.tsx` uses `fontSize: '11pt'`, `lineHeight: '1.35'`, and `fontFamily: 'Calibri, Inter, sans-serif'`. This caused a massive visual and pagination mismatch between the editor and preview.
2. **Missing Layout Attributes in Preview**: Multi-column layouts (`columns`, `columnGap`), watermarks (`watermark`), custom page backgrounds (`pageColor`), and table borders are present in `EditorPage.tsx` but stripped or missing in `PrintModal.tsx` and `printUtils.ts`.
3. **Device Print vs. Direct Download**: `printUtils.ts` previously had code paths that fell back to `window.print()` when running in certain environments, and rendered pages via rasterized `html2canvas` snapshots (`JPEG`) inside `jsPDF`, producing unselectable raster bitmaps.
4. **Existing Dependencies**: The project already has `jspdf` (`^4.2.1`), `html2canvas` (`^1.4.1`), `pagedjs` (`^0.4.3`), and Lucide icons installed in `package.json`.
5. **Virtualization Parity**: `PrintLayoutView.tsx` uses an incremental paginator and page geometry cache that computes exact bounding heights in inches and pixels (`96 DPI`).

### Assumptions
1. Client-side PDF generation is preferred to preserve offline privacy and avoid backend proxy dependencies.
2. The user expects standard PDF viewers (Adobe Acrobat, Chrome PDF Viewer, Apple Preview) to allow selecting and copying text directly from the generated PDF.

### Missing Information
- None. All dependencies, layout styles, and print pipeline files are fully accessible in the workspace.

---

## 2. Objective & Scope

### Purpose
To provide users with an authentic Microsoft Word-like PDF export and preview experience: what users see on the editor page is exactly what renders in the Print Preview modal, and exactly what gets saved into the exported PDF file with crystal-clear selectable text, accurate headers/footers, and precise margins.

### Success Criteria
- **Zero Device Dialogs**: Clicking "Print / Save as PDF" immediately produces a client-side `.pdf` download with progress feedback; no browser `window.print()` prompt appears.
- **Identical Preview Geometry**: Font family, font size (`11pt`), line spacing (`1.35`), column splits, margins, headers, and footers in the preview match `EditorPage.tsx` down to the pixel.
- **Searchable & Selectable Vector Text**: The downloaded PDF contains native text layers (users can highlight, copy, and search words).
- **Format Agility**: Works seamlessly across Letter, A4, Legal, Tabloid, and user-defined Custom sizes in both Portrait and Landscape orientations.
- **Multi-Page & Batch Support**: Accurately exports multi-page documents (including page number replacement `#pageNumber` / `#totalPages`) and batch document collections.

### Non-Goals
- Adding server-side headless Chrome/Puppeteer rendering (incompatible with the sandbox and unnecessary for client-side React word processing).
- Altering the user's saved document structure or mutating TipTap document models.

---

## 3. Existing System Analysis

### Architecture & Folder Structure
- `/utils/printUtils.ts`: Orchestrates `generatePdfPrint()`. Currently creates an off-screen portal `#prodoc-print-render-portal` and captures images with `html2canvas` into `jsPDF`.
- `/components/ribbon/tabs/FileTab/modals/PrintModal.tsx`: Renders the Print & Export modal with left sidebar settings and right-side desktop/mobile page preview (`DesktopPrintPreview`, `MobilePrintPreview`, `renderPageContent`).
- `/components/EditorPage/EditorPage.tsx`: The canonical ground-truth renderer for document pages in the editor, defining exact padding, margins, header/footer slots, typography, watermarks, and column styles.
- `/utils/layoutEngine.ts`: Executes block pagination and splits content into discrete pages based on paper height and margin constraints.

### Identified Deficiencies & Root Causes
```
+-----------------------------------+------------------------------------------+
| Location                          | Defect / Root Cause                      |
+-----------------------------------+------------------------------------------+
| PrintModal.tsx: renderPageContent | Hardcoded `text-lg` and `leading-loose`  |
|                                   | creates 2x text height expansion.        |
+-----------------------------------+------------------------------------------+
| PrintModal.tsx: renderPageContent | Missing `columnCount`, `columnGap`,      |
|                                   | `watermark`, and `pageColor` styles.     |
+-----------------------------------+------------------------------------------+
| printUtils.ts: generatePdfPrint   | Uses `canvas.toDataURL('image/jpeg')`,   |
|                                   | converting text into blurry, non-        |
|                                   | selectable bitmaps.                      |
+-----------------------------------+------------------------------------------+
| printUtils.ts: isTestEnv check    | Triggers `window.print()` device dialog  |
|                                   | on browser print calls.                  |
+-----------------------------------+------------------------------------------+
```

---

## 4. Architecture & Technical Strategy

### System Architecture Diagram
```
┌────────────────────────────────────────────────────────────────────────┐
│                        Ms. ProDoc Document Model                       │
│              (HTML Content + PageConfig + Header/Footer)               │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     ▼                               ▼
       ┌───────────────────────────┐   ┌───────────────────────────┐
       │   paginateContent Engine  │   │     PageConfig Normalizer  │
       │  (Breakpoints & Dividers) │   │ (Inches -> Pt/Px Geometry)│
       └─────────────┬─────────────┘   └─────────────┬─────────────┘
                     │                               │
                     └───────────────┬───────────────┘
                                     │
             ┌───────────────────────┴───────────────────────┐
             ▼                                               ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│       Print Preview UI        │               │   Direct PDF Export Engine    │
│    (PrintModal.tsx Shared)    │               │      (utils/printUtils.ts)    │
├───────────────────────────────┤               ├───────────────────────────────┤
│ • Canonical Page Frame        │               │ • jsPDF Vector + HTML Engine  │
│ • Exact 11pt / 1.35 spacing   │               │ • Native Selectable Text      │
│ • Calibri/Inter Font Stack    │               │ • Scaled Point Units (pt)     │
│ • Headers & Footers           │               │ • High-DPI Vector Assets      │
│ • Multi-column Support        │               │ • Direct File Stream (.pdf)   │
│ • Watermark & Page Color      │               │ • Zero window.print() calls   │
└───────────────────────────────┘               └───────────────────────────────┘
```

### 1. Vector PDF Engine Design (`utils/printUtils.ts`)
We will modernize `generatePdfPrint()` using `jsPDF`'s native layout engine with vector text retention:
1. **Physical Point Dimensioning**: Convert paper size in inches directly to PDF points ($1\text{ in} = 72\text{ pt}$). For Letter ($8.5 \times 11\text{ in}$), width = $612\text{ pt}$, height = $792\text{ pt}$. For A4, width = $595.28\text{ pt}$, height = $841.89\text{ pt}$.
2. **True DOM-to-Vector Rendering**: Utilize `jsPDF.html()` with an isolated headless container styled with the exact CSS print sheet rules. This allows `jsPDF` to parse text strings into selectable font glyphs, vector table borders, and SVG paths, with rasterization only applied to embedded images (`<img>`).
3. **Graceful Multi-Page Packaging**: For complex multi-column or formatted layouts, generate high-resolution vector-augmented canvases with a minimum resolution scale of 2.5–3x ($288\text{ DPI}$), embedding vector metadata so text remains crisp and razor-sharp on retina screens, print previewers, and paper printers.
4. **Progress Callback & Direct Download**: Provide granular progress feedback (`options.onProgress(percent, current, total)`), creating a seamless UX with instantaneous save dialogs without touching OS print queues.

### 2. Print Preview Parity Design (`PrintModal.tsx`)
Create a shared, dedicated `PrintPreviewPageSheet` component inside `PrintModal.tsx`:
1. **Typography Normalization**: Match `EditorPage.tsx`:
   - `fontFamily: 'Calibri, Inter, -apple-system, sans-serif'`
   - `fontSize: '11pt'`
   - `lineHeight: '1.35'`
   - `color: config.pageColor ? '#000000' : '#0f172a'`
2. **Layout Completeness**:
   - `columnCount: config.columns || 1`
   - `columnGap: \`${config.columnGap || 0.5}in\``
   - `columnFill: 'auto'`
   - `hyphens: config.hyphenation ? 'auto' : 'none'`
3. **Margins & Gutter Logic**:
   - Accurately calculate top/bottom/left/right margins including gutter positions (`left` vs `top`).
4. **Header & Footer Placement**:
   - Headers positioned at `top: ${config.headerDistance || 0.5}in`, respecting `differentFirstPage` and `differentOddEven`.
   - Footers positioned at `bottom: ${config.footerDistance || 0.5}in`, replacing `#pageNumber` and `#totalPages` tokens.
5. **Watermark & Color Atmosphere**:
   - Render diagonal watermark text overlay with appropriate opacity and rotation.
   - Render page background color (`config.pageColor`) and border styles (`config.pageBorder`).

---

## 5. Implementation Phases & Breakdown

### Phase 1: Shared Page Rendering Component (`PrintModal.tsx`)
- **Action**: Extract `renderPageContent` into a robust `PrintPreviewPage` component that mirrors `EditorPage` styles, margins, typography, columns, headers, footers, watermarks, and paper backgrounds.
- **Files Affected**: `/components/ribbon/tabs/FileTab/modals/PrintModal.tsx`
- **Validation**: Open Print Modal on single-column, multi-column, and formatted documents; verify preview matches the main editor canvas line-by-line.

### Phase 2: High-Fidelity Vector PDF Export Engine (`utils/printUtils.ts`)
- **Action**: Overhaul `generatePdfPrint` in `utils/printUtils.ts`. Remove `window.print()` device engine invocation completely. Implement high-DPI vector rendering with selectable text and exact CSS styling.
- **Files Affected**: `/utils/printUtils.ts`
- **Validation**: Download PDF from print modal; open in PDF viewer; test selecting text, copying, and zooming to 400% without blur.

### Phase 3: Edge Case Hardening & Format Compatibility
- **Action**: Verify custom paper sizes ($W \times H$), landscape orientation, custom page margins, multi-document batch export, and footnote/endnote rendering in exported PDFs.
- **Files Affected**: `/utils/printUtils.ts`, `/components/ribbon/tabs/FileTab/modals/PrintModal.tsx`
- **Validation**: Run existing Vitest unit and integration test suites (`npm run test`) and test large multi-page documents.

---

## 6. Device Experience (Desktop, Tablet, Mobile)
- **Desktop**: Split-pane layout with settings on the left (Paper size, Orientation, Margins, Range, Filename) and scaled scrollable document pages on the right with dark neutral canvas backdrop (`#525659`).
- **Tablet**: Adaptive 2-column or tabbed interface supporting landscape split view and smooth touch scrolling.
- **Mobile**: Responsive bottom-sheet / tabbed toggle between "Settings" and "Preview", with full-width floating "Download PDF" action button.

---

## 7. Quality Gates & Risk Mitigation
- **Gate 1 - Compilation**: Code passes `compile_applet` and TypeScript checks without errors.
- **Gate 2 - Test Suite**: All 27 existing unit and integration tests pass without regression.
- **Gate 3 - No Device Print Dialogs**: PDF downloads cleanly as a file in the browser without popping up OS print windows.
- **Rollback Strategy**: Git-free rollback by restoring clean implementations of `printUtils.ts` and `PrintModal.tsx`.

---

## 8. Execution Checklist
1. [ ] Update `PrintModal.tsx` preview component to match `EditorPage.tsx` typography (`11pt`, `lineHeight: 1.35`), column layouts, margins, headers, footers, and watermarks.
2. [ ] Overhaul `utils/printUtils.ts` to generate high-fidelity vector PDFs with selectable text layers, proper orientation/size point calculations, and remove device `window.print()` calls.
3. [ ] Verify batch export and custom page range selections.
4. [ ] Run `npm run test` and `compile_applet` to ensure zero compilation or regression failures.
