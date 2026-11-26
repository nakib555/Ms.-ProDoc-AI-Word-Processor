import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EquationTab } from '../../components/ribbon/tabs/InsertTab/symbols/equation_subTab/EquationTab';
import { EquationBoxTool } from '../../components/ribbon/tabs/InsertTab/symbols/equation_subTab/tools/EquationBoxTool/EquationBoxTool';
import {
  renderEquationPreviewMarkup,
  insertEquationBox,
  convertActiveEquationToText,
  convertSelectionToEquation,
  convertAllEquations,
  wrapSelectionAsAbcText,
  setActiveEquationJustification,
  toggleActiveEquationDisplayMode,
} from '../../components/ribbon/tabs/InsertTab/symbols/equation_subTab/common/mathUtils';
import {
  saveCustomEquation,
  getSavedEquations,
  deleteSavedEquation,
  latexToLinearUnicode,
  linearUnicodeToLatex,
} from '../../utils/equationPresets';
import { htmlToJSONDocument, jsonDocumentToHtml } from '../../utils/documentModel';
import { useMathLive } from '../../hooks/useMathLive';

const TEST_PAGE_CONFIG = {
  size: 'Letter' as const,
  orientation: 'portrait' as const,
  margins: { top: 72, right: 72, bottom: 72, left: 72 },
};

const STRUCTURE_LABELS = [
  'Fraction',
  'Script',
  'Radical',
  'Integral',
  'Large Operator',
  'Bracket',
  'Function',
  'Accent',
  'Limit and Log',
  'Operator',
  'Matrix',
];

describe('MS Word Equation Parity & Structure Previews', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.body.innerHTML = '';
    (document as any).execCommand = vi.fn((cmd: string, _ui?: boolean, val?: string) => {
      if (cmd === 'insertHTML' && typeof val === 'string') {
        const ed = document.querySelector('.prodoc-editor');
        if (ed) {
          const tmp = document.createElement('div');
          tmp.innerHTML = val;
          while (tmp.firstChild) {
            ed.appendChild(tmp.firstChild);
          }
        }
        return true;
      }
      return true;
    });
  });

  it('renders all 11 Structure galleries cleanly with zero ML__error nodes and visible placeholder slots across every section tab', () => {
    render(<EquationTab />);

    for (const label of STRUCTURE_LABELS) {
      const trigger = screen.getByTitle(label);
      expect(trigger).toBeTruthy();
      fireEvent.click(trigger);

      const portalPreviews = document.body.querySelectorAll('.prodoc-struct-preview');
      expect(portalPreviews.length).toBeGreaterThan(0);

      // Check initial section has zero MathLive syntax errors
      expect(document.body.querySelectorAll('.ML__error').length).toBe(0);

      // Find any section tabs inside the open StructureDropdown portal and iterate all tabs
      const tabContainer = document.body.querySelector('div.bg-slate-100.border-b, div.dark\\:bg-slate-800.border-b');
      if (tabContainer) {
        const tabs = Array.from(tabContainer.querySelectorAll('button'));
        for (const tabBtn of tabs) {
          fireEvent.click(tabBtn);
          expect(document.body.querySelectorAll('.prodoc-struct-preview').length).toBeGreaterThan(0);
          expect(document.body.querySelectorAll('.ML__error').length).toBe(0);
        }
      }

      // Close via Escape before opening the next structure
      fireEvent.keyDown(window, { key: 'Escape' });
    }
  });

  it('renders visible dashed placeholder boxes (.prodoc-struct-slot) for placeholder LaTeX templates', () => {
    const fracHtml = renderEquationPreviewMarkup('\\frac{\\placeholder{}}{\\placeholder{}}');
    const container = document.createElement('div');
    container.innerHTML = fracHtml;

    expect(container.querySelectorAll('.ML__error').length).toBe(0);
    expect(container.querySelectorAll('.prodoc-struct-slot').length).toBe(2);

    const matrixHtml = renderEquationPreviewMarkup('\\begin{pmatrix} \\placeholder{} & \\placeholder{} \\\\ \\placeholder{} & \\placeholder{} \\end{pmatrix}');
    container.innerHTML = matrixHtml;
    expect(container.querySelectorAll('.ML__error').length).toBe(0);
    expect(container.querySelectorAll('.prodoc-struct-slot').length).toBe(4);
  });

  it('renders Quick Math Symbols strip inside Symbols group and multi-insert symbol dropdown', () => {
    render(<EquationTab />);

    const quickStrip = screen.getByLabelText('Quick Math Symbols');
    expect(quickStrip).toBeTruthy();
    expect(quickStrip.querySelectorAll('button').length).toBeGreaterThanOrEqual(20);

    const greekTrigger = screen.getByTitle('Greek Letters');
    fireEvent.click(greekTrigger);
    expect(screen.getByTitle('Close Symbol Gallery')).toBeTruthy();
    expect(screen.getByText('Lowercase')).toBeTruthy();
    expect(screen.getByText('Uppercase')).toBeTruthy();
  });

  it('supports Saved Equations persistence and EquationBoxTool display + deletion', () => {
    saveCustomEquation('Euler Identity', 'e^{i\\pi} + 1 = 0');
    expect(getSavedEquations().length).toBe(1);

    render(<EquationBoxTool />);
    const trigger = screen.getByText('Equation').closest('button')!;
    fireEvent.click(trigger);

    expect(screen.getByText('Saved Equations')).toBeTruthy();
    expect(screen.getByText('Euler Identity')).toBeTruthy();

    const delBtn = screen.getByTitle('Delete saved equation');
    fireEvent.click(delBtn);
    expect(getSavedEquations().length).toBe(0);
  });

  it('supports MS Word batch conversion (All - Linear / All - Professional), display mode, justification, and abc Text', () => {
    const editor = document.createElement('div');
    editor.className = 'prodoc-editor';
    document.body.appendChild(editor);

    const mf1 = insertEquationBox('a^2 + b^2 = c^2', 'inline');
    const mf2 = insertEquationBox('\\frac{1}{2}', 'inline');
    expect(mf1).toBeTruthy();
    expect(mf2).toBeTruthy();
    expect(editor.querySelectorAll('.equation-wrapper').length).toBe(2);

    // Justification and display mode on active equation
    expect(toggleActiveEquationDisplayMode()).toBe('block');
    expect(setActiveEquationJustification('left')).toBe(true);
    const activeWrapper = editor.querySelectorAll('.equation-wrapper')[1] as HTMLElement;
    expect(activeWrapper.getAttribute('data-display')).toBe('block');
    expect(activeWrapper.getAttribute('data-justification')).toBe('left');

    // Batch convert all to Linear Unicode and back to Professional
    const linearCount = convertAllEquations('unicode');
    expect(linearCount).toBe(2);
    expect(editor.querySelectorAll('.equation-wrapper').length).toBe(0);
    expect(editor.querySelectorAll('.prodoc-linear-eq').length).toBe(2);

    const profCount = convertAllEquations('professional');
    expect(profCount).toBe(2);
    expect(editor.querySelectorAll('.equation-wrapper').length).toBe(2);

    // Single linear conversion & abc Text fallback
    const restoredMf = editor.querySelector('.equation-wrapper math-field') as HTMLElement | null;
    restoredMf?.focus();
    expect(convertActiveEquationToText('latex')).toBe(true);
    expect(editor.querySelectorAll('.prodoc-linear-eq').length).toBe(1);

    const linearEl = editor.querySelector('.prodoc-linear-eq')!;
    const range = document.createRange();
    range.selectNodeContents(linearEl);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    expect(convertSelectionToEquation()).toBe(true);
    expect(editor.querySelectorAll('.equation-wrapper').length).toBe(2);

    expect(wrapSelectionAsAbcText()).toBe(true);
  });

  it('exposes ConvertTool All - Professional and All - Linear options', () => {
    render(<EquationTab />);
    const convertBtn = screen.getByTitle('Convert Equation Format');
    fireEvent.click(convertBtn);

    expect(screen.getByText('Current - Professional')).toBeTruthy();
    expect(screen.getByText('Current - Linear (Unicode)')).toBeTruthy();
    expect(screen.getByText('Current - Linear (LaTeX)')).toBeTruthy();
    expect(screen.getByText('All - Professional')).toBeTruthy();
    expect(screen.getByText(/All - Linear/)).toBeTruthy();
  });

  it('preserves equation displayMode and justification through DocumentModel HTML roundtrip', () => {
    const inputHtml =
      '<p>Inline: <span class="equation-wrapper" data-display="inline" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field value="x^2">x^2</math-field><span class="equation-dropdown">▼</span></span></p>' +
      '<p><span class="equation-wrapper" data-display="block" data-justification="right" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field value="\\frac{a}{b}">\\frac{a}{b}</math-field><span class="equation-dropdown">▼</span></span></p>';

    const model = htmlToJSONDocument(inputHtml, 'Math Doc', TEST_PAGE_CONFIG);
    const p1Eq = model.pages[0].sections[0].elements[0] as any;
    const p2Eq = model.pages[0].sections[0].elements[1] as any;

    expect(p1Eq.children[1].displayMode).toBe('inline');
    expect(p2Eq.children[0].displayMode).toBe('block');
    expect(p2Eq.children[0].justification).toBe('right');

    const roundtripHtml = jsonDocumentToHtml(model);
    expect(roundtripHtml).toContain('data-display="inline"');
    expect(roundtripHtml).toContain('data-display="block" data-justification="right"');
  });

  it('selects an equation via handle click and deletes it with Delete key in useMathLive', () => {
    const TestHost: React.FC = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      useMathLive('', ref);
      return (
        <div ref={ref} className="prodoc-editor" tabIndex={0}>
          <span className="equation-wrapper" data-display="inline" contentEditable={false}>
            <span className="equation-handle">⋮⋮</span>
            <math-field value="x+1">x+1</math-field>
            <span className="equation-dropdown">▼</span>
          </span>
        </div>
      );
    };

    const { container } = render(<TestHost />);
    const editor = container.querySelector('.prodoc-editor') as HTMLElement;
    const handle = container.querySelector('.equation-handle') as HTMLElement;
    const wrapper = container.querySelector('.equation-wrapper') as HTMLElement;

    fireEvent.click(handle);
    expect(wrapper.getAttribute('data-selected')).toBe('true');

    fireEvent.keyDown(editor, { key: 'Delete' });
    expect(editor.querySelectorAll('.equation-wrapper').length).toBe(0);
  });

  it('handles extended Unicode/LaTeX roundtrip symbols (roots, binomials, integrals, brackets)', () => {
    const linear = latexToLinearUnicode('\\sqrt[3]{x} + \\binom{n}{k} + \\iint f\\,dx');
    expect(linear).toContain('∛(x)');
    expect(linear).toContain('C(n, k)');
    expect(linear).toContain('∬');

    const back = linearUnicodeToLatex('∛(x) + ∬ y + ⬚');
    expect(back).toContain('\\sqrt[3]{x}');
    expect(back).toContain('\\iint');
    expect(back).toContain('\\placeholder{}');
  });
});
