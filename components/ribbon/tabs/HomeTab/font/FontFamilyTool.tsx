import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Check, Clock } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { MenuPortal } from '../../../common/MenuPortal';
import { FONTS } from '../../../../../constants';

const RECENT_FONTS_KEY = 'prodoc_recent_fonts';

const loadRecentFonts = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENT_FONTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((f): f is string => typeof f === 'string').slice(0, 4) : [];
  } catch {
    return [];
  }
};

export const FontFamilyTool: React.FC = () => {
  const { applyAdvancedStyle, editorRef, editor } = useEditor();
  const { activeMenu, toggleMenu, closeMenu, menuPos, triggerElement, registerTrigger } = useHomeTab();
  const [currentFont, setCurrentFont] = useState('Inter');
  const [inputValue, setInputValue] = useState('Inter');
  const [isMixed, setIsMixed] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1);
  const [recentFonts, setRecentFonts] = useState<string[]>(loadRecentFonts);
  const menuId = 'font_family';
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpen = activeMenu === menuId;

  // Track selection to update font indicator
  useEffect(() => {
    const handleSelectionChange = () => {
      try {
        const tiptapFont = editor?.getAttributes('textStyle')?.fontFamily;
        if (typeof tiptapFont === 'string' && tiptapFont.trim()) {
          const clean = tiptapFont.split(',')[0].trim().replace(/['"]/g, '');
          if (document.activeElement !== inputRef.current) {
            setCurrentFont(clean);
            setInputValue(clean);
            setIsMixed(false);
            setIsFiltering(false);
          }
          return;
        }
      } catch {
        // ignore
      }

      try {
        const font = document.queryCommandValue('fontName');
        if (font) {
          const cleanFont = font.replace(/['"]/g, '');
          if (document.activeElement !== inputRef.current) {
            setCurrentFont(cleanFont);
            setInputValue(cleanFont);
            setIsMixed(false);
            setIsFiltering(false);
          }
          return;
        }
      } catch {
        // ignore
      }

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      let node = selection.anchorNode;
      if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;

      if (editorRef.current && node && editorRef.current.contains(node)) {
        const computed = window.getComputedStyle(node as HTMLElement);
        const font = computed.fontFamily.split(',')[0].trim().replace(/['"]/g, '');

        if (document.activeElement !== inputRef.current) {
          setCurrentFont(font);
          setInputValue(font);
          setIsMixed(false);
          setIsFiltering(false);
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);
    editor?.on('selectionUpdate', handleSelectionChange);
    editor?.on('transaction', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
      editor?.off('selectionUpdate', handleSelectionChange);
      editor?.off('transaction', handleSelectionChange);
    };
  }, [editorRef, editor]);

  const filteredFonts = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!isFiltering || !q) return FONTS;
    return FONTS.filter((f) => f.toLowerCase().includes(q));
  }, [inputValue, isFiltering]);

  const visibleRecentFonts = useMemo(() => {
    if (isFiltering && inputValue.trim()) return [];
    return recentFonts.filter((f) => FONTS.includes(f));
  }, [recentFonts, isFiltering, inputValue]);

  const handleSelect = (font: string) => {
    applyAdvancedStyle({ fontFamily: font });
    setInputValue(font);
    setCurrentFont(font);
    setIsMixed(false);
    setIsFiltering(false);
    setHighlightedIdx(-1);

    setRecentFonts((prev) => {
      const next = [font, ...prev.filter((f) => f !== font)].slice(0, 4);
      try {
        localStorage.setItem(RECENT_FONTS_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });

    closeMenu();
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        toggleMenu(menuId);
        setHighlightedIdx(0);
      } else if (filteredFonts.length > 0) {
        setHighlightedIdx((prev) => (prev < filteredFonts.length - 1 ? prev + 1 : 0));
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen && filteredFonts.length > 0) {
        setHighlightedIdx((prev) => (prev > 0 ? prev - 1 : filteredFonts.length - 1));
      }
      return;
    }

    if (e.key === 'Escape') {
      setIsFiltering(false);
      setInputValue(currentFont);
      setHighlightedIdx(-1);
      if (isOpen) closeMenu();
      inputRef.current?.blur();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const chosen =
        highlightedIdx >= 0 && filteredFonts[highlightedIdx]
          ? filteredFonts[highlightedIdx]
          : filteredFonts.length === 1 && isFiltering
          ? filteredFonts[0]
          : inputValue.trim() || currentFont;
      handleSelect(chosen);
    }
  };

  return (
    <>
      <div
        ref={(el) => registerTrigger(menuId, el)}
        className={`flex items-center border rounded-md h-[26px] sm:h-[28px] lg:h-[30px] w-28 sm:w-32 lg:w-40 bg-white dark:bg-slate-800 transition-all group relative ${
          isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-500'
        }`}
        title="Font Family (Ctrl+Shift+F)"
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-label="Font Family"
          value={inputValue}
          placeholder={isMixed ? 'Mixed' : undefined}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsMixed(false);
            setIsFiltering(true);
            setHighlightedIdx(0);
            if (!isOpen) toggleMenu(menuId);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => inputRef.current?.select()}
          onBlur={() => {
            setTimeout(() => {
              if (!isOpen && !isMixed) {
                setIsFiltering(false);
                setInputValue(currentFont);
              }
            }, 120);
          }}
          className="w-full h-full px-1.5 sm:px-2 text-[11px] sm:text-xs outline-none text-slate-700 dark:text-slate-200 font-medium bg-transparent leading-tight rounded-l-md truncate"
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            setIsFiltering(false);
            setHighlightedIdx(-1);
            toggleMenu(menuId);
          }}
          aria-label="Toggle font family menu"
          className="h-full px-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 border-l border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-700 flex items-center justify-center rounded-r-md transition-colors"
          tabIndex={-1}
        >
          <ChevronDown
            size={12}
            className={`text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300 transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-blue-500' : ''
            }`}
            strokeWidth={2}
          />
        </button>
      </div>

      <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={220} title="Font Family">
        <div className="max-h-[min(320px,62dvh)] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
          {visibleRecentFonts.length > 0 && (
            <>
              <div className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/70 dark:bg-slate-800/60 mb-1 rounded-sm">
                <Clock size={10} />
                <span>Recently Used</span>
              </div>
              {visibleRecentFonts.map((font) => {
                const isSelected = currentFont.toLowerCase() === font.toLowerCase() && !isMixed;
                return (
                  <button
                    key={`recent-${font}`}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isSelected}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(font)}
                    className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300 text-xs transition-colors flex items-center rounded-md ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-200'
                    }`}
                    style={{ fontFamily: font }}
                  >
                    <span className="truncate">{font}</span>
                    {isSelected && <Check size={12} className="ml-auto shrink-0 text-blue-600 dark:text-blue-400" />}
                  </button>
                );
              })}
              <div className="my-1 border-t border-slate-100 dark:border-slate-700/80" />
            </>
          )}

          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/70 dark:bg-slate-800/60 mb-1 rounded-sm">
            {isFiltering && inputValue.trim() ? `Matches (${filteredFonts.length})` : 'Theme & System Fonts'}
          </div>

          {filteredFonts.length === 0 ? (
            <div className="px-3 py-2.5 text-xs text-slate-400 text-center">
              Press Enter to apply &ldquo;{inputValue}&rdquo;
            </div>
          ) : (
            filteredFonts.map((font, idx) => {
              const isSelected = currentFont.toLowerCase() === font.toLowerCase() && !isMixed;
              const isHighlighted = idx === highlightedIdx;
              return (
                <button
                  key={font}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setHighlightedIdx(idx)}
                  onClick={() => handleSelect(font)}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center rounded-md ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                      : isHighlighted
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300'
                  }`}
                  style={{ fontFamily: font }}
                >
                  <span className="truncate">{font}</span>
                  {isSelected && <Check size={12} className="ml-auto shrink-0 text-blue-600 dark:text-blue-400" />}
                </button>
              );
            })
          )}
        </div>
      </MenuPortal>
    </>
  );
};
