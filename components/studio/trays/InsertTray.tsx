import React, { useState, useRef } from 'react';
import { 
  Table as TableIcon, Image as ImageIcon, Link as LinkIcon, 
  SplitSquareVertical, Minus, Sigma, Sparkles, Quote, Code
} from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioDivider } from '../common/StudioDivider';
import { StudioDropdown } from '../common/StudioDropdown';

const SYMBOLS = ['©', '®', '™', '§', '¶', '°', '±', '≠', '≈', '÷', '×', '€', '£', '¥', '¢', '•', '—', '–', '→', '←', '✓', '★'];

export const InsertTray: React.FC = () => {
  const { executeCommand } = useEditor();
  const [hoveredGrid, setHoveredGrid] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const src = loadEvent.target?.result as string;
        if (src) {
          executeCommand('insertImage', src);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleInsertLink = () => {
    const url = window.prompt('Enter hyperlink URL (e.g. https://example.com):', 'https://');
    if (url && url !== 'https://') {
      executeCommand('createLink', url);
    }
  };

  const handleInsertSymbol = (symbol: string) => {
    executeCommand('insertText', symbol);
  };

  const handleInsertEquation = () => {
    // Inserts math-field node or latex span
    const mathHtml = '<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type formula here.">x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}</math-field><span class="equation-dropdown">▼</span></span>&nbsp;';
    executeCommand('insertHTML', mathHtml);
  };

  const handleInsertPageBreak = () => {
    executeCommand('insertHTML', '<div style="page-break-after: always; break-after: page; height: 1px; border-bottom: 1px dashed #cbd5e1; margin: 1.5rem 0;" data-page-break="true"></div><p><br></p>');
  };

  const handleInsertDivider = () => {
    executeCommand('insertHTML', '<hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 1rem 0;" /><p><br></p>');
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      <input 
        type="file" 
        ref={imageInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Table Popover */}
      <StudioDropdown
        icon={TableIcon}
        label="Table"
        size="sm"
        title="Insert Table Grid"
        customContent={(close) => (
          <div className="p-3 w-56">
            <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center justify-between">
              <span>Insert Table</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                {hoveredGrid.r > 0 ? `${hoveredGrid.c} × ${hoveredGrid.r}` : 'Choose grid'}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-md border border-slate-200 dark:border-slate-700">
              {Array.from({ length: 6 }).map((_, rIdx) =>
                Array.from({ length: 6 }).map((_, cIdx) => {
                  const r = rIdx + 1;
                  const c = cIdx + 1;
                  const isHovered = r <= hoveredGrid.r && c <= hoveredGrid.c;
                  return (
                    <button
                      key={`${r}-${c}`}
                      onMouseEnter={() => setHoveredGrid({ r, c })}
                      onClick={() => {
                        executeCommand('insertTable', JSON.stringify({ rows: r, cols: c }));
                        close();
                      }}
                      className={`
                        w-6 h-6 rounded-xs border transition-all cursor-pointer
                        ${isHovered 
                          ? 'bg-indigo-500 border-indigo-600' 
                          : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'
                        }
                      `}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
      />

      {/* Picture Button */}
      <StudioButton
        icon={ImageIcon}
        label="Image"
        onClick={() => imageInputRef.current?.click()}
        title="Insert Image from Computer"
        size="sm"
      />

      {/* Link Button */}
      <StudioButton
        icon={LinkIcon}
        label="Link"
        onClick={handleInsertLink}
        title="Insert Link"
        shortcut="Ctrl+K"
        size="sm"
      />

      <StudioDivider />

      {/* Page Break */}
      <StudioButton
        icon={SplitSquareVertical}
        label="Page Break"
        onClick={handleInsertPageBreak}
        title="Insert Page Break"
        size="sm"
      />

      {/* Horizontal Divider */}
      <StudioButton
        icon={Minus}
        label="Divider"
        onClick={handleInsertDivider}
        title="Insert Horizontal Line"
        size="sm"
      />

      <StudioDivider />

      {/* Math Equation */}
      <StudioButton
        icon={Sigma}
        label="Equation"
        onClick={handleInsertEquation}
        title="Insert Mathematical Formula"
        size="sm"
      />

      {/* Special Symbols Dropdown */}
      <StudioDropdown
        icon={Sparkles}
        label="Symbols"
        size="sm"
        title="Insert Special Characters"
        customContent={(close) => (
          <div className="p-2.5 w-52">
            <div className="text-[11px] font-semibold text-slate-500 mb-2">Special Characters</div>
            <div className="grid grid-cols-6 gap-1">
              {SYMBOLS.map(sym => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => {
                    handleInsertSymbol(sym);
                    close();
                  }}
                  className="w-7 h-7 flex items-center justify-center rounded text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700 cursor-pointer"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        )}
      />

      <StudioDivider />

      {/* Quotes & Code */}
      <StudioButton
        icon={Quote}
        onClick={() => executeCommand('formatBlock', '<blockquote>')}
        title="Insert Callout / Blockquote"
        size="sm"
      />
      <StudioButton
        icon={Code}
        onClick={() => executeCommand('formatBlock', '<pre>')}
        title="Insert Code Block"
        size="sm"
      />
    </div>
  );
};
