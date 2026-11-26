import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Omega } from 'lucide-react';
import {
  SYMBOL_CATALOG,
  SymbolCategoryName,
  SymbolEntry,
  filterSymbols,
  getRecentSymbols,
} from '../../../../../utils/equationPresets';
import { insertSymbolAtSelection } from './equation_subTab/common/mathUtils';

interface SymbolPickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: Array<'All' | SymbolCategoryName> = [
  'All',
  'Common',
  'Currency & Legal',
  'Greek',
  'Math & Logic',
  'Arrows',
  'Technical & UI',
];

export const SymbolPickerDialog: React.FC<SymbolPickerDialogProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | SymbolCategoryName>('All');
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolEntry>(() => SYMBOL_CATALOG[0]);
  const [recentSymbols, setRecentSymbols] = useState<string[]>(() => getRecentSymbols());

  const filteredSymbols = useMemo(
    () => filterSymbols(searchQuery, activeCategory),
    [searchQuery, activeCategory]
  );

  if (!isOpen || typeof document === 'undefined') return null;

  const handleInsert = (char: string) => {
    insertSymbolAtSelection(char);
    setRecentSymbols(getRecentSymbols());
  };

  const selectByChar = (char: string) => {
    const found = SYMBOL_CATALOG.find((s) => s.char === char);
    if (found) {
      setSelectedSymbol(found);
    } else {
      const cp = char.codePointAt(0) ?? 0;
      setSelectedSymbol({
        char,
        name: `Unicode Symbol (${char})`,
        codepoint: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
        category: 'Common',
      });
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Symbol Picker"
      data-modal-backdrop="true"
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-2 sm:p-4 overscroll-contain"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88dvh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <Omega size={18} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Symbol</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search & Category Tabs */}
        <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 space-y-2.5 shrink-0 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by symbol name, character, or code (e.g. copyright, U+00B0, alpha)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Scrollable Symbol Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4">
          {filteredSymbols.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500 dark:text-slate-400">
              No symbols matched &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-10 gap-1.5">
              {filteredSymbols.map((entry) => {
                const isSelected = selectedSymbol.char === entry.char;
                return (
                  <button
                    key={`${entry.codepoint}-${entry.char}`}
                    type="button"
                    onClick={() => setSelectedSymbol(entry)}
                    onDoubleClick={() => {
                      handleInsert(entry.char);
                      onClose();
                    }}
                    title={`${entry.name} (${entry.codepoint})`}
                    className={`h-10 rounded-lg border text-lg font-serif flex items-center justify-center transition-all select-none ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 ring-2 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/70'
                    }`}
                  >
                    {entry.char}
                  </button>
                );
              })}
            </div>
          )}

          {/* Recently Used Strip */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
              Recently Used Symbols
            </div>
            <div className="flex flex-wrap gap-1">
              {recentSymbols.slice(0, 16).map((ch) => (
                <button
                  key={`recent-${ch}`}
                  type="button"
                  onClick={() => {
                    selectByChar(ch);
                    handleInsert(ch);
                  }}
                  title={`Insert ${ch}`}
                  className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 text-sm font-serif flex items-center justify-center text-slate-800 dark:text-slate-100 transition-colors"
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Inspector + Actions */}
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-2xl font-serif text-slate-900 dark:text-white shrink-0">
              {selectedSymbol.char}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                {selectedSymbol.name}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Unicode: {selectedSymbol.codepoint} · {selectedSymbol.category}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleInsert(selectedSymbol.char)}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
