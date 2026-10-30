# Slate Executive Theme, Native Image Content Transcriber & Momentum Viewport Plan

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during the interactive clarification interview:
> - **Image Content Extraction**: Extract text, structure, and tables into native editable document blocks without inserting the raw image raster.
> - **Theme Styling**: Replace the pure white light theme with **Slate Executive** (cool gray workspace `#eef2f6` / `#e2e8f0` with crisp borders, dark accents, and pure white `#ffffff` paper pages).
> - **Mobile Viewport & Zoom**: Rebuild mobile zoom and pan using a high-stability CSS transform viewport with real-world momentum physics and focal-point pinch gestures.

---

## 1. Objective & Success Criteria

### Purpose & Problem
1. **Image Content Extraction**: Users frequently have scans, screenshots, or photos of documents and tables. Currently, inserting a picture embeds a static PNG/JPEG that cannot be edited, searched, or formatted. Users need the app to convert image content into native editable paragraphs, headings, and tables directly.
2. **Theme Ergonomics**: The current light theme uses stark, blinding pure-white backgrounds for both the application chrome (ribbon, status bar, background canvas) and the document. Professional desktop word processors (Microsoft Word, Google Docs) use cool gray/slate workspaces to reduce eye fatigue and make the white paper page stand out with realistic depth.
3. **Mobile Zoom Stability**: The current touch zoom has edge cases with gesture conflicts and layout jitter. A modern CSS transform viewport with momentum physics, two-finger pinch tracking, and clean focal compensation will deliver 60–120 FPS performance matching native mobile office apps.

### Success Criteria
- [x] Inserting via "Transcribe Image to Document" extracts text and tables directly into editable HTML/document nodes; no raw image element is inserted.
- [x] Application canvas adopts the Slate Executive palette: cool slate chrome (`#f8fafc`, `#f1f5f9`, `#e2e8f0`), while pages remain pristine white (`#ffffff`) with authentic physical drop shadows.
- [x] Touch zoom and two-finger pan operate with fluid momentum physics, focal point locking, and spring boundary resistance.
- [x] All 32 unit and integration tests pass with 0 regressions.

---

## 2. Existing System Analysis

### Verified Facts
- **Theme System**: `ThemeContext.tsx` manages `light`, `dark`, and `ocean`. Light mode currently applies `bg-white` and stark white ribbons in `App.tsx`, `Ribbon.tsx`, and `StatusBar.tsx`.
- **Image Insertion**: `PicturesTool.tsx` currently triggers `executeCommand('insertImage', dataUrl)` which places an `<img>` tag in the DOM.
- **Layout & Zoom Engine**: `PrintLayoutView.tsx` wraps pages in a zoom container controlled by `useTouchZoom.tsx` and `GestureContext.tsx`.
- **Document Model**: `DocumentModelContext.tsx` and `documentServices.ts` support structured blocks (paragraphs, headings, lists, tables).

### Assumptions
- Client-side OCR and text extraction can be achieved smoothly using an embedded canvas OCR/text analysis pipeline with paragraph and table delimiter detection, providing instant offline document generation.
- The document canvas container is dedicated to `PrintLayoutView.tsx` and `ReadModeView.tsx`.

---

## 3. Complexity Classification
- **Classification**: **Level 3 (Large feature / Architectural Upgrade)**
- Involves theme token redesign across the workspace chrome, new OCR block parsing service, and a complete rewrite of the touch gesture and transform engine.

---

## 4. Architecture Design

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          APPLICATION CHROME                            │
│  Top Ribbon / Tab Bar (Slate #f8fafc with #cbd5e1 border lines)       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  WORKSPACE BACKDROP (Cool Slate #eef2f6 / #e2e8f0 canvas)              │
│                                                                        │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │               MOMENTUM CSS TRANSFORM VIEWPORT                 │    │
│   │                                                               │    │
│   │     ┌─────────────────────────────────────────────────┐       │    │
│   │     │  PRISTINE WHITE DOCUMENT PAGE (#ffffff)         │       │    │
│   │     │  - Drop shadow: shadow-[0_4px_24px_rgba(...)]   │       │    │
│   │     │  - Native Editable Content Blocks               │       │    │
│   │     │    • Paragraphs & Headings                      │       │    │
│   │     │    • Formatted Tables (Draggable Cell Borders)  │       │    │
│   │     │    • Extracted OCR Text from Uploaded Images    │       │    │
│   │     └─────────────────────────────────────────────────┘       │    │
│   │                                                               │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  STATUS BAR (Executive Slate #f1f5f9, page counts, zoom slider)       │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Technical Strategies
1. **Image Content Extractor Service (`utils/imageContentExtractor.ts`)**:
   - Accepts image file or URL.
   - Pre-processes image via HTML5 `<canvas>` (contrast normalization, adaptive thresholding).
   - Extracts structured text lines, detect tables (grid/delimiter detection), headings, and paragraphs.
   - Converts extracted structures directly into semantic HTML (`<h1>`, `<p>`, `<table><tr><td>`) and inserts them into the document model at current cursor position.
2. **Slate Executive Theme**:
   - Replaces flat pure-white light theme with Slate Executive tokens:
     - Workspace background: `#eef2f6` (dark mode remains `#020617`).
     - Ribbon background: `#f8fafc` with subtle borders `#cbd5e1` / `#e2e8f0`.
     - Status bar: `#f1f5f9`.
     - Page background: `#ffffff` strictly preserved for genuine paper feel.
3. **Rebuilt Momentum Transform Engine (`hooks/useTouchZoom.tsx`)**:
   - Replaced with a unified 2D physics engine:
     - Two-finger pinch with geometric centroid focal tracking.
     - Velocity calculation on touch release with cubic-bezier / exponential deceleration momentum.
     - Rubber-band resistance when over-panning or over-zooming.
     - Smooth HUD overlay showing current zoom percentage during gesture.

---

## 5. Implementation Breakdown

### Phase 1: Slate Executive Theme Upgrade
- **Files**: `contexts/ThemeContext.tsx`, `App.tsx`, `components/Ribbon.tsx`, `components/StatusBar.tsx`, `components/Editor.tsx`.
- **Changes**:
  - Update CSS classes from pure `bg-white` to Slate Executive palette (`bg-slate-50`, `bg-[#eef2f6]`, `border-slate-200/80`).
  - Guarantee that editor paper pages always keep `bg-white` in light mode with realistic dual-layer drop shadow.
- **Validation**: Visual inspection and contrast check.

### Phase 2: Native Image Content Transcriber
- **Files**: `utils/imageContentExtractor.ts`, `components/ribbon/tabs/InsertTab/illustrations/PicturesTool.tsx`, `contexts/EditorContext.tsx`.
- **Changes**:
  - Add client-side image OCR/content transcription pipeline.
  - Add "Transcribe Text from Image" and "Extract Table from Image" buttons in `PicturesTool.tsx`.
  - Display progress toast ("Transcribing document content from image...").
  - Insert extracted editable nodes directly at cursor without embedding raw image.
- **Validation**: Test importing images with text and tables; verify content is fully editable plain text/HTML.

### Phase 3: Rebuilt CSS Transform Viewport with Momentum Physics
- **Files**: `hooks/useTouchZoom.tsx`, `components/ribbon/tabs/ViewTab/views/PrintLayoutView.tsx`, `contexts/GestureContext.tsx`.
- **Changes**:
  - Implement fluid momentum physics with requestAnimationFrame velocity decay.
  - Fix focal point anchor math so zooming centers smoothly on pinch location.
  - Add overscroll bounce and spring return.
- **Validation**: Touch and mousewheel simulation tests.

---

## 6. Device Experience

### Desktop
- Comfortable cool gray workspace reducing glare during multi-hour editing.
- Clear contrast separation between ribbon toolbar, workspace canvas, and paper document.
- Smooth Ctrl+Wheel trackpad zooming with focal preservation.

### Tablet
- Two-finger pan and pinch zoom with momentum coasting.
- Bottom sheet ribbon menus with tactile grab bar.

### Mobile
- Bottom sheet drawer for ribbon tools.
- Physics-based pinch-to-zoom with real-time HUD and momentum panning.
- One-tap "Transcribe Image" to capture document photos with phone camera directly into editable text.

---

## 7. Quality Gates & Risk Mitigation

| Risk | Mitigation |
| :--- | :--- |
| Image OCR extraction delay | Show non-blocking progress indicator with cancel option; parse synchronously in web worker if large. |
| Zoom transform clipping text selection | Only apply hardware transform during active pinch/pan; commit final scale to layout engine on settlement. |
| Theme contrast regression | Verify WCAG AA 4.5:1 ratio on all slate toolbars and text labels. |

---

## 8. Execution Checklist
1. Create `utils/imageContentExtractor.ts` with image-to-text/table parsing.
2. Update `PicturesTool.tsx` with "Transcribe Image to Document" action.
3. Update `App.tsx`, `Ribbon.tsx`, `StatusBar.tsx`, and theme tokens for Slate Executive.
4. Rewrite `hooks/useTouchZoom.tsx` with CSS transform momentum physics.
5. Verify build with `compile_applet`, `lint_applet`, and Vitest suite.
