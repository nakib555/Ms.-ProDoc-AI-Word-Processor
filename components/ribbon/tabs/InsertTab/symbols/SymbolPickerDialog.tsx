import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search, Omega, LayoutGrid, Rows3, Sparkles } from 'lucide-react';
import {
  SYMBOL_CATALOG,
  SYMBOL_CATEGORIES,
  MS_WORD_SPECIAL_CHARACTERS,
  SymbolCategoryName,
  SymbolEntry,
  SpecialCharacterEntry,
  filterSymbols,
  groupSymbolsBySubgroup,
  getRecentSymbols,
  resolveUnicodeHexInput,
} from '../../../../../utils/symbolCatalog';
import { insertSymbolAtSelection } from './equation_subTab/common/mathUtils';

export type SymbolDialogTab = 'symbols' | 'special';
type FontStyleMode = 'serif' | 'sans' | 'mono';

interface SymbolPickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: SymbolDialogTab;
}

const CATEGORIES: Array<'All' | SymbolCategoryName> = ['All', ...SYMBOL_CATEGORIES];

const FONT_STYLE_CLASS: Record<FontStyleMode, string> = {
  serif: 'font-serif',
  sans: 'font-sans',
  mono: 'font-mono',
};

export const SymbolPickerDialog: React.FC<SymbolPickerDialogProps> = ({
  isOpen,
  onClose,
  initialTab = 'symbols',
}) => {
  const [activeTab, setActiveTab] = useState<SymbolDialogTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | SymbolCategoryName>('All');
  const [fontStyle, setFontStyle] = useState<FontStyleMode>('serif');
  const [groupedView, setGroupedView] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolEntry>(() => SYMBOL_CATALOG[0]);
  const [selectedSpecial, setSelectedSpecial] = useState<SpecialCharacterEntry>(
    () => MS_WORD_SPECIAL_CHARACTERS[0]
  );
  const [hexCodeInput, setHexCodeInput] = useState(() => SYMBOL_CATALOG[0].codepoint.replace('U+', ''));
  const [recentSymbols, setRecentSymbols] = useState<string[]>(() => getRecentSymbols());

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setRecentSymbols(getRecentSymbols());
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredSymbols = useMemo(
    () => filterSymbols(searchQuery, activeCategory),
    [searchQuery, activeCategory]
  );

  const groupedSymbols = useMemo(
    () => groupSymbolsBySubgroup(filteredSymbols),
    [filteredSymbols]
  );

  const filteredSpecials = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MS_WORD_SPECIAL_CHARACTERS;
    return MS_WORD_SPECIAL_CHARACTERS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.codepoint.toLowerCase().includes(q) ||
        item.shortcut.toLowerCase().includes(q) ||
        item.char.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleInsertChar = (char: string) => {
    insertSymbolAtSelection(char);
    setRecentSymbols(getRecentSymbols());
  };

  const selectEntry = (entry: SymbolEntry) => {
    setSelectedSymbol(entry);
    setHexCodeInput(entry.codepoint.replace('U+', ''));
  };

  const selectByChar = (char: string) => {
    const found = SYMBOL_CATALOG.find((s) => s.char === char);
    if (found) {
      selectEntry(found);
      return;
    }
    const cp = char.codePointAt(0) ?? 0;
    const hex = cp.toString(16).toUpperCase().padStart(4, '0');
    selectEntry({
      char,
      name: `Unicode Symbol (${char})`,
      codepoint: `U+${hex}`,
      category: 'Common',
      subgroup: 'Custom',
    });
  };

  const handleHexJump = () => {
    const resolved = resolveUnicodeHexInput(hexCodeInput);
    if (resolved) {
      selectEntry(resolved);
    }
  };

  const fontClass = FONT_STYLE_CLASS[fontStyle];
  const currentInsertChar = activeTab === 'symbols' ? selectedSymbol.char : selectedSpecial.char;

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
        className="w-full max-w-3xl max-h-[90dvh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header + MS Word Tabs (Symbols | Special Characters) */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-4 pt-2.5 pb-0 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-1.5 pb-2.5 shrink-0">
              <Omega size={17} className="text-blue-600 dark:text-blue-400" />
              <h2 className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                Symbol
              </h2>
            </div>

            <div className="flex items-center gap-1" role="tablist" aria-label="Symbol Dialog Tabs">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'symbols'}
                onClick={() => setActiveTab('symbols')}
                className={`px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'symbols'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 rounded-t-md'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Symbols ({SYMBOL_CATALOG.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'special'}
                onClick={() => setActiveTab('special')}
                className={`px-2.5 sm:px-3 py-2 text-[11px] sm:text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
                  activeTab === 'special'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 rounded-t-md'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles size={12} />
                <span>Special Characters</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Symbol Picker"
            className="mb-2 p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors shrink-0"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search & MS Word Subset / Font Controls */}
        <div className="px-3 sm:px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 space-y-2 shrink-0 bg-white dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[180px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === 'symbols'
                    ? 'Search name, subgroup, symbol, or hex (e.g. copyright, box, 20B9, alpha)...'
                    : 'Search special characters or shortcuts (e.g. dash, quote, nonbreaking)...'
                }
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {activeTab === 'symbols' && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <select
                  aria-label="Subset"
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value as 'All' | SymbolCategoryName)}
                  className="px-2 py-1.5 text-[11px] font-medium rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      Subset: {cat}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Preview Font"
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value as FontStyleMode)}
                  className="px-2 py-1.5 text-[11px] font-medium rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="serif">Font: Serif (Normal)</option>
                  <option value="sans">Font: Sans-Serif</option>
                  <option value="mono">Font: Monospace</option>
                </select>

                <button
                  type="button"
                  onClick={() => setGroupedView((prev) => !prev)}
                  title={groupedView ? 'Switch to compact ungrouped grid' : 'Group by subgroup'}
                  className={`flex items-center gap-1 px-2 py-1.5 text-[11px] font-medium rounded-lg border transition-colors ${
                    groupedView
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {groupedView ? <Rows3 size={13} /> : <LayoutGrid size={13} />}
                  <span className="hidden sm:inline">{groupedView ? 'Grouped' : 'Compact'}</span>
                </button>
              </div>
            )}
          </div>

          {activeTab === 'symbols' && (
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
          )}
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-4">
          {activeTab === 'symbols' ? (
            <>
              {filteredSymbols.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-500 dark:text-slate-400">
                  No symbols matched &ldquo;{searchQuery}&rdquo;. Try searching by name or entering a hex code below.
                </div>
              ) : groupedView ? (
                <div className="space-y-4">
                  {groupedSymbols.map((section) => (
                    <div key={`${section.category}-${section.group}`} className="space-y-1.5">
                      <div className="flex items-center justify-between px-0.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {activeCategory === 'All' ? `${section.category} · ${section.group}` : section.group}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          {section.items.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-11 gap-1.5">
                        {section.items.map((entry) => {
                          const isSelected = selectedSymbol.char === entry.char;
                          return (
                            <button
                              key={`${entry.category}-${entry.codepoint}-${entry.char}`}
                              type="button"
                              onClick={() => selectEntry(entry)}
                              onDoubleClick={() => {
                                handleInsertChar(entry.char);
                                onClose();
                              }}
                              title={`${entry.name} (${entry.codepoint})${entry.shortcut ? ` — ${entry.shortcut}` : ''}`}
                              className={`h-9 sm:h-10 rounded-lg border text-base sm:text-lg ${fontClass} flex items-center justify-center transition-all select-none ${
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-11 gap-1.5">
                  {filteredSymbols.map((entry) => {
                    const isSelected = selectedSymbol.char === entry.char;
                    return (
                      <button
                        key={`${entry.category}-${entry.codepoint}-${entry.char}`}
                        type="button"
                        onClick={() => selectEntry(entry)}
                        onDoubleClick={() => {
                          handleInsertChar(entry.char);
                          onClose();
                        }}
                        title={`${entry.name} (${entry.codepoint})`}
                        className={`h-9 sm:h-10 rounded-lg border text-base sm:text-lg ${fontClass} flex items-center justify-center transition-all select-none ${
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
              <div className="pt-2.5 border-t border-slate-200 dark:border-slate-700">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Recently Used Symbols
                </div>
                <div className="flex flex-wrap gap-1">
                  {recentSymbols.slice(0, 20).map((ch) => (
                    <button
                      key={`recent-${ch}`}
                      type="button"
                      onClick={() => {
                        selectByChar(ch);
                        handleInsertChar(ch);
                      }}
                      title={`Insert ${ch}`}
                      className={`w-8 h-8 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 text-sm ${fontClass} flex items-center justify-center text-slate-800 dark:text-slate-100 transition-colors`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* MS Word Special Characters Tab */
            <div className="space-y-1.5">
              {filteredSpecials.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-500 dark:text-slate-400">
                  No special characters matched &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                filteredSpecials.map((item) => {
                  const isSelected = selectedSpecial.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedSpecial(item)}
                      onDoubleClick={() => {
                        handleInsertChar(item.char);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 ring-1 ring-blue-500/30'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-base font-serif text-slate-900 dark:text-slate-100 shrink-0">
                          {item.previewLabel || item.char}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {item.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-0.5 shrink-0 text-right">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-mono text-slate-700 dark:text-slate-200">
                          {item.shortcut}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.codepoint}
                          {item.autoCorrect ? ` · ${item.autoCorrect}` : ''}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer Inspector + Unicode Code Input + Actions */}
        <div className="px-3 sm:px-4 py-2.5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div
              className={`w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 flex items-center justify-center text-2xl ${fontClass} text-slate-900 dark:text-white shrink-0`}
            >
              {activeTab === 'symbols'
                ? selectedSymbol.char
                : selectedSpecial.previewLabel || selectedSpecial.char}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                {activeTab === 'symbols' ? selectedSymbol.name : selectedSpecial.name}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                {activeTab === 'symbols'
                  ? `${selectedSymbol.codepoint} · ${selectedSymbol.category} (${selectedSymbol.subgroup})`
                  : `${selectedSpecial.codepoint} · Shortcut: ${selectedSpecial.shortcut}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {activeTab === 'symbols' && (
              <div className="flex items-center gap-1">
                <label
                  htmlFor="symbol-hex-code-input"
                  className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap"
                >
                  Code:
                </label>
                <input
                  id="symbol-hex-code-input"
                  type="text"
                  value={hexCodeInput}
                  onChange={(e) => setHexCodeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleHexJump();
                    }
                  }}
                  onBlur={handleHexJump}
                  placeholder="20AC"
                  className="w-16 px-2 py-1 text-[11px] font-mono rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500 uppercase"
                  title="Enter Unicode hex code (e.g. 20AC) and press Enter"
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => handleInsertChar(currentInsertChar)}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-medium transition-colors"
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
