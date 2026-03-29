import React, { useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { 
  ArrowUpToLine, ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine,
  Trash2, Merge, Split, AlignLeft, AlignCenter, AlignRight,
  AlignJustify, ChevronRight, ChevronLeft, TableProperties
} from 'lucide-react';
import { TablePropertiesDialog } from './TablePropertiesDialog';

export const MobileTableToolbar: React.FC = () => {
  const { activeElementType } = useEditor();
  const [showAlignment, setShowAlignment] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [activeTable, setActiveTable] = useState<HTMLTableElement | null>(null);

  if (activeElementType !== 'table') return null;

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
          const targetIndex = where === 'left' ? index : index + 1;
          if (targetIndex <= row.cells.length) {
              const newCell = row.insertCell(targetIndex);
              newCell.innerHTML = '<br>';
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
          if (nextSibling.innerText.trim()) {
              cell.innerHTML += " " + nextSibling.innerHTML;
          }
          nextSibling.remove();
      }
  });

  const splitCells = () => runOnCell((cell) => {
      const colspan = cell.colSpan;
      if (colspan > 1) {
          cell.colSpan = Math.floor(colspan / 2);
          const newCell = cell.cloneNode(true) as HTMLTableCellElement;
          newCell.colSpan = Math.ceil(colspan / 2);
          newCell.innerHTML = "<br>"; 
          cell.parentNode?.insertBefore(newCell, cell.nextSibling);
      } else {
          const newCell = cell.cloneNode(true) as HTMLTableCellElement;
          newCell.innerHTML = "<br>";
          cell.parentNode?.insertBefore(newCell, cell.nextSibling);
      }
  });

  const setAlign = (vertical: string, horizontal: string) => runOnCell((cell) => {
      cell.style.verticalAlign = vertical;
      cell.style.textAlign = horizontal;
  });

  const openProperties = () => {
      runOnTable((table) => {
          setActiveTable(table);
          setIsPropertiesOpen(true);
      });
  };

  return (
    <>
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[100] md:hidden bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex items-center p-1.5 gap-1 overflow-x-auto max-w-[95vw] scrollbar-hide touch-pan-x ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
        
        {showAlignment ? (
        <>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setShowAlignment(false)} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Back">
            <ChevronLeft size={20} />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
          
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('top', 'left')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Top Left">
            <AlignLeft size={20} className="rotate-45" />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('top', 'center')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Top Center">
            <AlignCenter size={20} className="-rotate-45" />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('top', 'right')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Top Right">
            <AlignRight size={20} className="rotate-45" />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
          
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('middle', 'left')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Center Left">
            <AlignLeft size={20} />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('middle', 'center')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Center">
            <AlignCenter size={20} />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('middle', 'right')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Center Right">
            <AlignRight size={20} />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
          
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('bottom', 'left')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Bottom Left">
            <AlignLeft size={20} className="-rotate-45" />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('bottom', 'center')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Bottom Center">
            <AlignCenter size={20} className="rotate-45" />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setAlign('bottom', 'right')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Bottom Right">
            <AlignRight size={20} className="-rotate-45" />
          </button>
        </>
      ) : (
        <>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => insertRow('above')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Insert Above">
            <ArrowUpToLine size={20} />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => insertRow('below')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Insert Below">
            <ArrowDownToLine size={20} />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => insertCol('left')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Insert Left">
            <ArrowLeftToLine size={20} />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => insertCol('right')} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Insert Right">
            <ArrowRightToLine size={20} />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
          <button onPointerDown={(e) => e.preventDefault()} onClick={mergeCells} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Merge Cells">
            <Merge size={20} />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={splitCells} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Split Cells">
            <Split size={20} />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
          <button onPointerDown={(e) => e.preventDefault()} onClick={deleteRow} className="p-2 shrink-0 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 dark:active:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors" title="Delete Row">
            <Trash2 size={20} />
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={deleteCol} className="p-2 shrink-0 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 dark:active:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors" title="Delete Column">
            <Trash2 size={20} />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
          <button onPointerDown={(e) => e.preventDefault()} onClick={openProperties} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Table Properties">
            <TableProperties size={20} />
          </button>
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => setShowAlignment(true)} className="p-2 shrink-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 dark:active:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors" title="Alignment Options">
            <ChevronRight size={20} />
          </button>
        </>
      )}
      </div>

      <TablePropertiesDialog 
        isOpen={isPropertiesOpen} 
        onClose={() => {
            setIsPropertiesOpen(false);
            setActiveTable(null);
        }} 
        table={activeTable} 
      />
    </>
  );
};
