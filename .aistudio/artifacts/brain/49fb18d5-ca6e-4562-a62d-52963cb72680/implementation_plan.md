# Engineering Plan: High-Performance Virtualization & Touch Zoom HUD Overhaul

1-2 sentence summary: Fix the two-finger touch zoom reset and duplicate permanent zoom pill HUD by unifying gesture lifecycle timers with a 600ms auto-dismiss, while introducing binary-search `O(log N)` DOM virtualization to smoothly handle 1,000+ page documents without memory overload.

## User Review & Critical Decisions

> [!IMPORTANT]
> This plan addresses two primary technical defects and implements industrial-grade virtualization for large documents:
> 1. **Zoom Reset Bug & Permanent HUD**: Eliminates duplicate HUD mountings between `GestureContext` and `useTouchZoom`, corrects the asynchronous 200ms `setZoom` commit window race condition that caused zoom levels to snap back during multi-touch, and ensures the HUD auto-hides exactly 600ms after touch or scroll interactions end.
> 2. **Thousand-Page Virtualization**: Upgrades `PrintLayoutView` from linear scans to binary search `O(log N)` viewport slice calculations, keeping active DOM nodes bounded to ~3-5 pages with precise CSS spacer geometry, preventing browser memory pressure and frame drops.

- **Confirmed Decision 1**: Unify Zoom HUD rendering into a single centralized component inside `GestureContext` and auto-dismiss after 600ms of inactivity (touch, wheel, or scroll).
- **Confirmed Decision 2**: Atomic commit on gesture settlement—flush target zoom immediately to state and cancel in-flight transitions on any new touch event to eliminate zoom snap-backs.
- **Confirmed Decision 3**: Windowed page virtualization with binary search indexing and top/bottom spacer containers for zero memory bloat across 1,000+ page documents.

---

## 1. Objective

### Purpose
Provide a rock-solid, fluid touch zoom and navigation experience in the word processor, eliminate persistent UI artifacts (stuck zoom pills), and enable users to edit and scroll through large documents (100 to 2,000+ pages) without performance degradation or browser crashes.

### Problem
1. **Permanent Zoom Pill HUD**: The zoom HUD appears and remains permanently visible on screen due to conflicting state flags (`showHud` / `isPinching`) across `GestureContext` and `useTouchZoom`, duplicate DOM mountings, and unhandled `touchcancel` / scroll interruptions.
2. **Two-Finger Touch Zoom Reset**: During pinch-to-zoom, `useTouchZoom` relies on a 200ms deferred `setTimeout` before committing `setZoom`. If fingers touch down again within that window, or if one finger lifts before the other, `startZoom` is re-initialized with the uncommitted old zoom value, resetting the document zoom back to its previous scale.
3. **Thousand-Page Scalability & Memory Overload**: `PrintLayoutView` currently executes linear `O(N)` scans over all pages on every scroll event to determine visible pages and update the current page indicator. For 1,000+ pages, this causes main-thread frame thrashing and excessive memory consumption.

### Success Criteria
- Zoom HUD appears on pinch/zoom or scroll interaction and automatically fades out within exactly 600ms of cessation.
- Pinch-to-zoom smoothly scales content with focal-point tracking and commits the final zoom cleanly without snapping or resetting.
- 1,000-page documents maintain 60 FPS scrolling and low DOM memory usage (< 50MB DOM footprint) by rendering only ~3-5 active pages in the viewport with precise virtual geometry spacers.
- All existing 36 automated unit and integration tests continue to pass.

---

## 2. Existing System Analysis

### Architecture & Source Components
- **`hooks/useTouchZoom.tsx`**: Tracks multi-touch pinch gestures, computes centroid focal points, applies hardware-accelerated CSS transforms (`translate3d` + `scale`), and renders an independent `<div className="fixed top-20 ...">` zoom HUD.
- **`contexts/GestureContext.tsx`**: Provides global gesture state (`isPinching`, `hudZoom`, `showHud`) and renders its own duplicate `<div className="fixed top-16 ...">` zoom HUD.
- **`components/ribbon/tabs/ViewTab/views/PrintLayoutView.tsx`**:
  - Contains `{zoomHUD}` from `useTouchZoom` on line 641 while `App.tsx` simultaneously wraps the tree with `GestureProvider` which mounts its own HUD.
  - Implements `Dynamic Zoom Logic` `useEffect` that triggers `fit-page` / `fit-width` recalibrations.
  - Computes `pageTops` and visible window via `O(N)` iteration loops on line 526 and scroll handler line 586.
- **`components/EditorPage/EditorPage.tsx`**: The heavy page component containing MathLive bindings, table resizers, overlays, context menus, and ProseMirror/Tiptap elements. Rendering more than 10-15 instances simultaneously degrades browser memory.

---

## 3. Architecture Design

### System Layout & Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                      App.tsx                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │                GestureProvider                   │  │
│  │  - Single authoritative Zoom HUD (auto-hide 600ms)│  │
│  │  - Global gesture state (isPinching, hudZoom)     │  │
│  └────────────────────────┬─────────────────────────┘  │
│                           │                            │
│  ┌────────────────────────▼─────────────────────────┐  │
│  │                   Editor.tsx                     │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │             PrintLayoutView                │  │  │
│  │  │  - useTouchZoom (focal math & pinch events)│  │  │
│  │  │  - O(log N) Binary Search Virtualizer      │  │  │
│  │  │  - Top Geometry Spacer (height: Pt)        │  │  │
│  │  │  - Active Viewport Window (pages 48..52)   │  │  │
│  │  │  - Bottom Geometry Spacer (height: Pb)     │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Key Technical Strategies

#### 1. Unified Zoom HUD & 600ms Auto-Hide Timer
- Eliminate duplicate HUD markup in `useTouchZoom.tsx` and `PrintLayoutView.tsx`.
- Centralize the floating Zoom Pill in `GestureContext.tsx` as a sleek, non-intrusive top-center indicator with smooth CSS transitions (`opacity`, `transform scale(0.95)`).
- Provide a unified `triggerHud(zoomLevel)` method that resets a 600ms debounced dismiss timer on any touch zoom, trackpad wheel zoom, or scroll event.

#### 2. Atomic Touch Gesture Settlement & State Synchronization
- In `useTouchZoom.tsx`:
  - When `touchstart` fires with 2 touches, immediately cancel any pending transition timer and clear pending momentum.
  - On `touchend` / `touchcancel`, commit `setZoom(targetZoom)` synchronously (or in the next animation frame) while synchronizing `zoomRef.current = targetZoom`.
  - Maintain a state machine (`idle` -> `pinching` -> `settling` -> `idle`) to avoid race conditions when lifting one finger before the other.
  - Cleanly reset CSS transforms on `content` so unscaled DOM matches the newly committed zoom scale without a visual flicker or coordinate jump.

#### 3. Binary Search `O(log N)` DOM Virtualization for 1,000+ Pages
- Store page heights in a precomputed cumulative prefix array: `prefixTops[i] = prefixTops[i-1] + pageHeight[i-1] + gap`.
- Implement `findFirstVisiblePageIndex(scrollTop)` via binary search `O(log N)`:
  ```typescript
  function findPageIndex(tops: number[], targetY: number): number {
    let low = 0, high = tops.length - 1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (tops[mid] <= targetY) low = mid + 1;
      else high = mid - 1;
    }
    return Math.max(0, high);
  }
  ```
- Windowing: Render only `[startPage, endPage]` where `startPage = max(0, firstVis - 2)` and `endPage = min(N - 1, lastVis + 2)`.
- Use a single top spacer `<div>` and single bottom spacer `<div>` whose heights equal `prefixTops[startPage]` and `totalVirtualHeight - prefixTops[endPage + 1]`.
- Always keep the currently focused `currentPage` mounted to guarantee cursor stability and keyboard navigation across page boundaries.

---

## 4. Implementation Breakdown

### Phase 1: Touch Zoom & Permanent HUD Fix
- **Files**: `hooks/useTouchZoom.tsx`, `contexts/GestureContext.tsx`, `components/ribbon/tabs/ViewTab/views/PrintLayoutView.tsx`
- Remove duplicate HUD rendering from `useTouchZoom.tsx` and `PrintLayoutView.tsx`.
- Implement robust multi-touch state machine with 600ms auto-dismiss timer on `triggerHUD`.
- Fix the touch-end race condition by committing zoom immediately and cancelling pending timers on new touches.

### Phase 2: O(log N) Virtualization & Memory Optimization
- **Files**: `components/ribbon/tabs/ViewTab/views/PrintLayoutView.tsx`
- Implement binary search helpers for visible page range detection and scroll tracking.
- Replace `O(N)` linear loops in scroll handlers with binary search lookups.
- Ensure only 3-5 pages are mounted in the DOM at any given moment, with exact geometry spacers preserving the full scrollbar height.

### Phase 3: Verification & Integration Testing
- Run vitest test suite (`npm test`) across all unit and integration test files.
- Verify compilation with `compile_applet`.
- Verify absence of console warnings or gesture leaks.

---

## 5. Desktop, Tablet & Mobile Experience
- **Desktop**: Trackpad pinch-to-zoom (`Ctrl + Wheel`) smoothly adjusts zoom with instant HUD feedback that cleanly fades after 600ms. 1,000-page scrolling is butter-smooth at 60 FPS.
- **Tablet**: Two-finger pinch feels native with focal-point centroid locking. No jitter or zoom reset when lifting fingers.
- **Mobile**: Touch zoom works seamlessly within viewport bounds. Mobile selection toolbar remains responsive and hidden during active gestures.

---

## 6. Execution Checklist

- [ ] Inspect and remove duplicate `zoomHUD` rendering in `PrintLayoutView.tsx` and `useTouchZoom.tsx`.
- [ ] Refactor `GestureContext.tsx` to handle 600ms auto-dismissal cleanly without stuck state flags.
- [ ] Fix touch lifecycle in `useTouchZoom.tsx`: atomic settlement, canceling pending timers, preventing zoom snap-back.
- [ ] Replace `O(N)` search in `PrintLayoutView.tsx` with binary search `O(log N)` for visible page ranges and scroll indicators.
- [ ] Validate DOM memory footprint with 1,000+ page test fixtures.
- [ ] Run full test suite and compile applet to verify zero regressions.

---

## Quality Gates & Approval Gate
Implementation will begin immediately upon your approval.
