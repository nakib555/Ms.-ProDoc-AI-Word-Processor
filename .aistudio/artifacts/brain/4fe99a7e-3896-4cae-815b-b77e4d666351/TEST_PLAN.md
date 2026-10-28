# Master Test Plan: ProDoc Quality Engineering

## 1. Scope & Objectives
This test plan defines the testing strategy, test levels, tools, and pass/fail thresholds for verifying the ProDoc web word processor.

---

## 2. Testing Levels & Matrix

### Level A: Unit & Engine Tests
- **Objective**: Verify individual core engine functions, diff/patch algorithms, and isolated UI components.
- **Coverage**:
  - `tests/unit/documentModel.test.ts`: Node structure validation, rule engine (`HeadingLevelRule`, `TableIntegrityRule`, `AccessibilityAltTextRule`), v1 ↔ v2 bidirectional migrations, diff/patch immutability.
  - `tests/unit/readAloud.test.tsx`: Component mounting, audio synthesis triggering, cleanup on unmount, empty document disabled state.

### Level B: Integration & Persistence Tests
- **Objective**: Verify interaction between editor state, debounced auto-save, and storage persistence.
- **Coverage**:
  - `tests/integration/persistence.test.ts`: Auto-save debouncing (1500ms), manual save bypass, corrupted localStorage recovery, quota exhaustion resilience.
  - `tests/integration/roundtrip.test.ts`: Semantic roundtrip integrity (HTML ↔ JSONDocumentModel ↔ HTML) across formatted text, tables, lists, and page breaks.

### Level C: Adversarial & Property-Based Tests
- **Objective**: Use randomized inputs to discover unhandled edge cases and data corruption.
- **Coverage**:
  - `tests/adversarial/unicodeAndFuzz.test.ts`:
    - Complex scripts: Bangla, Arabic (RTL), Hindi, Japanese, joined family/flag emojis, zero-width spaces/joiners.
    - `fast-check` property tests generating random arbitrary string streams.
    - Unbroken string stress tests (10,000 characters).
    - Malicious XSS sanitization payloads (`<script>`, `onerror`, `javascript:`).
    - Deeply nested unclosed HTML tags (50+ levels).

### Level D: Multi-Touch & Gesture Verification
- **Objective**: Verify gesture library integration, 2-finger pan/pinch coordinate math, and single-finger text editing isolation.
- **Coverage**:
  - `hooks/useTouchZoom.tsx`: Multi-touch pinch-to-zoom scaling bounds (15% to 450%), rubberband damping resistance, midpoint focal centering, and 2-finger pan coordinate calculations.
  - CSS Transform Transitions: Verified smooth `200-260ms cubic-bezier(0.16, 1, 0.3, 1)` transitions on gesture release and double-tap zoom triggers.
  - Non-interference verification: Single-finger taps, caret placement, and text selection remain unhindered inside editable document pages.


---

## 3. Test Automation Execution
- **Test Runner**: Vitest 5.0.5 running on Node.js / JSDOM environment.
- **Commands**:
  - `npm run test`: Executes the full test suite across all categories.
  - `npm run test:watch`: Interactive watch mode for rapid test iteration.

---

## 4. Acceptance Criteria & Quality Gates
1. **Zero Failing Tests**: All unit, integration, roundtrip, and adversarial tests must exit with code 0.
2. **Zero Regressions**: No regressions in existing features, themes (Light/Dark/Ocean), or ribbon tool trays.
3. **Clean Codebase**: 0 ESLint errors (`npm run lint`) and clean production build (`npm run build`).
