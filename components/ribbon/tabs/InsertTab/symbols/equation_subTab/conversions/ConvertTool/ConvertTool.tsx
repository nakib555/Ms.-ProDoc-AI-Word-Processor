
import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
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
import { computeAnchoredPopover } from '../../../../../../../../utils/viewportPosition';

export const ConvertTool: React.FC = () => {
  const { conversionType, setConversionType } = useEquationTab();
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; maxHeight: string; maxWidth: string }>({
    top: 0,
    left: 8,
    maxHeight: '75dvh',
    maxWidth: 'calc(100vw - 16px)',
  });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const pos = computeAnchoredPopover(rect, menuRef.current, {
      preferredWidth: 256,
      fallbackHeight: 240,
      idealMaxHeight: Math.round(window.innerHeight * 0.78),
      margin: 8,
      gap: 4,
    });
    setMenuStyle({
      top: pos.top,
      left: pos.left,
      maxHeight: pos.maxHeight,
      maxWidth: pos.maxWidth,
    });
  }, []);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePos();
    let observer: ResizeObserver | null = null;
    if (menuRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => requestAnimationFrame(updatePos));
      observer.observe(menuRef.current);
    }
    window.addEventListener('resize', updatePos);
    window.visualViewport?.addEventListener('resize', updatePos);
    window.addEventListener('scroll', updatePos, true);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updatePos);
      window.visualViewport?.removeEventListener('resize', updatePos);
      window.removeEventListener('scroll', updatePos, true);
    };
  }, [isOpen, updatePos]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

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
              ref={menuRef}
              className="fixed z-[9991] w-64 max-w-[calc(100vw-16px)] overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl py-1.5 text-xs"
              style={menuStyle}
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
