
import { latexToLinearUnicode, linearUnicodeToLatex, recordRecentSymbol } from '../../../../../../../utils/equationPresets';
import { RibbonTab } from '../../../../../../../types';

export type MathFieldEl = HTMLElement & {
  value?: string;
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
  latex.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Inserts a brand-new interactive MathLive equation box into the currently active editor page
 * and focuses it so the user can begin typing right away.
 */
export const insertEquationBox = (
  latex: string = '',
  displayMode: 'inline' | 'block' = 'inline'
): MathFieldEl | null => {
  if (typeof document === 'undefined') return null;

  const editorEl = getActiveEditorElement();
  if (!editorEl) return null;

  const sel = window.getSelection();
  const selectionInsideEditor =
    sel &&
    sel.rangeCount > 0 &&
    editorEl.contains(sel.anchorNode);

  if (!selectionInsideEditor) {
    editorEl.focus();
    const range = document.createRange();
    range.selectNodeContents(editorEl);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  const eqId = `eq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const safeLatex = escapeLatexHtml(latex);
  const html = `&#8203;<span class="equation-wrapper" data-equation-id="${eqId}" data-display="${displayMode}" contenteditable="false"><span class="equation-handle" title="Drag or select equation">⋮⋮</span><math-field placeholder="Type equation here." value="${safeLatex}">${safeLatex}</math-field><span class="equation-dropdown" title="Equation Options">▼</span></span>&#8203;`;

  document.execCommand('insertHTML', false, html);

  const insertedWrapper = editorEl.querySelector(`[data-equation-id="${eqId}"]`) as HTMLElement | null;
  const mf = insertedWrapper?.querySelector('math-field') as MathFieldEl | null;
  if (mf) {
    if (latex) {
      mf.value = latex;
      mf.setAttribute('value', latex);
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
  const activeMf = document.activeElement?.tagName?.toLowerCase() === 'math-field'
    ? (document.activeElement as MathFieldEl)
    : null;

  if (activeMf && typeof activeMf.executeCommand === 'function') {
    activeMf.executeCommand(['insert', symbol, { focus: true }]);
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

export const wrapSelectionAsAbcText = () => {
  const mf = getActiveMathField();
  if (mf && typeof mf.executeCommand === 'function') {
    mf.executeCommand(['insert', '\\text{Normal Text}', { focus: true }]);
    if (mf.value !== undefined) {
      mf.setAttribute('value', mf.value);
    }
    notifyEditorChange(mf.closest('.prodoc-editor') as HTMLElement | null);
    return true;
  }
  return false;
};

export const toggleActiveEquationDisplayMode = (): 'inline' | 'block' | null => {
  const mf = getActiveMathField();
  const wrapper = mf?.closest('.equation-wrapper') as HTMLElement | null;
  if (!wrapper) return null;
  const current = wrapper.getAttribute('data-display') === 'block' ? 'block' : 'inline';
  const next = current === 'block' ? 'inline' : 'block';
  wrapper.setAttribute('data-display', next);
  notifyEditorChange(wrapper.closest('.prodoc-editor') as HTMLElement | null);
  return next;
};

export const convertActiveEquationToText = (format: 'unicode' | 'latex'): boolean => {
  const mf = getActiveMathField();
  const wrapper = mf?.closest('.equation-wrapper') as HTMLElement | null;
  if (!mf || !wrapper) return false;

  const editorEl = wrapper.closest('.prodoc-editor') as HTMLElement | null;
  const rawLatex = mf.value ?? mf.getAttribute('value') ?? mf.textContent ?? '';
  const textOut = format === 'unicode' ? latexToLinearUnicode(rawLatex) : rawLatex;

  const span = document.createElement('span');
  span.className = format === 'latex' ? 'font-mono text-[0.95em] bg-slate-100 px-1 rounded' : '';
  span.textContent = textOut;

  wrapper.replaceWith(span);
  setLastActiveMathField(null);
  notifyEditorChange(editorEl);
  return true;
};

export const convertSelectionToEquation = (): boolean => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return false;
  const rawText = sel.toString().trim();
  if (!rawText) return false;
  const latex = linearUnicodeToLatex(rawText);
  return !!insertEquationBox(latex, 'inline');
};

