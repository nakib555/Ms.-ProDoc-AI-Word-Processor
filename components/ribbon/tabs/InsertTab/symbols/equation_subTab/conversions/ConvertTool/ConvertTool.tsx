
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { RefreshCw } from 'lucide-react';
import { SmallRibbonButton } from '../../../../../ViewTab/common/ViewTools';
import { useEquationTab } from '../../EquationTabContext';
import {
  convertActiveEquationToText,
  convertAllEquations,
  convertSelectionToEquation,
  toggleActiveEquationDisplayMode,
} from '../../common/mathUtils';

export const ConvertTool: React.FC = () => {
  const { conversionType, setConversionType } = useEquationTab();
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 4,
        left: Math.min(rect.left, Math.max(8, window.innerWidth - 260)),
      });
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={triggerRef} className="relative">
      <SmallRibbonButton
        icon={RefreshCw}
        label="Convert"
        onClick={toggle}
        hasArrow
        title="Convert Equation Format"
      />
      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9990]" onClick={() => setIsOpen(false)} />
            <div
              className="fixed z-[9991] w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-1.5 text-xs"
              style={{ top: pos.top, left: pos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  convertSelectionToEquation();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium"
              >
                Current - Professional
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setConversionType('unicode');
                  convertActiveEquationToText('unicode');
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
              >
                Current - Linear (Unicode)
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setConversionType('latex');
                  convertActiveEquationToText('latex');
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
              >
                Current - Linear (LaTeX)
              </button>
              <div className="my-1 border-t border-slate-200 dark:border-slate-700" />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  convertAllEquations('professional');
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium"
              >
                All - Professional
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  convertAllEquations(conversionType);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
              >
                All - Linear ({conversionType === 'latex' ? 'LaTeX' : 'Unicode'})
              </button>
              <div className="my-1 border-t border-slate-200 dark:border-slate-700" />
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  toggleActiveEquationDisplayMode();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 font-medium"
              >
                Change to Inline / Display
              </button>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};
