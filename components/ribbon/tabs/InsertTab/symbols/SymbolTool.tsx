
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Omega, Grid } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { getRecentSymbols, SYMBOL_CATALOG } from '../../../../../utils/equationPresets';
import { insertSymbolAtSelection } from './equation_subTab/common/mathUtils';
import { SymbolPickerDialog } from './SymbolPickerDialog';

export const SymbolTool: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recentSymbols, setRecentSymbols] = useState<string[]>(() => getRecentSymbols());
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (!isMenuOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        left: Math.min(rect.left, Math.max(8, window.innerWidth - 268)),
      });
      setRecentSymbols(getRecentSymbols());
    }
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  const handleQuickInsert = (sym: string) => {
    insertSymbolAtSelection(sym);
    setRecentSymbols(getRecentSymbols());
    setIsMenuOpen(false);
  };

  const getTooltip = (char: string) => {
    const found = SYMBOL_CATALOG.find((s) => s.char === char);
    return found ? `${found.name} (${found.codepoint})` : `Insert ${char}`;
  };

  return (
    <div ref={triggerRef} className="relative flex items-center h-full">
      <RibbonButton
        icon={Omega}
        label="Symbol"
        onClick={toggleMenu}
        hasArrow
        active={isMenuOpen}
        title="Insert Symbol or Open Symbol Library"
      />

      {isMenuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9990]" onClick={() => setIsMenuOpen(false)} />
            <div
              className="fixed z-[9991] w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-2.5 overscroll-contain"
              style={{ top: menuPos.top, left: menuPos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                Frequently Used Symbols
              </div>
              <div className="grid grid-cols-5 gap-1 mb-2.5">
                {recentSymbols.slice(0, 20).map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleQuickInsert(sym)}
                    title={getTooltip(sym)}
                    className="h-9 w-full rounded-md border border-slate-200/80 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:border-blue-400 text-base font-serif text-slate-800 dark:text-slate-100 flex items-center justify-center transition-colors"
                  >
                    {sym}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDialogOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/70 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-xs font-semibold text-slate-700 dark:text-slate-100 transition-colors"
              >
                <Grid size={13} />
                <span>More Symbols...</span>
              </button>
            </div>
          </>,
          document.body
        )}

      <SymbolPickerDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
};
