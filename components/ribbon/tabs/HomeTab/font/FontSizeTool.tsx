import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, AArrowUp, AArrowDown, Check } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { MenuPortal } from '../../../common/MenuPortal';
import { ToolBtn } from '../common/HomeTools';
import { ptToPx, pxToPt } from '../../../../../utils/textUtils';

const STD_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];

export const FontSizeTool: React.FC = () => {
  const { applyAdvancedStyle, editorRef, editor } = useEditor();
  const { activeMenu, toggleMenu, closeMenu, menuPos, triggerElement, registerTrigger } = useHomeTab();
  const [currentFontSize, setCurrentFontSize] = useState('11');
  const [inputValue, setInputValue] = useState('11');
  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1);
  const menuId = 'font_size';
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpen = activeMenu === menuId;

  // Track selection
  useEffect(() => {
    const handleSelectionChange = () => {
      try {
        const tiptapSize = editor?.getAttributes('textStyle')?.fontSize;
        if (typeof tiptapSize === 'string' && tiptapSize) {
          const val = parseFloat(tiptapSize);
          if (!isNaN(val)) {
            const pt = tiptapSize.endsWith('pt') ? Math.round(val) : Math.round(pxToPt(val));
            if (document.activeElement !== inputRef.current) {
              setCurrentFontSize(String(pt));
              setInputValue(String(pt));
            }
            return;
          }
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
        const sizePx = computed.fontSize;
        if (sizePx) {
          const sizeValPx = parseFloat(sizePx);
          const sizeValPt = pxToPt(sizeValPx);
          const valStr = Math.round(sizeValPt).toString();

          if (document.activeElement !== inputRef.current) {
            setCurrentFontSize(valStr);
            setInputValue(valStr);
          }
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

  const applySize = (size: number | string) => {
    const pt = parseFloat(size.toString());
    if (!isNaN(pt) && pt > 0) {
      const px = ptToPx(pt);
      applyAdvancedStyle({ fontSize: `${px}px` });
      setInputValue(pt.toString());
      setCurrentFontSize(pt.toString());
    }
    setHighlightedIdx(-1);
    closeMenu();
    inputRef.current?.blur();
  };

  const handleGrow = () => {
    const current = parseFloat(currentFontSize) || 11;
    const next = STD_SIZES.find((s) => s > current) || current + 1;
    applySize(next);
  };

  const handleShrink = () => {
    const current = parseFloat(currentFontSize) || 11;
    const prev = [...STD_SIZES].reverse().find((s) => s < current) || Math.max(1, current - 1);
    applySize(prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        toggleMenu(menuId);
        const curIdx = STD_SIZES.indexOf(parseInt(currentFontSize, 10));
        setHighlightedIdx(curIdx >= 0 ? curIdx : 0);
      } else {
        setHighlightedIdx((prev) => (prev < STD_SIZES.length - 1 ? prev + 1 : 0));
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (isOpen) {
        setHighlightedIdx((prev) => (prev > 0 ? prev - 1 : STD_SIZES.length - 1));
      }
      return;
    }

    if (e.key === 'Escape') {
      setInputValue(currentFontSize);
      setHighlightedIdx(-1);
      if (isOpen) closeMenu();
      inputRef.current?.blur();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const sizeToApply = highlightedIdx >= 0 ? STD_SIZES[highlightedIdx] : inputValue;
      applySize(sizeToApply);
    }
  };

  return (
    <>
      <div
        ref={(el) => registerTrigger(menuId, el)}
        className={`flex items-center border rounded-md h-[28px] w-16 bg-white dark:bg-slate-800 transition-all group relative ${
          isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-500'
        }`}
        title="Font Size (Points)"
      >
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Font Size"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputRef.current?.select()}
          onBlur={() => {
            setTimeout(() => {
              if (!isOpen) setInputValue(currentFontSize);
            }, 120);
          }}
          className="w-full h-full px-1.5 text-xs tabular-nums outline-none text-slate-700 dark:text-slate-200 font-medium bg-transparent text-center leading-tight rounded-l-md"
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            setHighlightedIdx(-1);
            toggleMenu(menuId);
          }}
          aria-label="Toggle font size menu"
          className="h-full px-1 hover:bg-slate-100 dark:hover:bg-slate-700 border-l border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-700 flex items-center justify-center rounded-r-md transition-colors"
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

      <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={86} title="Font Size">
        <div className="max-h-[300px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
          {STD_SIZES.map((size, idx) => {
            const isSelected = parseInt(currentFontSize, 10) === size;
            const isHighlighted = idx === highlightedIdx;
            return (
              <button
                key={size}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlightedIdx(idx)}
                onClick={() => applySize(size)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs tabular-nums transition-colors rounded-md ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : isHighlighted
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-700 dark:hover:text-blue-300'
                }`}
              >
                <span>{size}</span>
                {isSelected && <Check size={11} className="text-blue-600 dark:text-blue-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </MenuPortal>

      <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-0.5" />

      <ToolBtn
        icon={AArrowUp}
        onClick={handleGrow}
        title="Increase Font Size (Ctrl+>)"
        className="text-slate-700 dark:text-slate-200"
      />

      <ToolBtn
        icon={AArrowDown}
        onClick={handleShrink}
        title="Decrease Font Size (Ctrl+<)"
        className="text-slate-700 dark:text-slate-200"
      />
    </>
  );
};
