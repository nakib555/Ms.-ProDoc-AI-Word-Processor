
import React from 'react';
import { RibbonSection } from '../../../../../common/RibbonSection';
import { BasicMathTool } from './BasicMathTool/BasicMathTool';
import { GreekLettersTool } from './GreekLettersTool/GreekLettersTool';
import { LetterLikeSymbolsTool } from './Letter-LikeSymbolsTool/Letter-LikeSymbolsTool';
import { OperatorsTool } from './OperatorsTool/OperatorsTool';
import { ArrowsTool } from './ArrowsTool/ArrowsTool';
import { NegatedRelationsTool } from './NegatedRelationsTool/NegatedRelationsTool';
import { ScriptsTool } from './ScriptsTool/ScriptsTool';
import { GeometryTool } from './GeometryTool/GeometryTool';
import { insertSymbolAtSelection } from '../common/mathUtils';

const QUICK_MATH_SYMBOLS = [
  '±', '∞', '=', '≠', '×', '÷', '≤', '≥',
  '≈', '∝', '√', '∑', '∫', '∂', '∇', 'π',
  'α', 'β', 'θ', 'Δ', '→', '⇒', '∈', '∪',
];

export const SymbolsGroup: React.FC = () => {
  return (
    <RibbonSection title="Symbols">
        <div className="flex items-center gap-2 h-full px-1">
            <div
              className="grid grid-rows-3 grid-flow-col gap-0.5 p-1 rounded-md border border-slate-200/80 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 shrink-0"
              aria-label="Quick Math Symbols"
            >
              {QUICK_MATH_SYMBOLS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => insertSymbolAtSelection(sym)}
                  className="w-6 h-5 flex items-center justify-center rounded text-[13px] font-serif text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-700 dark:hover:text-blue-300 transition-colors select-none"
                  title={`Insert ${sym}`}
                >
                  {sym}
                </button>
              ))}
            </div>
            <div className="grid grid-rows-4 md:grid-rows-2 grid-flow-col gap-x-2 gap-y-1 h-full min-w-[300px]">
                <BasicMathTool />
                <GreekLettersTool />
                <LetterLikeSymbolsTool />
                <OperatorsTool />
                <ArrowsTool />
                <NegatedRelationsTool />
                <ScriptsTool />
                <GeometryTool />
            </div>
        </div>
    </RibbonSection>
  );
};
