# Implementation Plan: MS Word-Level Direct Client-Side Vector PDF Engine

## User Requirements & Clarifications Summary
1. **No Browser Built-in Print Dialog**: The user explicitly specified *"just dont use broswer build in printer pdf"*. PDF export must be generated client-side and trigger a direct `.pdf` file download.
2. **True MS Word Vector Fidelity**: Replace `html2canvas` whole-page rasterization with direct vector rendering so text, borders, tables, dividers, backgrounds, and headers/footers remain infinitely sharp mathematical vectors at any zoom level (100% to 1000%).
3. **Font Embedding & International Unicode Support**: Support Latin, Bengali, Arabic, and mixed scripts with vector text rendering, preserving glyph positioning and font metrics.
4. **Physical Document Geometry**: Preserve exact Word-standard dimensions (A4: 210 × 297 mm / 595.28 × 841.89 pt; Letter: 8.5 × 11 in / 612 × 792 pt; A3, A5, Legal, Tabloid, and custom dimensions), exact margins, and gutters.
5. **No Regressions**: Keep all 17 test suites (68+ tests) passing, including `printFidelity.test.ts`, `largeDocumentPerformance.test.ts`, `wordPagination.test.ts`, and `internationalTypography.test.ts`.

---

## Architecture & Proposed Changes

### 1. `utils/vectorPdfEngine.ts` (New Dedicated Vector Engine)
Build a specialized client-side DOM-to-Vector layout parser that walks the paginated document DOM tree and translates each element directly into jsPDF vector commands:
- **Vector Text Elements (`p`, `h1`-`h6`, `span`, `strong`, `em`, `li`, `td`, `th`)**:
  - Computed font size in points (`pt = px * 72 / 96`), font weight (bold/normal), font style (italic/normal).
  - Accurate baseline positioning (`y + baselineOffset`).
  - Font family mapping to embedded standard fonts (Helvetica, Times, Courier) and Unicode glyph rendering.
  - Text color (`pdf.setTextColor(r, g, b)`).
  - Text alignment (left, center, right, justify).
- **Vector Borders, Grids, and Rules**:
  - Table cell borders (`border-top`, `border-bottom`, `border-left`, `border-right`) rendered as crisp `pdf.rect` or `pdf.line` with exact line thickness and color.
  - Horizontal rules (`<hr>`), paragraph borders, and underlines rendered as vector lines.
- **Vector Backgrounds & Shading**:
  - Page background color, table cell shading, blockquote callout fills rendered with `pdf.setFillColor(r, g, b)` and `pdf.rect(..., 'F')`.
- **Embedded Raster Images**:
  - Standalone `<img>` tags inside the document (logos, photos, charts) are extracted and drawn with `pdf.addImage()` at their exact layout dimensions without rasterizing surrounding text or borders.
- **Headers, Footers, and Watermarks**:
  - Word-level vector header/footer positioning at exact physical margin offsets.
  - Rotated diagonal vector watermark with alpha transparency and font scaling.
- **Fallback Guard**:
  - If any complex inline SVG element or canvas is encountered, serialize only that specific element, preserving the rest of the page as pure vector.

### 2. `utils/printUtils.ts` (Refactor)
- Update `generatePdfPrint`:
  - Route PDF generation through the new vector engine.
  - Support multi-page processing, custom page ranges (`all`, `current`, `custom: 1-3, 5`), and progress callbacks (`onProgress`).
  - Calculate exact page dimensions in points from `getPhysicalDimensions(config.size, config.orientation, ...)`.
  - Save directly to `${documentTitle}.pdf` with zero raster downsampling.
- Keep `calculatePrintMargins` and page geometry utilities intact to guarantee 100% backward compatibility with existing tests and UI.

### 3. `components/ribbon/tabs/FileTab/modals/PrintModal.tsx`
- Ensure PDF download invokes the direct vector export pipeline.
- Maintain progress reporting and batch export handling for multi-document scopes.

---

## Verification Plan

### Automated Tests
1. Run existing test suite:
   ```bash
   npm run test
   ```
   Verify all 17 test files and 68+ tests pass.
2. Add comprehensive unit tests in `tests/unit/vectorPdfEngine.test.ts`:
   - Test vector text extraction and coordinate translation (CSS px to PDF pt).
   - Test table border and cell background vector commands.
   - Test exact A4 and Letter point dimensions.
   - Test multi-page custom range slicing.
   - Test Unicode text preservation (Bengali, English, symbols).
3. Verify production compilation and linting:
   ```bash
   npm run lint
   npm run build
   ```

### Manual Verification
- Open the application in AI Studio preview.
- Navigate to File -> Print / Export PDF.
- Export sample document with headings, tables, colored text, borders, headers, and footers.
- Verify generated PDF opens with crisp, selectable vector text, infinite zoom clarity, and exact page dimensions.
