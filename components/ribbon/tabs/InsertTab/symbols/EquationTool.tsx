
import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Sigma, Plus, PenTool, Trash2 } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import {
  BUILTIN_EQUATION_PRESETS,
  getSavedEquations,
  deleteSavedEquation,
  EquationPreset,
} from '../../../../../utils/equationPresets';
import { insertEquationBox } from './equation_subTab/common/mathUtils';
import { computeAnchoredPopover } from '../../../../../utils/viewportPosition';

export const EquationTool: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; maxHeight: string; maxWidth: string }>({
    top: 0,
    left: 8,
    maxHeight: '75dvh',
    maxWidth: 'calc(100vw - 16px)',
  });
  const [savedEquations, setSavedEquations] = useState<EquationPreset[]>(() => getSavedEquations());
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setSavedEquations(getSavedEquations());
    window.addEventListener('prodoc:saved-equations-updated', sync);
    return () => window.removeEventListener('prodoc:saved-equations-updated', sync);
  }, []);

  const updatePos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const pos = computeAnchoredPopover(rect, menuRef.current, {
      preferredWidth: 320,
      fallbackHeight: 380,
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

  const toggleMenu = () => {
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
    <div ref={triggerRef} className="relative flex items-center h-full">
      <RibbonButton
        icon={Sigma}
        label="Equation"
        onClick={toggleMenu}
        hasArrow
        active={isOpen}
        title="Insert Equation or Built-in Formula (Alt+=)"
      />

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9990]" onClick={() => setIsOpen(false)} />
            <div
              ref={menuRef}
              className="fixed z-[9991] w-80 max-w-[calc(100vw-16px)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col"
              style={menuStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-y-auto overscroll-contain flex-1">
                {savedEquations.length > 0 && (
                  <>
                    <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Saved Equations
                    </div>
                    <div className="p-2 space-y-1 border-b border-slate-200 dark:border-slate-700">
                      {savedEquations.map((preset) => (
                        <div key={preset.id} className="flex items-center gap-1 group">
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              insertEquationBox(preset.latex, 'inline');
                              setIsOpen(false);
                            }}
                            className="flex-1 min-w-0 text-left px-3 py-2 rounded-lg border border-transparent hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/70 dark:hover:bg-blue-900/25 transition-all"
                          >
                            <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 truncate">
                              {preset.title}
                            </div>
                            <div className="text-sm font-serif text-slate-900 dark:text-white mt-0.5 truncate">
                              {preset.preview}
                            </div>
                          </button>
                          <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => deleteSavedEquation(preset.id)}
                            className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete saved equation"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Built-In Equations
                </div>
                <div className="p-2 space-y-1">
                  {BUILTIN_EQUATION_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        insertEquationBox(preset.latex, 'inline');
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg border border-transparent hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/70 dark:hover:bg-blue-900/25 transition-all group"
                    >
                      <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                        {preset.title}
                      </div>
                      <div className="text-sm font-serif text-slate-900 dark:text-white mt-0.5 truncate">
                        {preset.preview}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 space-y-1">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    insertEquationBox('', 'inline');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                >
                  <Plus size={14} />
                  <span>Insert New Equation (Alt+=)</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent('prodoc:open-equation-scratchpad'));
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <PenTool size={13} />
                  <span>Equation Scratchpad...</span>
                </button>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};
