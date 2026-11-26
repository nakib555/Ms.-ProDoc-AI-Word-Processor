import React from 'react';
import { Sigma, Sparkles, AlignCenter } from 'lucide-react';
import { StudioButton } from '../common/StudioButton';
import { StudioDivider } from '../common/StudioDivider';
import { StudioDropdown } from '../common/StudioDropdown';
import {
  insertMathStructure,
  insertSymbolAtSelection,
  toggleActiveEquationDisplayMode,
} from '../../ribbon/tabs/InsertTab/symbols/equation_subTab/common/mathUtils';

const GREEK_MATH_SYMBOLS = [
  { label: 'α', latex: '\\alpha' },
  { label: 'β', latex: '\\beta' },
  { label: 'γ', latex: '\\gamma' },
  { label: 'θ', latex: '\\theta' },
  { label: 'π', latex: '\\pi' },
  { label: 'σ', latex: '\\sigma' },
  { label: 'λ', latex: '\\lambda' },
  { label: 'Δ', latex: '\\Delta' },
  { label: 'Ω', latex: '\\Omega' },
  { label: '∞', latex: '\\infty' },
  { label: '±', latex: '\\pm' },
  { label: '≠', latex: '\\neq' },
  { label: '≤', latex: '\\le' },
  { label: '≥', latex: '\\ge' },
  { label: '×', latex: '\\times' },
  { label: '÷', latex: '\\div' },
];

export const EquationStudioTray: React.FC = () => {
  const insertLatex = (latex: string) => {
    insertMathStructure(latex);
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full bg-sky-50/20 dark:bg-sky-950/10">
      <div className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 mr-1 flex-shrink-0">
        <Sigma size={14} />
        <span>Math Structures:</span>
      </div>

      {/* Fraction */}
      <StudioButton
        label="a/b Fraction"
        onClick={() => insertLatex('\\frac{\\placeholder{}}{\\placeholder{}}')}
        title="Insert Fraction"
        size="sm"
      />

      {/* Superscript */}
      <StudioButton
        label="x² Power"
        onClick={() => insertLatex('\\placeholder{}^{\\placeholder{}}')}
        title="Insert Superscript / Exponent"
        size="sm"
      />

      {/* Subscript */}
      <StudioButton
        label="xᵢ Subscript"
        onClick={() => insertLatex('\\placeholder{}_{\\placeholder{}}')}
        title="Insert Subscript"
        size="sm"
      />

      {/* Square root */}
      <StudioButton
        label="√x Radical"
        onClick={() => insertLatex('\\sqrt{\\placeholder{}}')}
        title="Insert Square Root"
        size="sm"
      />

      {/* Integral */}
      <StudioButton
        label="∫ Integral"
        onClick={() => insertLatex('\\int_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}')}
        title="Insert Definite Integral"
        size="sm"
      />

      {/* Summation */}
      <StudioButton
        label="∑ Sum"
        onClick={() => insertLatex('\\sum_{\\placeholder{}}^{\\placeholder{}} \\placeholder{}')}
        title="Insert Summation"
        size="sm"
      />

      <StudioDivider />

      <StudioButton
        icon={AlignCenter}
        label="Display"
        onClick={() => toggleActiveEquationDisplayMode()}
        title="Toggle Inline / Display Equation"
        size="sm"
      />

      {/* Greek & Math Symbols Dropdown */}
      <StudioDropdown
        icon={Sparkles}
        label="Greek & Symbols"
        size="sm"
        title="Insert Greek Symbols & Operators"
        customContent={(close) => (
          <div className="p-2.5 w-52">
            <div className="text-[11px] font-semibold text-slate-500 mb-2">Math Symbols</div>
            <div className="grid grid-cols-4 gap-1.5">
              {GREEK_MATH_SYMBOLS.map(item => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    insertSymbolAtSelection(item.label);
                    close();
                  }}
                  className="h-8 rounded bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-950 text-sm font-serif font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 cursor-pointer"
                  title={item.latex}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
};
