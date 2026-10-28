# Bug Report & Defect Remediation Log

## Summary of Defects Found & Remediated
| Bug ID | Severity | Feature Area | Description | Root Cause | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BUG-001** | **Critical** | HomeTab / Voice | `ReferenceError: useEffect is not defined` when mounting or clicking ReadAloudTool. | `useEffect` hook was invoked in component cleanup but omitted from `import React, { useState, useMemo } from 'react';`. | **Fixed & Verified** |
| **BUG-002** | **High** | Document Model / Persistence | `htmlToJSONDocument` returned document object without `schemaVersion: 2`. | Return object in `htmlToJSONDocument` did not stamp `schemaVersion`, producing unversioned document ASTs that required guessing. | **Fixed & Verified** |
| **BUG-003** | **Medium** | Voice / TTS | `ReadAloudTool` failed to extract text from detached DOM element in JSDOM / WebKit environments. | Used `tempDiv.innerText` without fallback to `tempDiv.textContent`. `innerText` is empty on detached elements in non-rendered DOM trees. | **Fixed & Verified** |
| **BUG-004** | **Medium** | Test Architecture | `EditorContext` was not exported from `contexts/EditorContext.tsx`. | `const EditorContext = createContext(...)` was not exported, preventing test suites from wrapping components in custom providers. | **Fixed & Verified** |

---

## Detailed Bug Reports

### BUG-001: ReferenceError: useEffect is not defined in ReadAloudTool
- **Severity**: Critical (Application crash on HomeTab voice tool mount)
- **Preconditions**: User opens the Home tab or clicks the Read Aloud button.
- **Reproduction**:
  1. Mount `ReadAloudTool` component.
  2. Component evaluation attempts to execute `useEffect(() => { return () => stopAudio(); }, [])`.
  3. Browser throws `ReferenceError: useEffect is not defined`.
- **Root Cause**: `useEffect` was missing from the React imports on line 1 of `components/ribbon/tabs/HomeTab/voice/ReadAloudTool.tsx`.
- **Fix**: Added `useEffect` to `import React, { useState, useMemo, useEffect } from 'react';`.
- **Regression Test**: `tests/unit/readAloud.test.tsx` (passes 4/4 tests).

---

### BUG-002: Missing schemaVersion in htmlToJSONDocument
- **Severity**: High (Document metadata inconsistency and migration failures)
- **Preconditions**: Auto-save or document conversion from HTML to `.docjson`.
- **Reproduction**:
  1. Call `htmlToJSONDocument('<p>Sample</p>', 'Test', config)`.
  2. Inspect returned object: `doc.schemaVersion` is `undefined`.
  3. Downstream migration chains fails to detect current schema version.
- **Root Cause**: `htmlToJSONDocument` in `utils/documentModel.ts` returned an object with `type: 'document'` but forgot `schemaVersion: 2`.
- **Fix**: Stamped `schemaVersion: 2` into returned JSON document model in `utils/documentModel.ts`.
- **Regression Test**: `tests/adversarial/unicodeAndFuzz.test.ts` (property test asserts `doc.schemaVersion >= 1`).

---

### BUG-003: ReadAloudTool Text Extraction Failure on Detached Nodes
- **Severity**: Medium (Silent audio failure)
- **Preconditions**: User selects no text and triggers Read Aloud.
- **Reproduction**:
  1. Document has content.
  2. `tempDiv.innerHTML = content` creates a detached DOM element.
  3. Reading `tempDiv.innerText` returns `""` or `undefined` in headless/detached environments.
  4. Audio synthesizer never speaks because text is evaluated as empty.
- **Root Cause**: Reliance on layout-dependent `innerText` on detached element without `textContent` fallback.
- **Fix**: Updated both content-checking and extraction to `(tempDiv.innerText || tempDiv.textContent || '').trim()`.
- **Regression Test**: `tests/unit/readAloud.test.tsx` ("initiates speech synthesis on click").

---

### BUG-004: EditorContext Unexported
- **Severity**: Medium (Testing blocker)
- **Preconditions**: Writing unit tests for any component consuming `useEditor()`.
- **Root Cause**: `EditorContext` was declared as a module-private `const EditorContext = createContext(...)`.
- **Fix**: Exported `export const EditorContext = createContext<EditorContextType | undefined>(undefined);`.
- **Regression Test**: `tests/unit/readAloud.test.tsx`.
