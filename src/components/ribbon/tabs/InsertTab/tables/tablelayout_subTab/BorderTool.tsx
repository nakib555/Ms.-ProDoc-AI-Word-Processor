import React, { useState } from 'react';
import { RibbonButton } from '../../../../common/RibbonButton';
import { MenuPortal } from '../../../../common/MenuPortal';
import { Palette } from 'lucide-react';

const IconBorderAll = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 12h18"/><path d="M12 3v18"/></svg>
);

const IconBorderNone = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16"/><path d="M4 20L20 4"/></svg>
);

const IconBorderOuter = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
);

const IconBorderTop = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18"/><path d="M12 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 12h18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M21 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 21h18" strokeDasharray="2 2" strokeOpacity="0.3"/></svg>
);

const IconBorderBottom = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M12 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 12h18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M21 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 3h18" strokeDasharray="2 2" strokeOpacity="0.3"/></svg>
);

const IconBorderLeft = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18"/><path d="M12 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 12h18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 3h18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M21 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 21h18" strokeDasharray="2 2" strokeOpacity="0.3"/></svg>
);

const IconBorderRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3v18"/><path d="M12 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 12h18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 3v18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 3h18" strokeDasharray="2 2" strokeOpacity="0.3"/><path d="M3 21h18" strokeDasharray="2 2" strokeOpacity="0.3"/></svg>
);

export const BorderTool: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);
  const [borderColor, setBorderColor] = useState('#000000');
  const [borderWidth, setBorderWidth] = useState('1px');

  const closeMenu = () => setActiveMenu(null);
  const toggleMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveMenu(activeMenu === 'border_menu' ? null : 'border_menu');
  };

  const runOnTable = (fn: (table: HTMLTableElement) => void) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      let node = selection.anchorNode as HTMLElement;
      while(node && node.nodeName !== 'TABLE') {
          node = node.parentNode as HTMLElement;
          if (!node || node.nodeName === 'BODY') return;
      }
      if (node) {
          const table = node as HTMLTableElement;
          const editorEl = node.closest('.prodoc-editor');
          fn(table);
          if (editorEl) {
              editorEl.dispatchEvent(new Event('input', { bubbles: true }));
          }
      }
  };

  const setBorder = (side: 'all' | 'top' | 'bottom' | 'left' | 'right' | 'none') => {
      runOnTable((table) => {
          table.classList.add('is-border-updating');
          const cells = table.querySelectorAll('td, th');
          cells.forEach((c) => {
              const cell = c as HTMLTableCellElement;
              const styleStr = `${borderWidth} solid ${borderColor}`;
              if (side === 'none') {
                  cell.style.border = 'none';
              } else if (side === 'all') {
                  cell.style.border = styleStr;
              } else {
                  if (side === 'top') cell.style.borderTop = styleStr;
                  if (side === 'bottom') cell.style.borderBottom = styleStr;
                  if (side === 'left') cell.style.borderLeft = styleStr;
                  if (side === 'right') cell.style.borderRight = styleStr;
              }
          });
          setTimeout(() => {
              table.classList.remove('is-border-updating');
          }, 300);
      });
      closeMenu();
  };

  return (
    <div className="relative flex flex-col h-full" ref={setTriggerElement}>
      <RibbonButton 
        icon={IconBorderOuter} 
        label="Borders" 
        onClick={toggleMenu} 
        hasArrow 
      />
      
      <MenuPortal 
        id="border_menu" 
        activeMenu={activeMenu} 
        triggerElement={triggerElement} 
        closeMenu={closeMenu} 
        width={240}
      >
        <div className="p-2 flex flex-col gap-1 text-sm">
            <div className="font-semibold text-slate-700 dark:text-slate-300 px-2 pb-1 text-[10px] uppercase tracking-wider">Apply Borders</div>
            
            <div className="grid grid-cols-2 gap-1 mb-2">
                <button onClick={() => setBorder('all')} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs transition-colors">
                    <IconBorderAll size={14} /> All
                </button>
                <button onClick={() => setBorder('none')} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs transition-colors">
                    <IconBorderNone size={14} /> None
                </button>
                <button onClick={() => setBorder('top')} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs transition-colors">
                    <IconBorderTop size={14} /> Top
                </button>
                <button onClick={() => setBorder('bottom')} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs transition-colors">
                    <IconBorderBottom size={14} /> Bottom
                </button>
                <button onClick={() => setBorder('left')} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs transition-colors">
                    <IconBorderLeft size={14} /> Left
                </button>
                <button onClick={() => setBorder('right')} className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs transition-colors">
                    <IconBorderRight size={14} /> Right
                </button>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-700 my-1 mx-2"></div>
            <div className="font-semibold text-slate-700 dark:text-slate-300 px-2 py-1 text-[10px] uppercase tracking-wider">Border Style</div>
            
            <div className="px-2 py-1 flex items-center justify-between">
                <label className="text-xs text-slate-600 dark:text-slate-400">Width:</label>
                <select 
                    value={borderWidth} 
                    onChange={(e) => setBorderWidth(e.target.value)}
                    className="border border-slate-200 dark:border-slate-600 rounded px-1 py-0.5 text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 w-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="1px">1px</option>
                    <option value="2px">2px</option>
                    <option value="3px">3px</option>
                    <option value="4px">4px</option>
                </select>
            </div>

            <div className="px-2 py-1 flex items-center justify-between">
                <label className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1"><Palette size={12}/> Color:</label>
                <input 
                    type="color" 
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-20 h-6 p-0 border-0 rounded cursor-pointer"
                />
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-700 my-1 mx-2"></div>
            <div className="font-semibold text-slate-700 dark:text-slate-300 px-2 py-1 text-[10px] uppercase tracking-wider">Preview</div>
            <div className="mx-2 my-1 p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-md flex items-center justify-center">
                <div 
                    className="w-full py-3.5 bg-white dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 font-medium text-center rounded shadow-sm transition-all duration-150"
                    style={{
                        border: `${borderWidth} solid ${borderColor}`,
                    }}
                >
                    Border Preview ({borderWidth})
                </div>
            </div>
        </div>
      </MenuPortal>
    </div>
  );
};
