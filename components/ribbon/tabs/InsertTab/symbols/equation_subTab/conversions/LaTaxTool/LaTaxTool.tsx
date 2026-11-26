
import React from 'react';
import { useEquationTab } from '../../EquationTabContext';

export const LaTaxTool: React.FC = () => {
  const { conversionType, setConversionType } = useEquationTab();
  
  return (
    <button
        type="button"
        aria-pressed={conversionType === 'latex'}
        onMouseDown={(e) => e.preventDefault()}
        className="flex items-center gap-1.5 text-[11px] cursor-pointer rounded px-1 py-0.5 group hover:bg-slate-100 dark:hover:bg-slate-700/60"
        onClick={() => setConversionType('latex')}
        title="Use LaTeX math input and linear format"
    >
        <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-colors ${conversionType === 'latex' ? 'border-blue-600 bg-blue-600' : 'border-slate-400 bg-white dark:bg-slate-800 group-hover:border-blue-400'}`}>
            {conversionType === 'latex' && <div className="w-1 h-1 bg-white rounded-full"></div>}
        </div>
        <span className="text-slate-700 dark:text-slate-300">LaTeX</span>
    </button>
  );
};
