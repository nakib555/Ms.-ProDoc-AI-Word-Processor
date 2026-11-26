import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Omega, Grid, Sparkles } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { getRecentSymbols, SYMBOL_CATALOG } from '../../../../../utils/equationPresets';
import { insertSymbolAtSelection } from './equation_subTab/common/mathUtils';
import { SymbolPickerDialog, SymbolDialogTab } from './SymbolPickerDialog';
import { computeAnchoredPopover } from '../../../../../utils/viewportPosition';

export const SymbolTool: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogInitialTab, setDialogInitialTab] = useState<SymbolDialogTab>('symbols');
  const [recentSymbols, setRecentSymbols] = useState<string[]>(() => getRecentSymbols());
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
      preferredWidth: 272,
      fallbackHeight: 300,
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
    if (!isMenuOpen) {
      setRecentSymbols(getRecentSymbols());
    }
    setIsMenuOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    if (!isMenuOpen) return;
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
  }, [isMenuOpen, updatePos]);

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

  const openDialogOnTab = (tab: SymbolDialogTab) => {
    setIsMenuOpen(false);
    setDialogInitialTab(tab);
    setIsDialogOpen(true);
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
              ref={menuRef}
              className="fixed z-[9991] w-[272px] max-w-[calc(100vw-16px)] overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-2.5 overscroll-contain"
              style={menuStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Frequently Used Symbols
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {SYMBOL_CATALOG.length} total
                </span>
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
              <div className="space-y-1.5">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => openDialogOnTab('symbols')}
                  className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700/70 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-xs font-semibold text-slate-700 dark:text-slate-100 transition-colors"
                >
                  <Grid size={13} />
                  <span>More Symbols...</span>
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => openDialogOnTab('special')}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-[11px] font-medium text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <Sparkles size={12} />
                  <span>Special Characters...</span>
                </button>
              </div>
            </div>
          </>,
          document.body
        )}

      <SymbolPickerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialTab={dialogInitialTab}
      />
    </div>
  );
};
