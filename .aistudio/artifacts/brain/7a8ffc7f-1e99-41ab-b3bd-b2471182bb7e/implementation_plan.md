# Engineering Specification: Professional PDF Engine & True-to-Size Document Layout

## Protocol Governance
This engineering plan is governed by the **Master Engineering Planning & Implementation Protocol (Evidence-First)**. No code modification, package installation, or implementation will proceed until this plan has received explicit user approval.

---

## 1. Verified Facts (Evidence Gathered)
- **Editor Core**: The application uses **TipTap (ProseMirror)** (`@tiptap/react` v2.2.4, `@tiptap/starter-kit`, `@tiptap/pm`, `@tiptap/extension-table`) configured with custom nodes for page breaks (`prodoc-page-break`), equations (`mathlive`), tables, footnotes, and endnotes.
- **Content Model**: Content is stored and manipulated primarily as semantic HTML strings and converted to a structured `JSONDocumentModel` (`utils/documentModel.ts`).
- **Current Layout & Pagination**: 
  - `utils/layoutEngine.ts` and `utils/layout/` implement a multi-pass measurement engine (`GeometryCalculator`, `LayoutSandboxImpl`, `Paginator`, `PaginationLoop`).
  - `components/EditorPage/EditorPage.tsx` renders each page inside a styled DOM container (`.prodoc-page-container` and `.prodoc-page-sheet`).
- **Current Printing & Export Flaw**: 
  - `utils/printUtils.ts` currently injects print CSS into `document.head` and executes native browser `window.print()`.
  - In `components/ribbon/tabs/FileTab/modals/PrintModal.tsx`, clicking "Download PDF" invokes `generatePdfPrint(...)`, which triggers the browser's native print dialog rather than generating and downloading a standalone PDF file directly.
- **Existing Dependencies**:
  - `pagedjs` (`^0.4.3`) is already installed in `node_modules` and declared in `package.json`.
  - `jspdf`, `pdf-lib`, and `@react-pdf/renderer` are **not** currently installed.
- **Dimension Standard**: The codebase currently defines paper sizes in `constants.ts` using screen pixel values at 96 DPI (e.g., Letter = 816x1056, A4 = 794x1122), and margins in inches (`MarginValues` { top, bottom, left, right, gutter }). Physical millimeters and exact PDF point geometries are not currently the primary calculation units.
- **Zoom System**: Zoom is managed in `contexts/EditorContext.tsx` via `zoom: number` (default 100) and `zoomMode: 'custom' | 'fit-width' | 'fit-page'`. In `StatusBar.tsx`, zoom is adjustable via a slider and +/- buttons, but lacks direct discrete presets (50%, 75%, 90%, 100%, 125%, 150%, 200%).

---

## 2. Assumptions
- Users require direct, one-click PDF downloading that saves a real `.pdf` file with selectable and searchable text without ever triggering `window.print()` or the browser print dialog.
- The default unit for user-facing page setup and margins should be millimeters (mm), while maintaining backward compatibility with existing document models and presets.
- Preserving TipTap ProseMirror cursor movement, undo/redo history, selection highlights, and keyboard shortcuts takes precedence over any destructive DOM-splitting approaches.

---

## 3. Missing Information
- No critical information is missing. The existing codebase architecture, formatting extensions, print pipelines, and UI modals were thoroughly analyzed from source files.

---

## 4. Clarification Questions
- *None needed.* All requirements are explicitly defined in the task specification.

---

## 5. Complexity Classification
- **Level 4: Architecture** (Core document layout engine enhancement, physical millimeter geometry system, client-side vector/text PDF generation pipeline, dedicated print workflow, and Word-style page setup interface).

---

## 6. Objective
- **Purpose**: Upgrade the React Word editor into a professional document editor with true-to-life physical paper dimensions (mm), Microsoft Word-style pagination, adjustable margins in millimeters, discrete and adaptive zoom controls, and a direct client-side PDF export engine.
- **Problem**: The current application delegates PDF export to the browser's native print dialog (`window.print()`), which creates inconsistent hardcopy outputs, depends on browser driver settings, lacks direct PDF downloading, and uses pixel approximations instead of true millimeter-to-point physical measurements.
- **Success Criteria**:
  1. Users can click "Export PDF" to immediately generate and download a multi-page, vector-quality PDF with selectable text, correct page geometry in points ($1\text{ mm} = \frac{72}{25.4}\text{ pt}$), proper margins, and page breaks—with zero browser print dialogs.
  2. Paper sizes (A4, A5, Letter, Legal, and Custom) are modeled and displayed in exact millimeters and scaled via CSS transforms for zoom without altering underlying content.
  3. Margin controls allow setting Top, Bottom, Left, and Right in millimeters with real-time preview and validation.
  4. Zoom controls include 50%, 75%, 90%, 100%, 125%, 150%, 200%, Fit Width, Fit Page, and Custom Zoom.
  5. The dedicated Print Modal displays an interactive print preview, metadata summary, and direct download/print access based on the generated PDF.
- **Non-Goals**:
  - Rebuilding the editor from scratch or replacing TipTap ProseMirror with a canvas-only editor.
  - Adding AI chatbots or telemetry.

---

## 7. Existing System Analysis
- **Editor State**: Managed via `contexts/EditorContext.tsx` providing `editor`, `content`, `pageConfig`, `zoom`, `viewMode`, etc.
- **Page Layout**: `components/EditorPage/EditorPage.tsx` renders individual sheets with drop-shadows, headers, footers, and contentEditable sections.
- **Geometry System**: `utils/layout/GeometryCalculator.ts` converts `PageConfig` to pixel dimensions at 96 DPI.
- **Print System**: `utils/printUtils.ts` builds `@media print` CSS rules and invokes `window.print()`.

---

## 8. Architecture & Library Selection

### Library Evaluation
1. **`@react-pdf/renderer`**:
   - *Strengths*: Highly structured PDF generation in pure React.
   - *Weaknesses*: Uses a proprietary primitives system (`<Document>`, `<Page>`, `<View>`, `<Text>`) and cannot parse arbitrary HTML, CSS styles, complex tables, or TipTap ProseMirror DOM directly. An AST converter would lead to severe regressions with tables, equations, and font styling.
   - *Verdict*: **Not suitable** for this HTML/ProseMirror-based architecture.
2. **`react-to-print`**:
   - *Weaknesses*: Solely wraps `window.print()`, directly violating the requirement to eliminate browser print dialogs.
   - *Verdict*: **Rejected**.
3. **`Paged.js`**:
   - *Strengths*: Already installed in `package.json` (`^0.4.3`). Adheres to W3C Paged Media CSS specifications (`@page`, running headers/footers, break-inside avoid). Ideal for pagination previews and calculating exact print page splits.
   - *Weaknesses*: Paged.js outputs paged HTML DOM; it does not serialize a standalone `.pdf` binary file on its own.
4. **`jspdf` + `html2pdf.js` / `pdf-lib`**:
   - *Strengths*: `jspdf` generates true PDF documents directly in the client, accepts custom dimensions in millimeters or points (`new jsPDF({ unit: 'pt', format: [wPt, hPt] })`), supports multi-page outputs, embeds vectors and text, and provides direct `.save()` and Blob output.
   - Combining `Paged.js` (for layout and page segmentation) with `jspdf` (for direct PDF binary serialization with selectable text and exact mm/point page geometry) provides the ideal, robust solution without rewriting the editor.

### Selected Architecture
- **Layout & Dimension Engine**: Upgraded `GeometryCalculator` and `constants.ts` with explicit `PAPER_DIMENSIONS_MM` and exact conversion formulas:
  $$\text{points} = \text{mm} \times \frac{72}{25.4}$$
  $$\text{pixels (at 96 DPI)} = \frac{\text{mm}}{25.4} \times 96$$
- **Pagination**: Dual-mode pagination:
  1. *Live Interactive Mode*: Seamless multi-page TipTap editor sheets in `EditorPage.tsx` with millimeter-accurate inner writing areas and page break markers.
  2. *Print/Export Pipeline*: `Paged.js` layout runner that partitions the document into precise physical pages with running headers, footers, and pagination numbers.
- **Direct PDF Engine**: Dedicated module `utils/pdfExportEngine.ts` utilizing `jspdf` to generate multi-page vector PDFs with exact point dimensions, selectable text, and direct file download.
- **Dedicated Print Workflow**: In `PrintModal.tsx`, replace the `window.print()` trigger with an in-app PDF previewer and direct PDF download/print interface.

---

## 9. Implementation Breakdown

### Phase 1: Physical Dimensions & Millimeter Geometry
- **Files**: `/types.ts`, `/constants.ts`, `/utils/layout/GeometryCalculator.ts`, `/utils/unitConversion.ts`
- **Details**:
  - Define standard paper dimensions in mm:
    - **A4**: 210 × 297 mm ($595.28 \times 841.89\text{ pt}$)
    - **A5**: 148 × 210 mm ($419.53 \times 595.28\text{ pt}$)
    - **Letter**: 215.9 × 279.4 mm ($612.00 \times 792.00\text{ pt}$)
    - **Legal**: 215.9 × 355.6 mm ($612.00 \times 1008.00\text{ pt}$)
    - **Custom**: User-defined width and height in mm.
  - Extend `MarginValues` with millimeter support (`topMm`, `bottomMm`, `leftMm`, `rightMm`). Default margins set to 20 mm.
  - Add conversion utilities (`mmToPt`, `mmToPx`, `mmToIn`, `ptToMm`).
  - Validation to ensure margin sum never exceeds paper dimensions (minimum 30 mm writable width and height).

### Phase 2: Word-Style Page Editor & Zoom System
- **Files**: `/contexts/EditorContext.tsx`, `/components/StatusBar.tsx`, `/components/ribbon/tabs/ViewTab/zoom/ZoomTool.tsx`, `/components/ribbon/tabs/ViewTab/zoom/ZoomGroup.tsx`, `/components/EditorPage/EditorPage.tsx`
- **Details**:
  - Enhance `EditorContext` zoom handler to support discrete zoom levels: **50%, 75%, 90%, 100%, 125%, 150%, 200%**, as well as **Fit Width**, **Fit Page**, and **Custom**.
  - Ensure zoom scaling is applied solely as a CSS transform (`transform: scale(...)`) on the page container, keeping font sizes, line heights, and paper dimensions intact.
  - Compute `Fit Width` dynamically based on the editor viewport width minus margins and rulers.
  - Compute `Fit Page` dynamically based on viewport height.

### Phase 3: Direct Client-Side PDF Generation Engine
- **Files**: `/package.json`, `/utils/pdfExportEngine.ts`, `/utils/printUtils.ts`
- **Details**:
  - Install `jspdf` (`npm i jspdf` and `npm i -D @types/jspdf`).
  - Implement `exportDocumentToPdf(options)`:
    - Measures pages using millimeter geometry.
    - Creates a new `jsPDF` instance with exact point dimensions ($1\text{ mm} = 2.83465\text{ pt}$).
    - Renders each page to vector PDF, preserving text selectability, headings, lists, tables, images, and styling.
    - Generates progress status (0% to 100%) during multi-page export.
    - Direct browser download as `[documentTitle].pdf`.

### Phase 4: Dedicated Print Modal & Page Setup Interface
- **Files**: `/components/ribbon/tabs/FileTab/modals/PrintModal.tsx`, `/components/ribbon/tabs/LayoutTab/page_setup/size/MorePageSizes/PageSetupDialog.tsx`, `/components/ribbon/tabs/LayoutTab/page_setup/Margins/MarginsTool.tsx`
- **Details**:
  - Update `PrintModal.tsx` to provide:
    - Real-time PDF layout preview.
    - Paper size, orientation, page count, and millimeter margin summary.
    - Direct "Download PDF" button that runs `exportDocumentToPdf` without opening browser print.
    - Dedicated "Print Document" action opening the PDF in a clean printing frame or providing clear guidance.
  - Update `PageSetupDialog.tsx` to accept millimeters for paper size and margins with instant visual feedback and validation.

---

## 10. Platform Experience

### Desktop Experience
- Realistic white sheets centered on `#f1f5f9` with subtle shadows (`box-shadow: 0 4px 12px rgba(0,0,0,0.08)`).
- Quick zoom selector dropdown in the bottom-right status bar with quick presets (50% to 200%, Fit Width, Fit Page).
- Millimeter ruler at the top synchronized with page margins.

### Tablet Experience
- Touch and pinch-to-zoom support without disrupting cursor focus.
- Adaptive Page Setup modal with touch-friendly number steppers for millimeter margins.

### Mobile Experience
- Automatically defaults to `Fit Width` for optimal readability.
- Full access to Page Setup and Direct PDF Download via the File Ribbon tab.

---

## 11. Performance & Accessibility
- **Performance**: Zoom operations use CSS `transform: scale()` with `transform-origin: top center` to run on the GPU compositor, avoiding document reflows. Multi-page PDF generation processes pages asynchronously in chunks with progress reporting to prevent main-thread freezing.
- **Accessibility**: All dialogs and controls feature full keyboard navigation (Tab/Shift-Tab, Esc to dismiss, Enter to confirm), ARIA labels, and WCAG AA contrast ratios.

---

## 12. Security & Compatibility
- **Security**: All PDF generation is 100% client-side; no document text, tokens, or images leave the browser.
- **Compatibility**: Retains full backward compatibility with existing `PageConfig`, presets, TipTap extensions, and localStorage auto-save models.

---

## 13. Testing Strategy
1. **Single-Page A4 Document**: Verify PDF dimensions measure exactly $595.28 \times 841.89\text{ pt}$.
2. **Multi-Page Sets 01-11 Document**: Verify 21-page exam paper exports without missing text or duplicated pages.
3. **Physical Zoom Invariance**: Verify changing zoom from 50% to 200% does not change exported PDF dimensions or font sizes.
4. **Millimeter Margins**: Test setting 20 mm, 25.4 mm (1 in), and custom margins; verify that margins are applied once and reflected in the exported PDF.
5. **Text Selectability**: Open exported PDF in Acrobat/Chrome and verify text can be highlighted, selected, and searched.
6. **Lint & Build**: Run `npm run lint` and `npm run build` to verify clean compilation.

---

## 14. Execution Checklist
1. [ ] Install `jspdf` and `@types/jspdf`.
2. [ ] Create `/utils/unitConversion.ts` with standard mm, pt, in, and px conversion functions.
3. [ ] Update `/types.ts` and `/constants.ts` with millimeter paper constants and margin types.
4. [ ] Update `/utils/layout/GeometryCalculator.ts` to calculate dimensions from exact millimeter values.
5. [ ] Implement `/utils/pdfExportEngine.ts` for direct client-side PDF generation.
6. [ ] Update `/contexts/EditorContext.tsx` and `/components/StatusBar.tsx` with professional zoom controls (50%, 75%, 90%, 100%, 125%, 150%, 200%, Fit Width, Fit Page, Custom).
7. [ ] Update `PageSetupDialog.tsx` and `MarginsTool.tsx` for millimeter inputs and validation.
8. [ ] Update `PrintModal.tsx` to use the direct PDF export engine and remove `window.print()` dependency.
9. [ ] Run linting and build validation.

---

## 15. Quality Gates
- [x] Architecture matches existing ProseMirror/TipTap architecture.
- [x] No browser print dialog dependency.
- [x] Physical millimeter measurements and PDF point conversions verified.
- [x] Plan documented and saved in artifacts.

---

## 16. Approval Gate
**STOP.** Awaiting user approval. No files will be modified or created until you reply with **Approved**, **Proceed**, or **Implement**.
