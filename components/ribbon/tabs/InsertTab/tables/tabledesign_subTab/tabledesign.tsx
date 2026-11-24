
import React, { useState, useEffect } from 'react';
import { RibbonSection } from '../../../../common/RibbonSection';
import { RibbonButton } from '../../../../common/RibbonButton';
import { CheckboxItem } from '../../../ViewTab/common/ViewTools';
import { PaintBucket, PenTool, LayoutGrid, ChevronDown } from 'lucide-react';
import {
  applyTableDesignOptions,
  getSelectedTableCells,
  TableDesignOptionsState,
  TABLE_DESIGN_THEMES,
} from '../../../../../../utils/tableUtils';

const COLORS = [
  'transparent', '#ffffff', '#000000', '#f1f5f9', '#cbd5e1',
  '#94a3b8', '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#ec4899',
];

const BORDER_LINE_STYLES: Array<{ label: string; value: 'solid' | 'dashed' | 'dotted' | 'double' }> = [
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
  { label: 'Double', value: 'double' },
];

const BORDER_WIDTHS = [
  { label: '½ pt', value: '1px' },
  { label: '1½ pt', value: '2px' },
  { label: '2¼ pt', value: '3px' },
  { label: '3 pt', value: '4px' },
];

export const TableDesignTab: React.FC = () => {
  const [options, setOptions] = useState<TableDesignOptionsState>({
    headerRow: true,
    firstColumn: false,
    totalRow: false,
    lastColumn: false,
    bandedRows: true,
    bandedCols: false,
  });
  const [activeTheme, setActiveTheme] = useState<string>('slate');
  const [openMenu, setOpenMenu] = useState<'styles' | 'shading' | 'lineStyle' | 'lineWidth' | 'borders' | null>(null);
  const [borderStyle, setBorderStyle] = useState<'solid' | 'dashed' | 'dotted' | 'double'>('solid');
  const [borderWidth, setBorderWidth] = useState<string>('1px');
  const [borderColor] = useState<string>('#334155');
  const [borderPainterActive, setBorderPainterActive] = useState<boolean>(false);

  const getActiveCellAndTable = (): { cell: HTMLTableCellElement | null; table: HTMLTableElement | null } => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return { cell: null, table: null };
    const anchor = selection.anchorNode;
    const el = anchor?.nodeType === Node.ELEMENT_NODE ? (anchor as HTMLElement) : anchor?.parentElement;
    const cell = (el?.closest('td, th') as HTMLTableCellElement | null) || null;
    const table = (el?.closest('table') as HTMLTableElement | null) || null;
    return { cell, table };
  };

  const emitEditorInput = (el: Element | null) => {
    const editorEl = el?.closest('.prodoc-editor') as HTMLElement | null;
    if (editorEl) {
      editorEl.dataset.commitImmediate = 'true';
      editorEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const runOnTable = (fn: (table: HTMLTableElement) => void) => {
    const { table } = getActiveCellAndTable();
    if (!table) return;
    fn(table);
    emitEditorInput(table);
  };

  const toggleOption = (key: keyof TableDesignOptionsState) => {
    const next = { ...options, [key]: !options[key] };
    setOptions(next);
    runOnTable((table) => {
      const themeKey = table.getAttribute('data-table-theme') || activeTheme;
      applyTableDesignOptions(table, next, themeKey);
    });
  };

  const applyThemePreset = (themeKey: string) => {
    setActiveTheme(themeKey);
    setOpenMenu(null);
    runOnTable((table) => {
      applyTableDesignOptions(table, options, themeKey);
    });
  };

  const handleShading = (color: string) => {
    const { cell, table } = getActiveCellAndTable();
    if (!cell || !table) return;
    const selected = getSelectedTableCells(table);
    const targets = selected.length > 0 ? selected : [cell];
    targets.forEach((c) => {
      c.style.backgroundColor = color === 'transparent' ? '' : color;
    });
    emitEditorInput(table);
    setOpenMenu(null);
  };

  const applyBorderMode = (mode: 'all' | 'outside' | 'inside' | 'topBottom' | 'none') => {
    const { cell, table } = getActiveCellAndTable();
    if (!cell || !table) return;
    const rule = mode === 'none' ? 'none' : `${borderWidth} ${borderStyle} ${borderColor}`;
    const selected = getSelectedTableCells(table);
    const targets = selected.length > 1 ? selected : (Array.from(table.querySelectorAll('td, th')) as HTMLTableCellElement[]);

    if (mode === 'all' || mode === 'none') {
      targets.forEach((c) => {
        c.style.border = rule;
      });
    } else if (mode === 'topBottom') {
      targets.forEach((c) => {
        c.style.border = 'none';
        c.style.borderTop = rule;
        c.style.borderBottom = rule;
      });
    } else if (mode === 'outside') {
      const rows = Array.from(table.rows);
      rows.forEach((row, rIdx) => {
        const cells = Array.from(row.cells);
        cells.forEach((c, cIdx) => {
          c.style.border = 'none';
          if (rIdx === 0) c.style.borderTop = rule;
          if (rIdx === rows.length - 1) c.style.borderBottom = rule;
          if (cIdx === 0) c.style.borderLeft = rule;
          if (cIdx === cells.length - 1) c.style.borderRight = rule;
        });
      });
    } else if (mode === 'inside') {
      const rows = Array.from(table.rows);
      rows.forEach((row, rIdx) => {
        const cells = Array.from(row.cells);
        cells.forEach((c, cIdx) => {
          c.style.border = rule;
          if (rIdx === 0) c.style.borderTop = 'none';
          if (rIdx === rows.length - 1) c.style.borderBottom = 'none';
          if (cIdx === 0) c.style.borderLeft = 'none';
          if (cIdx === cells.length - 1) c.style.borderRight = 'none';
        });
      });
    }

    emitEditorInput(table);
    setOpenMenu(null);
  };

  // Interactive Border Painter Mode
  useEffect(() => {
    if (!borderPainterActive) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const cell = target?.closest('.prodoc-editor td, .prodoc-editor th') as HTMLTableCellElement | null;
      if (!cell) return;
      cell.style.border = `${borderWidth} ${borderStyle} ${borderColor}`;
      emitEditorInput(cell);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBorderPainterActive(false);
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, [borderPainterActive, borderStyle, borderWidth, borderColor]);

  return (
    <>
      <RibbonSection title="Table Style Options">
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 px-1 h-full items-center">
            <CheckboxItem label="Header Row" checked={options.headerRow} onChange={() => toggleOption('headerRow')} />
            <CheckboxItem label="First Column" checked={options.firstColumn} onChange={() => toggleOption('firstColumn')} />
            <CheckboxItem label="Total Row" checked={options.totalRow} onChange={() => toggleOption('totalRow')} />
            <CheckboxItem label="Last Column" checked={options.lastColumn} onChange={() => toggleOption('lastColumn')} />
            <CheckboxItem label="Banded Rows" checked={options.bandedRows} onChange={() => toggleOption('bandedRows')} />
            <CheckboxItem label="Banded Columns" checked={options.bandedCols} onChange={() => toggleOption('bandedCols')} />
        </div>
      </RibbonSection>

      <RibbonSection title="Table Styles">
         <div className="relative flex items-center gap-1.5 h-full px-1">
             <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyThemePreset('grid')} title="Plain Table Grid" className={`h-14 w-14 border bg-white hover:ring-2 ring-blue-400 grid grid-rows-4 p-1 gap-[1px] rounded ${activeTheme === 'grid' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-300'}`}>
                 <div className="border border-slate-700 row-span-1"></div>
                 <div className="border border-slate-400 row-span-1"></div>
                 <div className="border border-slate-400 row-span-1"></div>
                 <div className="border border-slate-400 row-span-1"></div>
             </button>
             <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyThemePreset('slate')} title="Slate Header" className={`h-14 w-14 border bg-white hover:ring-2 ring-blue-400 grid grid-rows-4 p-1 gap-[1px] rounded ${activeTheme === 'slate' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-300'}`}>
                 <div className="bg-slate-800 row-span-1"></div>
                 <div className="bg-slate-100 row-span-1"></div>
                 <div className="bg-white row-span-1"></div>
                 <div className="bg-slate-100 row-span-1"></div>
             </button>
             <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyThemePreset('blue')} title="Accent Blue" className={`h-14 w-14 border bg-white hover:ring-2 ring-blue-400 grid grid-rows-4 p-1 gap-[1px] rounded ${activeTheme === 'blue' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-300'}`}>
                 <div className="bg-blue-600 row-span-1"></div>
                 <div className="bg-blue-50 row-span-1"></div>
                 <div className="bg-white row-span-1"></div>
                 <div className="bg-blue-50 row-span-1"></div>
             </button>
             <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyThemePreset('orange')} title="Accent Orange" className={`h-14 w-14 border bg-white hover:ring-2 ring-blue-400 grid grid-rows-4 p-1 gap-[1px] rounded ${activeTheme === 'orange' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-300'}`}>
                 <div className="bg-orange-600 row-span-1"></div>
                 <div className="bg-orange-50 row-span-1"></div>
                 <div className="bg-white row-span-1"></div>
                 <div className="bg-orange-50 row-span-1"></div>
             </button>
             <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyThemePreset('emerald')} title="Accent Emerald" className={`h-14 w-14 border bg-white hover:ring-2 ring-blue-400 grid grid-rows-4 p-1 gap-[1px] rounded ${activeTheme === 'emerald' ? 'ring-2 ring-blue-500 border-blue-500' : 'border-slate-300'}`}>
                 <div className="bg-teal-700 row-span-1"></div>
                 <div className="bg-teal-50 row-span-1"></div>
                 <div className="bg-white row-span-1"></div>
                 <div className="bg-teal-50 row-span-1"></div>
             </button>

             <button onMouseDown={(e) => e.preventDefault()} onClick={() => setOpenMenu(openMenu === 'styles' ? null : 'styles')} className="h-14 w-6 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded" title="More Table Styles">
                 <ChevronDown size={12} className="dark:text-slate-400" />
             </button>

             {openMenu === 'styles' && (
               <>
                 <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                 <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-1.5 z-50">
                   {Object.keys(TABLE_DESIGN_THEMES).map((key) => (
                     <button
                       key={key}
                       onMouseDown={(e) => e.preventDefault()}
                       onClick={() => applyThemePreset(key)}
                       className={`w-full text-left px-2.5 py-1.5 rounded text-xs capitalize flex items-center justify-between ${activeTheme === key ? 'bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/30 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                     >
                       <span>{key} Table</span>
                       <span className="w-3.5 h-3.5 rounded border border-slate-300" style={{ backgroundColor: TABLE_DESIGN_THEMES[key].headerBg === 'transparent' ? '#ffffff' : TABLE_DESIGN_THEMES[key].headerBg }} />
                     </button>
                   ))}
                 </div>
               </>
             )}
         </div>
      </RibbonSection>

      <RibbonSection title="Borders">
          <div className="flex items-center gap-2 h-full px-1">
              <div className="flex flex-col gap-1 relative">
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    className="flex items-center gap-2 px-1.5 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-xs dark:text-slate-300"
                    onClick={() => setOpenMenu(openMenu === 'shading' ? null : 'shading')}
                  >
                      <PaintBucket size={14} className="text-blue-600 dark:text-blue-400"/> 
                      <span className="text-[10px] font-medium">Shading</span>
                      <ChevronDown size={10} className="text-slate-400" />
                  </button>

                  {openMenu === 'shading' && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                      <div className="absolute top-7 left-0 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-2 z-50">
                        <div className="text-[10px] font-bold uppercase text-slate-400 mb-1.5">Cell Shading</div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {COLORS.map((c) => (
                            <button
                              key={c}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleShading(c)}
                              title={c === 'transparent' ? 'No Fill' : c}
                              className="w-6 h-6 rounded border border-slate-300 dark:border-slate-600 hover:scale-110 transition-transform flex items-center justify-center text-[9px]"
                              style={{ backgroundColor: c === 'transparent' ? '#ffffff' : c }}
                            >
                              {c === 'transparent' ? '×' : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-1">
                    <div className="relative">
                      <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setOpenMenu(openMenu === 'lineStyle' ? null : 'lineStyle')}
                        className="flex items-center gap-1 border px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                        title="Pen Style"
                      >
                        <div className="w-7 h-0 border-t-2 border-slate-800 dark:border-slate-200" style={{ borderTopStyle: borderStyle }} />
                        <ChevronDown size={10} className="dark:text-slate-400" />
                      </button>
                      {openMenu === 'lineStyle' && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                          <div className="absolute top-full left-0 mt-1 w-28 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-1 z-50">
                            {BORDER_LINE_STYLES.map((item) => (
                              <button
                                key={item.value}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => { setBorderStyle(item.value); setOpenMenu(null); }}
                                className={`w-full px-2 py-1 text-left text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${borderStyle === item.value ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-200'}`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setOpenMenu(openMenu === 'lineWidth' ? null : 'lineWidth')}
                        className="flex items-center gap-1 border px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
                        title="Line Weight"
                      >
                        <span className="text-[10px] dark:text-slate-300">
                          {BORDER_WIDTHS.find((w) => w.value === borderWidth)?.label || '½ pt'}
                        </span>
                        <ChevronDown size={10} className="dark:text-slate-400" />
                      </button>
                      {openMenu === 'lineWidth' && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                          <div className="absolute top-full left-0 mt-1 w-24 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl p-1 z-50">
                            {BORDER_WIDTHS.map((w) => (
                              <button
                                key={w.value}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => { setBorderWidth(w.value); setOpenMenu(null); }}
                                className={`w-full px-2 py-1 text-left text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${borderWidth === w.value ? 'font-bold text-blue-600' : 'text-slate-700 dark:text-slate-200'}`}
                              >
                                {w.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
              </div>
              
              <div className="relative flex flex-col items-center justify-center px-2 border-l border-slate-100 dark:border-slate-700">
                  <RibbonButton
                    icon={LayoutGrid}
                    label="Borders"
                    onClick={() => setOpenMenu(openMenu === 'borders' ? null : 'borders')}
                    hasArrow
                  />
                  {openMenu === 'borders' && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                      <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 z-50">
                        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyBorderMode('all')} className="w-full px-3 py-1.5 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">All Borders</button>
                        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyBorderMode('outside')} className="w-full px-3 py-1.5 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Outside Borders</button>
                        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyBorderMode('inside')} className="w-full px-3 py-1.5 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Inside Borders</button>
                        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyBorderMode('topBottom')} className="w-full px-3 py-1.5 text-left text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700">Top &amp; Bottom</button>
                        <div className="my-1 border-t border-slate-100 dark:border-slate-700" />
                        <button onMouseDown={(e) => e.preventDefault()} onClick={() => applyBorderMode('none')} className="w-full px-3 py-1.5 text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">No Border</button>
                      </div>
                    </>
                  )}
              </div>
              
              <div className="flex flex-col items-center justify-center px-2 border-l border-slate-100 dark:border-slate-700">
                  <RibbonButton
                    icon={PenTool}
                    label="Border Painter"
                    active={borderPainterActive}
                    title={borderPainterActive ? 'Click any cell to paint border (Esc to exit)' : 'Paint Cell Borders'}
                    onClick={() => setBorderPainterActive((p) => !p)}
                  />
              </div>
          </div>
      </RibbonSection>
    </>
  );
};

export default TableDesignTab;


