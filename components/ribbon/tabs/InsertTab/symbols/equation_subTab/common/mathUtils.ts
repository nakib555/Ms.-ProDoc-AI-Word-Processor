import { convertLatexToMarkup } from 'mathlive';
import { latexToLinearUnicode, linearUnicodeToLatex, recordRecentSymbol } from '../../../../../../../utils/equationPresets';
import { RibbonTab } from '../../../../../../../types';

export type EquationJustification = 'left' | 'center' | 'right';

export type MathFieldEl = HTMLElement & {
  value?: string;
  selection?: unknown;
  getValue?: (...args: any[]) => string;
  executeCommand?: (cmd: any) => boolean;
};

let lastActiveMathField: MathFieldEl | null = null;
let lastActiveEditorEl: HTMLElement | null = null;

export const setLastActiveMathField = (el: MathFieldEl | null) => {
  lastActiveMathField = el;
  if (el) {
    const ed = el.closest('.prodoc-editor') as HTMLElement | null;
    if (ed) lastActiveEditorEl = ed;
  }
};

export const getActiveMathField = (): MathFieldEl | null => {
  if (typeof document === 'undefined') return null;
  const activeEl = document.activeElement as MathFieldEl | null;
  if (activeEl && activeEl.tagName?.toLowerCase() === 'math-field') {
    setLastActiveMathField(activeEl);
    return activeEl;
  }
  if (lastActiveMathField && document.body.contains(lastActiveMathField)) {
    return lastActiveMathField;
  }
  return null;
};

export const getActiveEquationWrapper = (): HTMLElement | null => {
  const mf = getActiveMathField();
  if (mf) return mf.closest('.equation-wrapper') as HTMLElement | null;
  if (typeof document !== 'undefined') {
    return document.querySelector('.equation-wrapper[data-selected="true"]') as HTMLElement | null;
  }
  return null;
};

export const setLastActiveEditor = (el: HTMLElement | null) => {
  if (el && el.classList.contains('prodoc-editor')) {
    lastActiveEditorEl = el;
  }
};

export const getActiveEditorElement = (): HTMLElement | null => {
  if (typeof document === 'undefined') return null;
  const sel = window.getSelection();
  if (sel && sel.rangeCount > 0) {
    const anchor = sel.anchorNode;
    const el = anchor?.nodeType === Node.ELEMENT_NODE ? (anchor as HTMLElement) : anchor?.parentElement;
    const found = el?.closest('.prodoc-editor') as HTMLElement | null;
    if (found) {
      lastActiveEditorEl = found;
      return found;
    }
  }
  if (lastActiveEditorEl && document.body.contains(lastActiveEditorEl)) {
    return lastActiveEditorEl;
  }
  return (document.querySelector('.prodoc-editor') as HTMLElement | null) || null;
};

const notifyEditorChange = (editorEl: HTMLElement | null) => {
  if (!editorEl) return;
  editorEl.dataset.commitImmediate = 'true';
  editorEl.dispatchEvent(new Event('input', { bubbles: true }));
};

export const escapeLatexHtml = (latex: string): string =>
  latex.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Renders a LaTeX structure string into crisp static MathLive HTML markup where
 * every \placeholder{} renders as an MS Word-style dashed box (.prodoc-struct-slot).
 */
export const renderEquationPreviewMarkup = (latex: string): string => {
  try {
    const prepared = latex
      .replace(/\\placeholder\{\}/g, '\\class{prodoc-struct-slot}{\\phantom{x}}')
      .replace(/\\placeholder(?![a-zA-Z])/g, '\\class{prodoc-struct-slot}{\\phantom{x}}');
    return convertLatexToMarkup(prepared, { defaultMode: 'math' });
  } catch {
    return escapeLatexHtml(latex);
  }
};

const SYMBOL_TO_LATEX: Record<string, string> = {
  '±': '\\pm ',
  '∓': '\\mp ',
  '∞': '\\infty ',
  '≠': '\\neq ',
  '×': '\\times ',
  '÷': '\\div ',
  '∝': '\\propto ',
  '≪': '\\ll ',
  '≫': '\\gg ',
  '≤': '\\leq ',
  '≥': '\\geq ',
  '≅': '\\cong ',
  '≈': '\\approx ',
  '≡': '\\equiv ',
  '∀': '\\forall ',
  '∃': '\\exists ',
  '∄': '\\nexists ',
  '∂': '\\partial ',
  '∇': '\\nabla ',
  '√': '\\sqrt{\\placeholder{}}',
  '∛': '\\sqrt[3]{\\placeholder{}}',
  '∜': '\\sqrt[4]{\\placeholder{}}',
  '∪': '\\cup ',
  '∩': '\\cap ',
  '∅': '\\emptyset ',
  '∈': '\\in ',
  '∉': '\\notin ',
  '∋': '\\ni ',
  '⊂': '\\subset ',
  '⊆': '\\subseteq ',
  '⊃': '\\supset ',
  '⊇': '\\supseteq ',
  '←': '\\leftarrow ',
  '↑': '\\uparrow ',
  '→': '\\rightarrow ',
  '↓': '\\downarrow ',
  '↔': '\\leftrightarrow ',
  '⇐': '\\Leftarrow ',
  '⇒': '\\Rightarrow ',
  '⇔': '\\Leftrightarrow ',
  '∴': '\\therefore ',
  '∵': '\\because ',
  '∑': '\\sum ',
  '∏': '\\prod ',
  '∫': '\\int ',
  '∬': '\\iint ',
  '∭': '\\iiint ',
  '∮': '\\oint ',
  '·': '\\cdot ',
  '⋮': '\\vdots ',
  '…': '\\ldots ',
  '⋯': '\\cdots ',
  '⋱': '\\ddots ',
  '¬': '\\neg ',
  '∧': '\\land ',
  '∨': '\\lor ',
  '∠': '\\angle ',
  '⊥': '\\perp ',
  '∥': '\\parallel ',
  '°': '^\\circ ',
  'α': '\\alpha ',
  'β': '\\beta ',
  'γ': '\\gamma ',
  'δ': '\\delta ',
  'ε': '\\varepsilon ',
  'ϵ': '\\epsilon ',
  'ζ': '\\zeta ',
  'η': '\\eta ',
  'θ': '\\theta ',
  'ϑ': '\\vartheta ',
  'ι': '\\iota ',
  'κ': '\\kappa ',
  'λ': '\\lambda ',
  'μ': '\\mu ',
  'ν': '\\nu ',
  'ξ': '\\xi ',
  'π': '\\pi ',
  'ϖ': '\\varpi ',
  'ρ': '\\rho ',
  'ϱ': '\\varrho ',
  'σ': '\\sigma ',
  'ς': '\\varsigma ',
  'τ': '\\tau ',
  'υ': '\\upsilon ',
  'φ': '\\varphi ',
  'ϕ': '\\phi ',
  'χ': '\\chi ',
  'ψ': '\\psi ',
  'ω': '\\omega ',
  'Γ': '\\Gamma ',
  'Δ': '\\Delta ',
  'Θ': '\\Theta ',
  'Λ': '\\Lambda ',
  'Ξ': '\\Xi ',
  'Π': '\\Pi ',
  'Σ': '\\Sigma ',
  'Υ': '\\Upsilon ',
  'Φ': '\\Phi ',
  'Ψ': '\\Psi ',
  'Ω': '\\Omega ',
  'ℏ': '\\hbar ',
  'ℓ': '\\ell ',
  'ℝ': '\\mathbb{R}',
  'ℤ': '\\mathbb{Z}',
  'ℕ': '\\mathbb{N}',
  'ℚ': '\\mathbb{Q}',
  'ℂ': '\\mathbb{C}',
  'ℵ': '\\aleph ',
};

export const configureMathFieldElement = (mf: MathFieldEl | null) => {
  if (!mf) return;
  mf.setAttribute('placeholder', 'Type equation here.');
  mf.setAttribute('smart-fence', 'on');
  mf.setAttribute('math-virtual-keyboard-policy', 'manual');
  mf.setAttribute('placeholder-symbol', '⬚');
};

/**
 * Inserts a brand-new interactive MathLive equation box into the currently active editor page
 * and focuses it so the user can begin typing right away (like MS Word Alt+=).
 */
export const insertEquationBox = (
  latex?: string,
  displayMode: 'inline' | 'block' = 'inline',
  justification: EquationJustification = 'center'
): MathFieldEl | null => {
  if (typeof document === 'undefined') return null;

  // If already focused inside a math-field and inserting an empty box, just focus Equation tab
  const currentActive = document.activeElement as MathFieldEl | null;
  if (
    currentActive &&
    currentActive.tagName?.toLowerCase() === 'math-field' &&
    (!latex || latex.trim() === '')
  ) {
    setLastActiveMathField(currentActive);
    currentActive.focus();
    window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: RibbonTab.EQUATION }));
    return currentActive;
  }

  const editorEl = getActiveEditorElement();
  if (!editorEl) return null;

  const sel = window.getSelection();
  const selectionInsideEditor =
    sel &&
    sel.rangeCount > 0 &&
    editorEl.contains(sel.anchorNode);

  let initialLatex = latex ?? '';
  if (latex === undefined && selectionInsideEditor && sel && !sel.isCollapsed) {
    const selectedText = sel.toString().trim();
    if (selectedText) {
      initialLatex = linearUnicodeToLatex(selectedText);
    }
  }

  if (!selectionInsideEditor) {
    editorEl.focus();
    const range = document.createRange();
    range.selectNodeContents(editorEl);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  const eqId = `eq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const safeLatex = escapeLatexHtml(initialLatex);
  const justAttr = displayMode === 'block' ? ` data-justification="${justification}"` : '';
  const html = `&#8203;<span class="equation-wrapper" data-equation-id="${eqId}" data-display="${displayMode}"${justAttr} contenteditable="false"><span class="equation-handle" title="Select equation">⋮⋮</span><math-field placeholder="Type equation here." smart-fence="on" math-virtual-keyboard-policy="manual" placeholder-symbol="⬚" value="${safeLatex}">${safeLatex}</math-field><span class="equation-dropdown" title="Equation Options">▼</span></span>&#8203;`;

  document.execCommand('insertHTML', false, html);

  const insertedWrapper = editorEl.querySelector(`[data-equation-id="${eqId}"]`) as HTMLElement | null;
  const mf = insertedWrapper?.querySelector('math-field') as MathFieldEl | null;
  if (mf) {
    configureMathFieldElement(mf);
    if (initialLatex) {
      mf.value = initialLatex;
      mf.setAttribute('value', initialLatex);
    }
    setLastActiveMathField(mf);
    setTimeout(() => {
      mf.focus();
    }, 30);
  }

  notifyEditorChange(editorEl);

  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('prodoc:switchTab', { detail: RibbonTab.EQUATION }));
  }, 80);

  return mf;
};

export const insertMathStructure = (latex: string) => {
  const mf = getActiveMathField();
  if (mf && typeof mf.executeCommand === 'function') {
    mf.executeCommand(['insert', latex, { focus: true }]);
    if (mf.value !== undefined) {
      mf.setAttribute('value', mf.value);
    }
    notifyEditorChange(mf.closest('.prodoc-editor') as HTMLElement | null);
    return;
  }

  insertEquationBox(latex, 'inline');
};

export const insertSymbolAtSelection = (symbol: string) => {
  recordRecentSymbol(symbol);
  const activeMf = getActiveMathField();
  const isFocusedInEditor =
    typeof document !== 'undefined' &&
    document.activeElement?.closest?.('.prodoc-editor') &&
    document.activeElement?.tagName?.toLowerCase() !== 'math-field';

  if (activeMf && !isFocusedInEditor && typeof activeMf.executeCommand === 'function') {
    const token = SYMBOL_TO_LATEX[symbol] || symbol;
    activeMf.executeCommand(['insert', token, { focus: true }]);
    if (activeMf.value !== undefined) {
      activeMf.setAttribute('value', activeMf.value);
    }
    notifyEditorChange(activeMf.closest('.prodoc-editor') as HTMLElement | null);
    return;
  }

  const editorEl = getActiveEditorElement();
  if (editorEl) {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !editorEl.contains(sel.anchorNode)) {
      editorEl.focus();
    }
    document.execCommand('insertText', false, symbol);
    notifyEditorChange(editorEl);
  }
};

/**
 * Wraps the currently selected math in \text{...} or inserts a normal text box
 * inside the active equation, matching MS Word's "abc Normal Text" toggle.
 */
export const wrapSelectionAsAbcText = (): boolean => {
  const mf = getActiveMathField();
  if (mf && typeof mf.executeCommand === 'function') {
    let selectedLatex = '';
    try {
      if (typeof mf.getValue === 'function' && mf.selection) {
        selectedLatex = mf.getValue(mf.selection, 'latex') || '';
      }
    } catch {
      selectedLatex = '';
    }

    const trimmed = selectedLatex.trim();
    if (trimmed) {
      const unwrapped = trimmed.match(/^\\text\{([\s\S]*)\}$/);
      const next = unwrapped ? unwrapped[1] : `\\text{${trimmed}}`;
      mf.executeCommand(['insert', next, { focus: true }]);
    } else {
      mf.executeCommand(['insert', '\\text{\\placeholder{}}', { focus: true }]);
    }

    if (mf.value !== undefined) {
      mf.setAttribute('value', mf.value);
    }
    notifyEditorChange(mf.closest('.prodoc-editor') as HTMLElement | null);
    return true;
  }
  return Boolean(insertEquationBox('\\text{\\placeholder{}}', 'inline'));
};

export const toggleActiveEquationDisplayMode = (): 'inline' | 'block' | null => {
  const wrapper = getActiveEquationWrapper();
  if (!wrapper) return null;
  const current = wrapper.getAttribute('data-display') === 'block' ? 'block' : 'inline';
  const next = current === 'block' ? 'inline' : 'block';
  wrapper.setAttribute('data-display', next);
  if (next === 'block' && !wrapper.getAttribute('data-justification')) {
    wrapper.setAttribute('data-justification', 'center');
  } else if (next === 'inline') {
    wrapper.removeAttribute('data-justification');
  }
  notifyEditorChange(wrapper.closest('.prodoc-editor') as HTMLElement | null);
  return next;
};

export const setActiveEquationJustification = (
  justification: EquationJustification
): boolean => {
  const wrapper = getActiveEquationWrapper();
  if (!wrapper) return false;
  wrapper.setAttribute('data-display', 'block');
  wrapper.setAttribute('data-justification', justification);
  notifyEditorChange(wrapper.closest('.prodoc-editor') as HTMLElement | null);
  return true;
};

export const convertActiveEquationToText = (format: 'unicode' | 'latex'): boolean => {
  const mf = getActiveMathField();
  const wrapper = mf?.closest('.equation-wrapper') as HTMLElement | null;
  if (!mf || !wrapper) return false;

  const editorEl = wrapper.closest('.prodoc-editor') as HTMLElement | null;
  const rawLatex = mf.value ?? mf.getAttribute('value') ?? mf.textContent ?? '';
  const textOut = format === 'unicode' ? latexToLinearUnicode(rawLatex) : rawLatex;

  const span = document.createElement('span');
  span.className = format === 'latex'
    ? 'prodoc-linear-eq font-mono text-[0.95em] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded'
    : 'prodoc-linear-eq';
  span.dataset.rawLatex = rawLatex;
  span.dataset.display = wrapper.getAttribute('data-display') === 'block' ? 'block' : 'inline';
  const just = wrapper.getAttribute('data-justification');
  if (just) span.dataset.justification = just;
  span.textContent = textOut;

  wrapper.replaceWith(span);
  setLastActiveMathField(null);
  notifyEditorChange(editorEl);
  return true;
};

export const convertSelectionToEquation = (): boolean => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return false;

  // If selection is on a previously linearized equation span, restore original LaTeX
  const anchorEl = sel.anchorNode?.nodeType === Node.ELEMENT_NODE
    ? (sel.anchorNode as HTMLElement)
    : sel.anchorNode?.parentElement;
  const linearSpan = anchorEl?.closest('.prodoc-linear-eq') as HTMLElement | null;
  if (linearSpan) {
    const rawLatex = linearSpan.dataset.rawLatex || linearUnicodeToLatex(linearSpan.textContent || '');
    const displayMode = linearSpan.dataset.display === 'block' ? 'block' : 'inline';
    const just = linearSpan.dataset.justification;
    const justAttr = displayMode === 'block' && just ? ` data-justification="${just}"` : '';
    const editorEl = linearSpan.closest('.prodoc-editor') as HTMLElement | null;
    const eqId = `eq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const safeLatex = escapeLatexHtml(rawLatex);
    const tmp = document.createElement('span');
    tmp.innerHTML = `<span class="equation-wrapper" data-equation-id="${eqId}" data-display="${displayMode}"${justAttr} contenteditable="false"><span class="equation-handle" title="Select equation">⋮⋮</span><math-field placeholder="Type equation here." smart-fence="on" math-virtual-keyboard-policy="manual" placeholder-symbol="⬚" value="${safeLatex}">${safeLatex}</math-field><span class="equation-dropdown" title="Equation Options">▼</span></span>`;
    const newWrapper = tmp.firstElementChild as HTMLElement;
    linearSpan.replaceWith(newWrapper);
    const mf = newWrapper.querySelector('math-field') as MathFieldEl | null;
    if (mf) {
      configureMathFieldElement(mf);
      mf.value = rawLatex;
      setLastActiveMathField(mf);
      mf.focus();
    }
    notifyEditorChange(editorEl);
    return true;
  }

  if (sel.isCollapsed) return false;
  const rawText = sel.toString().trim();
  if (!rawText) return false;
  const latex = linearUnicodeToLatex(rawText);
  return !!insertEquationBox(latex, 'inline');
};

/**
 * Batch converts all equations in the active editor page (or document) between
 * Professional MathLive boxes and Linear Unicode/LaTeX spans, like MS Word's
 * "All - Professional" and "All - Linear".
 */
export const convertAllEquations = (target: 'professional' | 'unicode' | 'latex'): number => {
  const editorEl = getActiveEditorElement();
  if (!editorEl) return 0;
  let count = 0;

  if (target === 'professional') {
    const linearSpans = Array.from(editorEl.querySelectorAll('.prodoc-linear-eq')) as HTMLElement[];
    let lastRestoredMf: MathFieldEl | null = null;
    for (const span of linearSpans) {
      const rawLatex = span.dataset.rawLatex || linearUnicodeToLatex(span.textContent || '');
      const displayMode = span.dataset.display === 'block' ? 'block' : 'inline';
      const just = span.dataset.justification;
      const justAttr = displayMode === 'block' && just ? ` data-justification="${just}"` : '';
      const eqId = `eq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const safeLatex = escapeLatexHtml(rawLatex);
      const tmp = document.createElement('span');
      tmp.innerHTML = `<span class="equation-wrapper" data-equation-id="${eqId}" data-display="${displayMode}"${justAttr} contenteditable="false"><span class="equation-handle" title="Select equation">⋮⋮</span><math-field placeholder="Type equation here." smart-fence="on" math-virtual-keyboard-policy="manual" placeholder-symbol="⬚" value="${safeLatex}">${safeLatex}</math-field><span class="equation-dropdown" title="Equation Options">▼</span></span>`;
      const wrapper = tmp.firstElementChild as HTMLElement;
      span.replaceWith(wrapper);
      const mf = wrapper.querySelector('math-field') as MathFieldEl | null;
      if (mf) {
        configureMathFieldElement(mf);
        mf.value = rawLatex;
        lastRestoredMf = mf;
      }
      count++;
    }
    if (lastRestoredMf) setLastActiveMathField(lastRestoredMf);
  } else {
    const wrappers = Array.from(editorEl.querySelectorAll('.equation-wrapper')) as HTMLElement[];
    for (const wrapper of wrappers) {
      const mf = wrapper.querySelector('math-field') as MathFieldEl | null;
      const rawLatex = mf?.value ?? mf?.getAttribute('value') ?? mf?.textContent ?? '';
      const span = document.createElement('span');
      span.className = target === 'latex'
        ? 'prodoc-linear-eq font-mono text-[0.95em] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded'
        : 'prodoc-linear-eq';
      span.dataset.rawLatex = rawLatex;
      span.dataset.display = wrapper.getAttribute('data-display') === 'block' ? 'block' : 'inline';
      const just = wrapper.getAttribute('data-justification');
      if (just) span.dataset.justification = just;
      span.textContent = target === 'unicode' ? latexToLinearUnicode(rawLatex) : rawLatex;
      wrapper.replaceWith(span);
      count++;
    }
    if (count > 0) setLastActiveMathField(null);
  }

  if (count > 0) {
    notifyEditorChange(editorEl);
  }
  return count;
};
