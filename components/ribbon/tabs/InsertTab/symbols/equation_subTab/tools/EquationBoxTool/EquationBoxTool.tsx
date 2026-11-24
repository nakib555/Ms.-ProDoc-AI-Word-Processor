
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sigma, Plus } from 'lucide-react';
import { RibbonButton } from '../../../../../../common/RibbonButton';
import { BUILTIN_EQUATION_PRESETS } from '../../../../../../../../utils/equationPresets';
import { insertEquationBox } from '../../common/mathUtils';

export const EquationBoxTool: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        left: Math.min(rect.left, Math.max(8, window.innerWidth - 320)),
      });
    }
    setIsOpen((prev) => !prev);
  };

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
        className="min-w-[60px]"
        title="Insert Equation or Built-In Formula"
      />

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9990]" onClick={() => setIsOpen(false)} />
            <div
              className="fixed z-[9991] w-76 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]"
              style={{ top: menuPos.top, left: menuPos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Built-In Equations
              </div>
              <div className="overflow-y-auto overscroll-contain p-2 space-y-1">
                {BUILTIN_EQUATION_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      insertEquationBox(preset.latex, 'inline');
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">{preset.title}</div>
                    <div className="text-sm font-serif text-slate-900 dark:text-white truncate">{preset.preview}</div>
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    insertEquationBox('', 'inline');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                >
                  <Plus size={14} />
                  <span>Insert New Equation</span>
                </button>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};
