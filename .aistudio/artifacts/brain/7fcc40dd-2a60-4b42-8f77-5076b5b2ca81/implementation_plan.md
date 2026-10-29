# MS Word Exam Content Architecture & Anti-Shaving Pagination Engine

## Title & Summary
Engineering specification to comprehensively rewrite the document question paper and technical answer sheets into standard Microsoft Word examination paper format, eliminate cross-set duplicates while preserving the complete set structure (Sets 01–11), and resolve content shaving/clipping at page boundaries through dynamic line spacing, zero-clip table splitting, and layout pagination safeguards.

---

## User Review & Clarifications Confirmed
> [!IMPORTANT]
> The following requirements were confirmed via interactive clarification:
> 1. **Styling & Structure**: Standard MS Word exam paper format with clean, natively editable tables compatible with all in-app ribbon and table tools.
> 2. **Deduplication Strategy**: Preserve the complete exam set structure (Sets 01–11) while systematically eliminating redundant and repeated questions across sets.
> 3. **Anti-Shaving Mechanism**: Dynamic line-height adjustment and non-clipping table row splitting with clean overflow migration to subsequent pages.

---

## Complexity Classification
**Classification: Level 3 (Large Feature & Architecture Hardening)**
- Involves restructuring large-scale document HTML into native TipTap/MS Word semantic blocks.
- Involves core pagination and table splitting algorithm improvements in `/utils/layout/` to guarantee zero visual shaving across all zoom levels and paper formats.

---

## 1. Verified Facts vs. Assumptions vs. Missing Information

### Verified Facts (Confirmed from Codebase Evidence)
1. **Document Content Structure**: `utils/examDocumentContent.ts` defines `FULL_EXAM_DOCUMENT_HTML`, imported by `constants.ts` as `DEFAULT_CONTENT`. It currently contains ~2,559 lines spanning Sets 01 through 10 with repeated questions across multiple sets (e.g. microprocessor definitions, power supply fan bearing, computer buses, operating system questions).
2. **Hardcoded Inline Styles**: The existing document uses rigid inline pixel styles (`margin-left: 12px; margin-bottom: 6px; padding: 2px 4px`) and non-standard pseudo-break tokens that conflict with the app's native Table Tools (Table Properties, Sort, AutoFit, Cell Padding).
3. **Table Splitting Clipping Flaw**: In `/utils/layout/strategies/TableSplitStrategy.ts` (lines 69–77):
   ```ts
   if (newTotalHeight > effectiveLimit) {
     if (i === 0) {
       isFirstRowOversized = true;
       splitIndex = 1;
       break;
     }
     splitIndex = i;
     break;
   }
   ```
   When row 0 does not fit within `effectiveLimit` on the current page, it forces `splitIndex = 1`, placing row 0 into `keepTable` on a page that cannot fit it.
4. **Editor Overflow Clipping**: In `/components/EditorPage/EditorPage.tsx`, line 1617 specifies `prodoc-page-sheet overflow-clip` and line 1684 specifies `overflow-clip`. When an oversized block is placed on the current page, its bottom half is physically shaved off by `overflow-clip`.
5. **Whitespace Mismatch in Layout Sandbox**: In `/utils/layout/LayoutSandboxImpl.ts`, line 22 sets `this.el.style.whiteSpace = 'pre-wrap'`, whereas `EditorPage.tsx` uses standard wrapping (`normal`), leading to measurement drift between sandbox measurements and DOM rendering.
6. **In-App Table Tools Availability**: The application features `/components/EditorPage/TablePropertiesModal.tsx`, `TableContextMenu.tsx`, `TableResizerOverlay.tsx`, and `SortModal.tsx`. These tools rely on standard semantic HTML tables (`<table><thead><tbody><tr><td>/<th>`).

### Assumptions
1. Retaining all 11 exam sets with unified question numbering (MCQs 1–10 and technical/short questions per set) while replacing duplicated questions with distinct technical questions from the question bank.
2. The default paper size remains Letter / A4 with standard 1.0" or 0.75" margins.

### Missing Information
- None. Full access to layout engine, editor components, and document content models.

---

## 2. Objective & Scope

### Purpose
To provide students and educators with a beautifully structured, production-grade examination document that strictly follows Microsoft Word document formatting conventions, leverages native ProDoc editor tools for on-page editing, and eliminates all visual shaving and text truncation at page breaks.

### Success Criteria
- **Zero Content Shaving**: No text line, table row, or equation is partially clipped or shaved at the bottom or top of any page.
- **Full In-App Tool Compatibility**: Every question and table can be directly edited, resized, styled, recolored, sorted, and configured via the app's Ribbon, MiniToolbar, and Table Context Menus.
- **Clean MS Word Formatting**: Consistent typographic hierarchy (11pt Calibri/Inter body, 14pt bold Section Headers, 12pt Subheadings, clean 2x2 option tables with proper padding).
- **Deduplicated Content**: Zero repeated questions across Sets 01 through 11; each question is distinct and technically accurate.
- **Accurate Pagination**: Seamless page breaking that honors widow/orphan control, question-with-options grouping, and table headers.

### Non-Goals
- Changing the underlying rich text editor library (maintains TipTap/ProseMirror).
- Removing the user's ability to switch to Web Layout or Read Layout modes.

---

## 3. Existing System Analysis

### Architecture & Component Analysis
- `utils/examDocumentContent.ts`: Exports `FULL_EXAM_DOCUMENT_HTML`.
- `components/EditorPage/EditorPage.tsx`: The primary page renderer. Contains header, footer, watermark, margin gutters, and the contentEditable container.
- `utils/layout/PaginationLoop.ts`: Orchestrates block iteration, keep-with-next checks, and calls `PaginationDecisionService`.
- `utils/layout/strategies/TableSplitStrategy.ts`: Splits tables across page boundaries.
- `utils/layout/strategies/ParagraphSplitStrategy.ts`: Performs binary search word splitting on overflowing paragraphs.
- `utils/layout/LayoutSandboxImpl.ts`: Offscreen measurement DOM sandbox.

### Technical Debt Identified
1. **Oversized Row 0 Forcing**: When a table row exceeds the remaining page space, `TableSplitStrategy` forces it onto the current page instead of pushing the entire table to a fresh page.
2. **Measurement Sandbox Whitespace Discrepancy**: `pre-wrap` in sandbox vs `normal` in editor canvas causes text height calculation discrepancies.
3. **Rigid Inline Style Clutter**: Inline HTML attributes prevent CSS theme inheritance and ribbon style overrides.

---

## 4. Architecture Design & Technical Strategy

### 1. Document Rewrite & Deduplication Architecture (`utils/examDocumentContent.ts`)
- **Semantic Structure**:
  - Sets 01 through 11 structured with standard Heading 2 (`<h2>Set# 01 - Computer Architecture & Hardware</h2>`).
  - Clear exam header block with Student Name, Roll No, Date, Time, and Marks.
  - MCQs formatted with clean, accessible tables:
    ```html
    <table class="exam-mcq-table" style="width: 100%; border: 1px solid #e2e8f0; margin-bottom: 8px;">
      <tbody>
        <tr>
          <td style="width: 50%; padding: 6px 10px; border: 1px solid #e2e8f0;">A. Option Text</td>
          <td style="width: 50%; padding: 6px 10px; border: 1px solid #e2e8f0;">B. Option Text</td>
        </tr>
        <tr>
          <td style="width: 50%; padding: 6px 10px; border: 1px solid #e2e8f0; font-weight: 600;">✓ C. Correct Option</td>
          <td style="width: 50%; padding: 6px 10px; border: 1px solid #e2e8f0;">D. Option Text</td>
        </tr>
      </tbody>
    </table>
    ```
  - Technical Answer Sheets and Short Questions styled with clean definition lists and callout boxes.
- **Cross-Set Deduplication Matrix**:
  - Audit all questions across Sets 01–11.
  - Retain unique canonical versions; replace duplicate instances with fresh, domain-relevant syllabus questions (e.g. Computer Networks, Microprocessors, Cloud Concepts, Peripheral Interfacing, Troubleshooting, Memory Hierarchies).

### 2. Anti-Shaving Pagination Engine Safeguards
- **Fix Table Split Strategy (`utils/layout/strategies/TableSplitStrategy.ts`)**:
  - When `i === 0` and row 0 exceeds `effectiveLimit`:
    - If `context.remainingSpace < context.layoutContext.pageFrame.bodyHeight * 0.9` (i.e. not an empty page), return `SplitStatus.CannotSplit` with `keep: null, move: node`. This cleanly defers the entire table to the next page where it has 100% height.
    - If already at the top of a fresh page, allow row 0 to fit by dynamically adjusting line spacing or row padding rather than clipping.
- **Align Layout Sandbox Styling (`utils/layout/LayoutSandboxImpl.ts`)**:
  - Change `this.el.style.whiteSpace` to match the editor's computed white-space behavior.
  - Include matching font metrics (`11pt`, `lineHeight: 1.35`, `Calibri, Inter, sans-serif`).
- **Dynamic Line Spacing & Safety Buffer (`utils/layout/PaginationLoop.ts`)**:
  - Implement a safety buffer lookahead: when a block would overflow by less than 12px, dynamically adjust paragraph spacing or cleanly push the block to the next page.
  - Enforce `keep-with-next` so questions are never separated from their corresponding option tables.

---

## 5. Implementation Phases & Breakdown

### Phase 1: Pagination Engine Anti-Shaving Fixes
- **Files Affected**:
  - `/utils/layout/strategies/TableSplitStrategy.ts`
  - `/utils/layout/LayoutSandboxImpl.ts`
  - `/utils/layout/PaginationLoop.ts`
- **Actions**:
  1. Update `TableSplitStrategy` to reject splitting when row 0 does not fit on a partially filled page, routing it to `MoveNextPage`.
  2. Correct sandbox whitespace and font-rendering properties to ensure exact height parity.
  3. Enhance `PaginationLoop` safety buffer and keep-with-next logic.
- **Validation**:
  - Run pagination tests; verify tables and paragraphs cleanly move to the next page without text shaving.

### Phase 2: Document Content Rewrite & Deduplication
- **Files Affected**:
  - `/utils/examDocumentContent.ts`
- **Actions**:
  1. Re-author Sets 01 through 11 in clean, standard MS Word format.
  2. Deduplicate all questions across sets, inserting verified unique questions for any duplicates.
  3. Apply clean table markup compatible with ProDoc's Table Properties, Sort, and Resizing tools.
- **Validation**:
  - Verify document loads in Editor; test table right-click context menu, table resize handles, and font changes.

### Phase 3: Visual & Interactive Polish Across Themes & Layouts
- **Files Affected**:
  - `/components/EditorPage/EditorPage.tsx`
  - `/index.css`
- **Actions**:
  1. Verify dark mode, ocean mode, and light mode contrast for rewritten exam tables.
  2. Ensure smooth zooming (50% to 200%) maintains anti-shaving integrity.
- **Validation**:
  - Test print preview and PDF export to confirm exact parity.

---

## 6. Device Experience

### Desktop Experience
- Spacious document canvas with subtle page shadows and margin guidelines.
- Fluid table column resizing, context menus on right-click, and full ribbon tool access.

### Tablet Experience
- Responsive touch interactions for table cell selection.
- Clear page divider indicators and smooth vertical paging.

### Mobile Experience
- Optimized touch targets for table selection.
- Long-press context menu for table manipulation on mobile screens.

---

## 7. Quality Gates & Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
| :--- | :---: | :---: | :--- |
| Table split infinite loop | Low | High | Enforce max iterations guard in `PaginationLoop.ts`. |
| Font metric drift between OS platforms | Low | Med | Explicit CSS fallbacks (`Calibri, Inter, -apple-system, sans-serif`). |
| Formatting mark interference | Low | Low | Formatting mark spans styled with zero layout width. |

### Quality Gates
1. **Compilation**: App passes `compile_applet` with zero TypeScript errors.
2. **Linting**: App passes `lint_applet` cleanly.
3. **No Visual Shaving**: Visual inspection across all pages confirms zero truncated lines or cut table borders.

---

## 8. Execution Checklist
1. [ ] Fix row-0 overflow handling in `TableSplitStrategy.ts` to prevent premature current-page clipping.
2. [ ] Align `LayoutSandboxImpl.ts` whitespace and styling with `EditorPage.tsx`.
3. [ ] Rewrite `utils/examDocumentContent.ts` with standard MS Word formatting and cross-set deduplication across Sets 01–11.
4. [ ] Verify table tools (properties, resizing, context menu, sort) function seamlessly on all rewritten tables.
5. [ ] Verify compilation and test suites pass without regression.

---

## Approval Gate
In accordance with the Master Engineering Planning & Implementation Protocol (Evidence-First), all implementation is halted at this gate pending your explicit approval.
Please reply with **Proceed**, **Approved**, or **Implement** to initiate Phase 1.
