
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { MenuPortal } from '../../../common/MenuPortal';
import { FONTS } from '../../../../../constants';

export const FontFamilyTool: React.FC = () => {
  const { applyAdvancedStyle, editorRef } = useEditor();
  const { activeMenu, toggleMenu, closeMenu, menuPos, registerTrigger } = useHomeTab();
  const [currentFont, setCurrentFont] = useState('Arial');
  const [inputValue, setInputValue] = useState('Arial');
  const [isMixed, setIsMixed] = useState(false);
  const menuId = 'font_family';
  const inputRef = useRef<HTMLInputElement>(null);

  // Track selection to update font indicator
  useEffect(() => {
    const handleSelectionChange = () => {
        // Method 1: Try document.queryCommandValue first (Standard rich text API)
        // It often handles mixed selections by returning empty string or specific value
        try {
            const font = document.queryCommandValue('fontName');
            if (font) {
                const cleanFont = font.replace(/['"]/g, '');
                setCurrentFont(cleanFont);
                setInputValue(cleanFont);
                setIsMixed(false);
                return;
            }
        } catch (e) {}

        // Method 2: Fallback to computed style of anchor node if command fails or returns nothing
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        
        let node = selection.anchorNode;
        if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
        
        // Ensure selection is inside editor
        if (editorRef.current && node && editorRef.current.contains(node)) {
             const computed = window.getComputedStyle(node as HTMLElement);
             let font = computed.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
             
             // Check for mixed selection manually if range is large? 
             // For performance, we stick to anchor node or queryCommandValue result
             
             if (document.activeElement !== inputRef.current) {
                 setCurrentFont(font);
                 setInputValue(font);
                 setIsMixed(false);
             }
        }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);
    
    return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
        document.removeEventListener('mouseup', handleSelectionChange);
        document.removeEventListener('keyup', handleSelectionChange);
    };
  }, [editorRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          applyAdvancedStyle({ fontFamily: inputValue });
          inputRef.current?.blur();
          closeMenu();
      }
  };

  const handleSelect = (font: string) => {
      applyAdvancedStyle({ fontFamily: font });
      setInputValue(font);
      setCurrentFont(font);
      setIsMixed(false);
      closeMenu();
  };

  return (
    <>
        <div 
            ref={(el) => registerTrigger(menuId, el)}
            className={`flex items-center border rounded-md h-[26px] w-36 bg-white dark:bg-slate-800 transition-colors group relative mx-0.5 ${activeMenu === menuId ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600'}`}
            title="Font Family (Ctrl+Shift+F)"
        >
            <input 
                ref={inputRef}
                type="text"
                value={inputValue}
                placeholder={isMixed ? "" : undefined}
                onChange={(e) => { setInputValue(e.target.value); setIsMixed(false); }}
                onKeyDown={handleKeyDown}
                onFocus={() => inputRef.current?.select()}
                onBlur={() => {
                    if (!isMixed) setInputValue(currentFont);
                }}
                className="w-full h-full px-2 text-xs outline-none text-slate-700 dark:text-slate-200 font-medium bg-transparent leading-tight rounded-l-md"
            />
            <button 
                onMouseDown={(e) => e.preventDefault()} 
                onClick={(e) => { e.stopPropagation(); toggleMenu(menuId); }}
                className="h-full px-1 hover:bg-slate-100 dark:hover:bg-slate-700 border-l border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-700 flex items-center justify-center rounded-r-md transition-colors"
                tabIndex={-1}
            >
                <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400" strokeWidth={2} />
            </button>
        </div>

        <MenuPortal id={menuId} activeMenu={activeMenu} menuPos={menuPos} closeMenu={closeMenu} width={200}>
            <div className="max-h-[300px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-slate-200">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 mb-1 rounded-sm">Theme Fonts</div>
                {FONTS.map(font => (
                    <button
                        key={font}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSelect(font)}
                        className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 hover:text-blue-700 text-xs transition-colors flex items-center group rounded-md ${currentFont === font && !isMixed ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700'}`}
                        style={{ fontFamily: font }}
                    >
                        {font}
                        {currentFont === font && !isMixed && <Check size={12} className="ml-auto text-blue-600"/>}
                    </button>
                ))}
            </div>
        </MenuPortal>
    </>
  );
};
