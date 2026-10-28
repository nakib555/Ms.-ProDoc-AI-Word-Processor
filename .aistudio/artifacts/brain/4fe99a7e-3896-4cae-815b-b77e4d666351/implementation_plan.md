# Master Engineering Plan: Gesture-Driven Bottom Sheet Redesign, Active Item Styling & MS Word Table Resizing

## 1. Complexity Classification
**Classification: Level 3 (Large Multi-Component Architecture & Feature Enhancement)**
This plan covers four cohesive engineering domains:
1. Touch-gesture integration in `MenuPortal` connecting to `GestureProvider` with velocity and physics-based drag-down dismissal.
2. Complete visual redesign of the mobile bottom sheet (frosted glass surface, context header with title & close button, rounded-t-[28px], and safe-area padding).
3. Universal "beautiful active state" styling across all sheet options (subtle glowing ring, tinted accent badge, and checkmark indicator).
4. MS Word-parity individual cell, column, and row resizing functionality (interactive row height & column width stepper controls in Table Layout, individual cell width/height overrides, and live table canvas interaction).

---

## 2. Verified Facts, Assumptions & Missing Information

### Verified Facts
1. **Existing Gesture Context**: `contexts/GestureContext.tsx` exists and defines `GestureState`, `GestureContextType`, and `useGestureContext()`. In `App.tsx`, it currently wraps only `<Editor />`, so lifting it to wrap the primary application layout will provide universal gesture access to `MenuPortal`.
2. **Gesture Library**: `@use-gesture/react` (`^10.3.1`) and `motion` (`^12.42.1`) are already present in `package.json`.
3. **Dropdown Portal**: `components/ribbon/common/MenuPortal.tsx` centralizes all dropdowns (Margins, Sizes, Orientation, Columns, Fonts, Colors, Breaks, Themes, Table Layout, etc.).
4. **Table Architecture**:
   - `contexts/EditorContext.tsx` configures `CustomTable`, `CustomTableRow`, `CustomTableHeader`, and `CustomTableCell` with extensible `style`, `width`, and `height` attributes.
   - `components/ribbon/tabs/InsertTab/tables/tablelayout_subTab/tablelayout.tsx` contains the "Cell Size" ribbon section with AutoFit and Distribute Rows/Cols, but currently lacks direct numerical stepper inputs for Row Height and Column Width, and lacks cell-level width/height overrides.
5. **Existing Verification State**: The app compiles cleanly with 0 build errors and passes all 21 Vitest tests.

### Assumptions
1. Mobile bottom sheet dismissal threshold: Drag distance > 70px or downward flick velocity > 0.5 px/ms.
2. Active option design: Elevated card with vibrant indigo/cyan brand accents, subtle border ring, and right-aligned checkmark badge.
3. MS Word table resizing: Users can adjust row height and column width in inches/cm/px via the Table Layout ribbon with live updates to the selected table row/col, and choose whether to apply width to the whole column or the individual selected cell.

### Missing Information
- None. All requirements are verified from existing source files.

### Clarification Questions
- None.

---

## 3. Objective

- **Purpose**: Deliver an ultra-fluid, physics-driven mobile bottom sheet experience with gorgeous active option cues, alongside true MS Word-grade individual cell, column, and row dimension resizing.
- **Problem**:
  1. The mobile bottom sheet currently lacks a context header (title and close action), and touch dismissal relies on a basic offset check without velocity physics or `GestureProvider` integration.
  2. Options inside dropdowns do not have a unified, visually distinctive active/selected indicator.
  3. Table editing lacks granular row height and column width controls for precision formatting like in Microsoft Word.
- **Expected Results**:
  1. Swiping down on the mobile bottom sheet with momentum or dragging past the threshold smoothly dismisses it with natural spring physics.
  2. Selected/active options in all dropdowns and bottom sheets stand out with elegant tinted backgrounds, rings, and check indicators.
  3. The bottom sheet features a tactile frosted header, grab handle, category/title label, and quick close button.
  4. The Table Layout ribbon provides real-time "Cell Height" and "Cell Width" stepper inputs (with ▲/▼ buttons and direct value entry) plus individual cell vs whole column/row scope.
- **Success Criteria**:
  - Dragging down bottom sheet dismisses cleanly; snapping back if released before threshold.
  - Active items have high contrast (WCAG AA) and clear selection cues.
  - Table cells, rows, and columns resize smoothly in the editor canvas.
  - Zero TypeScript/ESLint errors, 100% Vitest pass rate.

---

## 4. Architecture Design

### A. Universal GestureProvider & Physics-Based Sheet Dragging
1. In `App.tsx`, move `<GestureProvider>` to wrap `<AppContent />` so both the Editor and all Ribbon Portals share the gesture bus.
2. In `GestureContext.tsx`, add sheet gesture state and handlers (`sheetDragY`, `isDraggingSheet`, `sheetVelocity`).
3. In `MenuPortal.tsx`, implement smooth physics:
   - Rubber-banding when dragged upward (resistance factor `0.3`).
   - Velocity tracking: if released with downward velocity > 0.5 or distance > 75px, triggers smooth exit slide-down.
   - Spring return if released without meeting exit threshold.

### B. Redesigned Mobile Bottom Sheet Surface
```
┌────────────────────────────────────────────────────────┐
│                      [────]  (Tactile Grab Pill)       │
│  [Icon] Margins Preset                      [ ✕ Close ]│ (Header: 44px)
├────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │ ✓ Normal (1" all sides)          [Active Badge]  │  │ (Selected)
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Narrow (0.5" all sides)                        │  │ (Unselected)
│  └──────────────────────────────────────────────────┘  │
│  ... Scrollable options ...                            │
└────────────────────────────────────────────────────────┘
```
- Top Header: Context Title (derived from menu `id` or passed `title` prop), category icon, and quick circular `X` close button.
- Glassmorphism: `bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-t-[28px] border-t border-slate-200/80 dark:border-slate-800/80 shadow-[0_-12px_40px_rgba(0,0,0,0.25)]`.

### C. Beautiful Active Option Presentation
Standardize the active option markup:
- Selected state: `bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/30 border border-indigo-200 dark:border-indigo-800 font-semibold shadow-xs`.
- Right-aligned indicator: `<Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />`.
- Unselected state: `hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium`.

### D. MS Word-Grade Individual Cell, Row & Column Resizing
1. **Interactive Controls in `tablelayout.tsx` ("Cell Size" Group)**:
   - **Row Height**: Numeric stepper (e.g., `0.30 in` / `28 px`) with `▲` and `▼` increment/decrement buttons (step: `2px` or `0.05in`).
   - **Column Width**: Numeric stepper (e.g., `1.50 in` / `120 px`) with `▲` and `▼` increment/decrement buttons.
   - **Resize Scope Toggle**:
     - `Column`: Applies width to all cells in the selected column.
     - `Cell`: Applies width to the selected individual cell only (MS Word individual cell layout).
     - `Row`: Applies height to the entire table row.
2. **ProseMirror / DOM Synchronization**:
   - `updateTableCellSize(scope, dimension, value)` updates the DOM attributes `style.width` or `style.height` and triggers TipTap transaction.
   - Live synchronization: Reads the current computed width and height of the active cell on cursor movement so the ribbon steppers reflect the active cell's exact dimensions.

---

## 5. Implementation Breakdown

### Phase 1: Universal GestureProvider & MenuPortal Physics
- **Files Affected**:
  - `/App.tsx` (lift `<GestureProvider>` to root level)
  - `/contexts/GestureContext.tsx` (add bottom sheet gesture helpers)
  - `/components/ribbon/common/MenuPortal.tsx` (integrate physics drag gesture and velocity release)
- **Validation**: Touch drag down on mobile sheet with spring return and momentum dismissal.

### Phase 2: Redesigned Mobile Bottom Sheet & Active Options
- **Files Affected**:
  - `/components/ribbon/common/MenuPortal.tsx` (add header bar with title, grab pill, close button)
  - `/components/ribbon/tabs/LayoutTab/page_setup/Margins/MarginsTool.tsx` (update active option styling with checkmark)
  - `/components/ribbon/tabs/LayoutTab/page_setup/OrientationTool.tsx` (update active option styling)
  - `/components/ribbon/tabs/LayoutTab/page_setup/size/SizeTool.tsx` (update active option styling)
  - `/components/ribbon/tabs/LayoutTab/page_setup/ColumnsTool.tsx` (update active option styling)
- **Validation**: Visually verify clean frosted header, grab pill, and checkmark active badges on mobile.

### Phase 3: MS Word Cell, Row & Column Resizing
- **Files Affected**:
  - `/components/ribbon/tabs/InsertTab/tables/tablelayout_subTab/tablelayout.tsx` (add Row Height & Column Width stepper widgets + scope selector in "Cell Size")
  - `/contexts/EditorContext.tsx` (ensure `CustomTableCell` and `CustomTableRow` support direct style mutations and dispatch input events)
- **Validation**: Place cursor in table cell, verify stepper reflects cell dimensions; click ▲/▼ or type value; verify live table resizing in editor canvas.

### Phase 4: Verification Suite
- **Run**: `compile_applet`, `npm run test` (all tests pass), `restart_dev_server`.

---

## 6. Execution Checklist

- [ ] 1. Lift `<GestureProvider>` in `App.tsx` to wrap the primary application tree.
- [ ] 2. Update `contexts/GestureContext.tsx` with sheet drag tracking utilities.
- [ ] 3. Enhance `MenuPortal.tsx` with velocity-based drag physics, rubber-banding, and natural threshold dismissal.
- [ ] 4. Redesign mobile bottom sheet in `MenuPortal.tsx` with frosted header, context title, grab handle, and circular close button.
- [ ] 5. Standardize beautiful active option cues with checkmark badges across dropdown presets (Margins, Orientation, Size, Columns).
- [ ] 6. Add MS Word-style Row Height & Column Width numerical steppers with ▲/▼ controls and Cell vs Column scope toggle in `tablelayout.tsx`.
- [ ] 7. Implement live cell dimension detection and mutation helpers in `tablelayout.tsx`.
- [ ] 8. Run `compile_applet` and verify 0 errors.
- [ ] 9. Run `npm run test` to verify 100% test pass rate.
- [ ] 10. Restart development server.

---

## 7. Approval Gate

Per Master Engineering Planning & Implementation Protocol:
**STATUS: STOPPED. AWAITING EXPLICIT USER APPROVAL BEFORE CODE EXECUTION.**
