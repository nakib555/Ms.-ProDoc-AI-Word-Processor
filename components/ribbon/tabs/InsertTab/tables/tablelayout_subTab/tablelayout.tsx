
import React from 'react';
import { RibbonSection } from '../../../../common/RibbonSection';
import { RibbonButton } from '../../../../common/RibbonButton';
import { 
  MousePointer2, Grid, Settings, Eraser, PenLine, Trash2, 
  ArrowUpToLine, ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine,
  Merge, Split, Scaling, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, ArrowDownAZ, Type, Calculator, TableProperties,
  Maximize, Minimize
} from 'lucide-react';
import { useEditor } from '../../../../../../contexts/EditorContext';

export const TableLayoutTab: React.FC = () => {
  const { executeCommand } = useEditor();

  // --- Helper Functions ---
  const runOnCell = (fn: (cell: HTMLTableCellElement) => void) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      let node = selection.anchorNode as HTMLElement;
      while(node && node.nodeName !== 'TD' && node.nodeName !== 'TH') {
          node = node.parentNode as HTMLElement;
          if (!node || node.nodeName === 'BODY') return;
      }
      if (node) fn(node as HTMLTableCellElement);
  };

  const runOnRow = (fn: (row: HTMLTableRowElement) => void) => {
      runOnCell((cell) => {
          const row = cell.parentNode as HTMLTableRowElement;
          if (row) fn(row);
      });
  };

  const runOnTable = (fn: (table: HTMLTableElement) => void) => {
      runOnCell((cell) => {
          const table = cell.closest('table');
          if (table) fn(table);
      });
  };

  // --- Actions ---

  const deleteRow = () => runOnRow((row) => row.remove());
  
  const deleteCol = () => runOnCell((cell) => {
      const row = cell.parentNode as HTMLTableRowElement;
      const table = row.closest('table');
      const index = cell.cellIndex;
      if (table) {
          for (let i = 0; i < table.rows.length; i++) {
              if (table.rows[i].cells[index]) table.rows[i].deleteCell(index);
          }
      }
  });

  const deleteTable = () => runOnTable((table) => table.remove());

  const insertRow = (where: 'above' | 'below') => runOnRow((row) => {
      const newRow = row.parentNode!.insertBefore(row.cloneNode(true), where === 'above' ? row : row.nextSibling);
      Array.from(newRow.childNodes).forEach((c: any) => c.innerHTML = '<br>');
  });

  const insertCol = (where: 'left' | 'right') => runOnCell((cell) => {
      const index = cell.cellIndex;
      const table = cell.closest('table');
      if (!table) return;

      for (let i = 0; i < table.rows.length; i++) {
          const row = table.rows[i];
          // Simple handling: insert at same index. 
          // Note: Complex rowspans/colspans require a more robust matrix engine.
          const targetIndex = where === 'left' ? index : index + 1;
          if (targetIndex <= row.cells.length) {
              const newCell = row.insertCell(targetIndex);
              newCell.innerHTML = '<br>';
              // Copy basic styles from neighbor
              const neighbor = row.cells[index];
              if (neighbor) {
                  newCell.style.border = neighbor.style.border;
                  newCell.style.padding = neighbor.style.padding;
                  newCell.style.backgroundColor = neighbor.style.backgroundColor;
              }
          }
      }
  });

  const mergeCells = () => runOnCell((cell) => {
      const nextSibling = cell.nextElementSibling as HTMLTableCellElement;
      if (nextSibling) {
          const currentColSpan = cell.colSpan || 1;
          const nextColSpan = nextSibling.colSpan || 1;
          cell.colSpan = currentColSpan + nextColSpan;
          
          // Merge content
          if (nextSibling.innerText.trim()) {
              cell.innerHTML += " " + nextSibling.innerHTML;
          }
          nextSibling.remove();
      }
  });

  const splitCells = () => runOnCell((cell) => {
      const colspan = cell.colSpan;
      if (colspan > 1) {
          // If currently spanned, reduce span and insert new cell
          cell.colSpan = Math.floor(colspan / 2);
          const newCell = cell.cloneNode(true) as HTMLTableCellElement;
          newCell.colSpan = Math.ceil(colspan / 2);
          newCell.innerHTML = "<br>"; 
          cell.parentNode?.insertBefore(newCell, cell.nextSibling);
      } else {
          // Split a standard cell: This forces a table structure change or insert
          // Simple approach: Insert a new cell next to it.
          const newCell = cell.cloneNode(true) as HTMLTableCellElement;
          newCell.innerHTML = "<br>";
          cell.parentNode?.insertBefore(newCell, cell.nextSibling);
      }
  });

  const splitTable = () => runOnRow((row) => {
      const table = row.closest('table');
      if (!table) return;
      
      const rowIndex = row.rowIndex;
      if (rowIndex === 0) return; // Can't split at top

      const newTable = table.cloneNode(false) as HTMLTableElement; // Clone structure/styles only
      
      // Move rows to new table
      const rows = Array.from(table.rows);
      for (let i = rowIndex; i < rows.length; i++) {
          newTable.appendChild(rows[i]);
      }

      // Insert spacing and new table
      const spacer = document.createElement('p');
      spacer.innerHTML = '<br>';
      table.parentNode?.insertBefore(spacer, table.nextSibling);
      table.parentNode?.insertBefore(newTable, spacer.nextSibling);
  });

  const setAlign = (vertical: string, horizontal: string) => runOnCell((cell) => {
      cell.style.verticalAlign = vertical;
      cell.style.textAlign = horizontal;
  });

  const setTextDirection = () => runOnCell((cell) => {
      const current = cell.style.writingMode;
      if (current === 'vertical-rl') {
          cell.style.writingMode = 'horizontal-tb';
          cell.style.transform = 'none';
      } else {
          cell.style.writingMode = 'vertical-rl';
          cell.style.transform = 'rotate(180deg)';
      }
  });

  const autoFit = (mode: 'contents' | 'window') => runOnTable((table) => {
      if (mode === 'window') {
          table.style.width = '100%';
          table.style.tableLayout = 'fixed';
      } else {
          table.style.width = 'auto';
          table.style.tableLayout = 'auto';
      }
  });

  const distributeRows = () => runOnTable((table) => {
      const rows = Array.from(table.rows);
      // Calculate max height
      let maxH = 0;
      rows.forEach(r => maxH = Math.max(maxH, r.getBoundingClientRect().height));
      // Apply to all
      rows.forEach(r => r.style.height = `${maxH}px`);
  });

  const distributeCols = () => runOnTable((table) => {
      // Simple equal distribution for first row cells
      if (table.rows.length > 0) {
          const cells = Array.from(table.rows[0].cells);
          const pct = 100 / cells.length;
          cells.forEach(c => c.style.width = `${pct}%`);
      }
  });

  return (
    <>
      <RibbonSection title="Table">
          <div className="flex h-full items-center">
              <RibbonButton icon={MousePointer2} label="Select" onClick={() => executeCommand('selectAll')} />
              <RibbonButton icon={Grid} label="View Gridlines" onClick={() => {}} />
              <RibbonButton icon={TableProperties} label="Properties" onClick={() => alert('Table Properties')} />
          </div>
      </RibbonSection>

      <RibbonSection title="Rows & Columns">
          <div className="flex h-full items-center gap-1">
              <div className="flex flex-col h-full justify-center gap-0.5 border-r border-slate-200 pr-1 mr-1">
                 <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-1 hover:bg-red-50 text-red-600 rounded text-[10px] font-medium" onClick={deleteRow}>
                     <Trash2 size={12}/> Delete Row
                 </button>
                 <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-1 hover:bg-red-50 text-red-600 rounded text-[10px] font-medium" onClick={deleteCol}>
                     <Trash2 size={12}/> Delete Column
                 </button>
              </div>

              <div className="flex flex-col gap-0.5">
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => insertRow('above')}>
                      <ArrowUpToLine size={14}/> Insert Above
                  </button>
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => insertRow('below')}>
                      <ArrowDownToLine size={14}/> Insert Below
                  </button>
              </div>
              <div className="flex flex-col gap-0.5">
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => insertCol('left')}>
                      <ArrowLeftToLine size={14}/> Insert Left
                  </button>
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => insertCol('right')}>
                      <ArrowRightToLine size={14}/> Insert Right
                  </button>
              </div>
          </div>
      </RibbonSection>

      <RibbonSection title="Merge">
          <div className="flex flex-col h-full justify-center gap-0.5 min-w-[80px]">
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={mergeCells}>
                  <Merge size={14}/> Merge Right
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={splitCells}>
                  <Split size={14}/> Split Cells
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={splitTable}>
                  <Split size={14} className="rotate-90"/> Split Table
              </button>
          </div>
      </RibbonSection>

      <RibbonSection title="Cell Size">
          <div className="flex h-full items-center gap-2 px-1">
              <div className="flex flex-col gap-1">
                <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => autoFit('contents')}>
                    <Minimize size={14}/> AutoFit Contents
                </button>
                <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => autoFit('window')}>
                    <Maximize size={14}/> AutoFit Window
                </button>
              </div>
              
              <div className="w-[1px] h-8 bg-slate-200 mx-0.5"></div>

              <div className="flex flex-col gap-1">
                <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={distributeRows}>
                    <Scaling size={14}/> Distribute Rows
                </button>
                <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={distributeCols}>
                    <Scaling size={14} className="rotate-90"/> Distribute Cols
                </button>
              </div>
          </div>
      </RibbonSection>

      <RibbonSection title="Alignment">
          <div className="flex h-full items-center gap-2 px-1">
              {/* 3x3 Grid for Alignment */}
              <div className="grid grid-cols-3 gap-0.5 p-0.5 border rounded bg-white shadow-sm">
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('top', 'left')} title="Top Left"><AlignLeft size={10} className="rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('top', 'center')} title="Top Center"><AlignCenter size={10} className="-rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('top', 'right')} title="Top Right"><AlignRight size={10} className="rotate-45"/></button>
                  
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('middle', 'left')} title="Center Left"><AlignLeft size={10}/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('middle', 'center')} title="Center"><AlignCenter size={10}/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('middle', 'right')} title="Center Right"><AlignRight size={10}/></button>
                  
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('bottom', 'left')} title="Bottom Left"><AlignLeft size={10} className="-rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('bottom', 'center')} title="Bottom Center"><AlignCenter size={10} className="rotate-45"/></button>
                  <button onMouseDown={(e) => e.preventDefault()} className="p-0.5 hover:bg-blue-100 rounded" onClick={() => setAlign('bottom', 'right')} title="Bottom Right"><AlignRight size={10} className="-rotate-45"/></button>
              </div>
              <div className="flex flex-col gap-0.5 text-[10px] min-w-[70px]">
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-1.5 px-1 py-1 hover:bg-slate-100 rounded" onClick={setTextDirection}><Type size={12}/> Text Dir</button>
                  <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-1.5 px-1 py-1 hover:bg-slate-100 rounded" onClick={() => runOnCell(c => c.style.padding = "8px")}><Settings size={12}/> Margins</button>
              </div>
          </div>
      </RibbonSection>

      <RibbonSection title="Data">
          <div className="flex flex-col h-full justify-center gap-0.5 px-1">
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => alert("Sort Dialog")}>
                  <ArrowDownAZ size={14}/> Sort
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => {}}>
                  <Type size={14}/> Convert to Text
              </button>
              <button onMouseDown={(e) => e.preventDefault()} className="flex items-center gap-2 px-2 py-0.5 hover:bg-slate-100 rounded text-[10px]" onClick={() => {}}>
                  <Calculator size={14}/> Formula
              </button>
          </div>
      </RibbonSection>
    </>
  );
};
