# High-Performance Hybrid Virtualization for Thousand-Page Documents

Scalable, 60fps document virtualization integrating **TanStack Virtual (`@tanstack/react-virtual`)** with an intelligent hybrid rendering pipeline. Combines full-fidelity TipTap interactive editor pages in the active viewport with lightweight, paper-accurate ghost skeleton pages during rapid scrolling and offscreen buffering, supporting both continuous vertical stream and multi-column side-by-side layouts.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural decisions below have been aligned with your selections:

- **Confirmed Decision 1 (Virtualization Engine)**: Integrate `@tanstack/react-virtual` alongside our specialized physical page geometry prefix-sum calculator for optimal headless scroll measurement, sub-pixel accuracy, dynamic overscan, and zero bundle bloat.
- **Confirmed Decision 2 (Ghost Page Aesthetics)**: Implement hybrid ghost pages featuring physical paper shadows, header and footer boundary lines, typography skeleton rows, and a non-intrusive page badge with shimmering state indicators.
- **Confirmed Decision 3 (Multi-Layout Support)**: Provide seamless support for both continuous single-page vertical stream and multi-column side-by-side view (when zoomed out or in Multiple Pages view mode).

---

## 1. Overview & Core Concept

### What It Does
When handling large manuscripts, legal briefs, academic dissertations, or multi-chapter books containing hundreds to thousands of pages, standard browser DOMs degrade into severe stuttering and out-of-memory crashes due to thousands of active contenteditable instances. 

This hybrid virtualization architecture introduces a two-tier page lifecycle:
1. **Active Core Window (Viewport ± 1 page)**: Full-featured, interactive `EditorPage` with TipTap editor, live cursor positioning, table resizing handles, context menus, and selection tools.
2. **Buffer Horizon (Viewport ± 2 to 4 pages)**: High-speed, lightweight `GhostPage` instances featuring exact physical dimensions, margins, header/footer text guides, and structural skeleton lines that render in `<0.5ms` per page.
3. **Virtual Far Space (Remaining Pages)**: Absolute CSS transform spacers maintained by `@tanstack/react-virtual` requiring $0$ DOM elements, guaranteeing $O(1)$ memory consumption and effortless 60fps scrolling even on a 5,000-page document.

### Target Audience & Persona
- Authors, technical writers, researchers, and legal professionals working with 50-to-1,000+ page documents who require instant navigation, smooth pinch-to-zoom, and reliable editing without UI lag.

### Key Value
- **Zero DOM Bloat**: Caps active DOM nodes to under 15 pages regardless of document size.
- **Instantaneous Jump & Scrubbing**: Scrollbar scrubbing across 1,000 pages stays at a steady 60fps.
- **Seamless Typing Continuity**: Active cursor tracking prevents editor unmounting while actively editing a page.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Rapid Document Scrubbing & Scrolling**:
   - The user grabs the scrollbar or swipes rapidly on touch devices.
   - Offscreen pages reveal crisp, paper-accurate ghost pages with subtle skeleton lines, showing the exact page number (e.g. `Page 245 of 1,200`) without blank white flashes.
   - As scroll velocity settles, the active page seamlessly transitions into the live editable document.

2. **Multi-Page Side-by-Side Zooming**:
   - When the user zooms out (e.g., to 50% or 75%) or toggles "Multiple Pages" in the View tab, the viewport dynamically organizes pages into 2, 3, or 4 columns.
   - The virtualizer calculates virtual row clusters, rendering multiple ghost and active pages side by side with consistent gutter spacing.

3. **Active Cursor & Focused Page Locking**:
   - Typing or focusing on Page 14 ensures that Page 14 remains firmly pinned within the active editor window, preventing unexpected remounts or cursor loss during incremental re-paginations.

### Visual Identity & Theme
- **Physical Paper Sheet**: Exact millimeter/inch dimensions matching ISO A4/Letter formats with subtle drop shadows (`shadow-sm` in light mode, dark border-ring in dark mode).
- **Ghost Page Skeletons**: Clean, unboxed text guides with delicate muted skeleton bars (`bg-slate-200/80` / `dark:bg-slate-800`), matching exact margin boundaries and vertical alignment settings.
- **Status Indicator**: Smooth, unobtrusive page tracker in the bottom-right corner and status bar reflecting accurate physical page position during high-speed scrubbing.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Headless `@tanstack/react-virtual` vs. Full Replacement
- **Chosen Approach**: Use `@tanstack/react-virtual` as the core headless scroll calculation engine while pairing it with our existing domain-specific prefix-sum physical geometry cache and `GhostPage` component.
- **Why**: `@tanstack/react-virtual` provides battle-tested scroll event smoothing, velocity tracking, dynamic item measurement, and clean virtualization primitives without locking us into rigid UI components.
- **Alternatives Considered**: 
  - *`react-window`*: Lacks flexible dynamic measurement for multi-column responsive page layouts.
  - *Pure custom wheel tracker*: Prone to edge-case jitter on different operating systems and mobile touch pinch-zoom.

### Decision 2: Multi-Column Virtual Row Aggregation
- **Chosen Approach**: Dynamically calculate the number of columns based on `availableWidth / (pageWidth * scale)`. The virtualizer manages virtual rows where each row contains 1 to $N$ pages.
- **Why**: Allows seamless switching between standard single-page vertical document flow and Word-style multi-page side-by-side view without separate virtualizer instances.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          PrintLayoutView Container                     │
│                                                                        │
│  ┌───────────────────────┐         ┌────────────────────────────────┐  │
│  │ Geometry Prefix-Sums  │         │   @tanstack/react-virtual      │  │
│  │ (Widths, Heights,     │────────▶│   useVirtualizer hook          │  │
│  │  Tops, Multi-Columns) │         │   (Row indices & Offsets)      │  │
│  └───────────────────────┘         └────────────────┬───────────────┘  │
│                                                     │                  │
│                                                     ▼                  │
│                      ┌──────────────────────────────────────────────┐  │
│                      │         Hybrid Windowing Dispatcher          │  │
│                      └──────────────────────┬───────────────────────┘  │
│                                             │                          │
│                ┌────────────────────────────┴───────────────────────────┐
│                ▼                                                        ▼
│   ┌─────────────────────────┐                            ┌─────────────────────────┐
│   │   Active Viewport Zone  │                            │   Ghost Horizon Zone    │
│   │   (Current ± 1 Page)    │                            │   (Buffer ± 2-4 Pages)  │
│   ├─────────────────────────┤                            ├─────────────────────────┤
│   │  <EditorPage />         │                            │  <GhostPage />          │
│   │  • TipTap Prosemirror   │                            │  • Lightweight SVG/DOM  │
│   │  • Interactive Tables   │                            │  • Exact Paper Geometry │
│   │  • Selection Overlays   │                            │  • Skeleton Text Lines  │
│   │  • Live Cursor Tracking │                            │  • Page Badge & Guides  │
│   └─────────────────────────┘                            └─────────────────────────┘
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping

1. **`@tanstack/react-virtual` Package**:
   - Install `@tanstack/react-virtual` via `install_applet_package`.
2. **`PrintLayoutView.tsx`**:
   - Refactor scroll container to leverage `useVirtualizer`.
   - Implement `columnCount` calculation based on `availableWidth`, `pageGeometries`, and `pageMovement` setting ('vertical' vs 'sideToSide').
   - Render virtual row items containing either `<EditorPage>` (for active/near-viewport pages) or `<GhostPage>` (for buffer horizon pages).
3. **`GhostPage.tsx`**:
   - Enhance with exact header and footer distance guides from `pageConfig` (`differentFirstPage`, `differentOddEven`, page numbers, custom margins).
   - Ensure zero pointer-events and zero reflow overhead.
4. **Performance Verification**:
   - Validate that rendering a 1,000-page document maintains steady 60fps scrolling and keeps memory usage strictly bounded.
