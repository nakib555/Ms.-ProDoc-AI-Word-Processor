import React from 'react';
import { createPortal } from 'react-dom';
import { 
  Plus, Merge, Split, Trash2, ArrowUpDown, FileText, Settings 
} from 'lucide-react';

interface TableContextMenuProps {
  visible: boolean;
  x: number;
  y: number;
  cell: HTMLTableCellElement | null;
  table: HTMLTableElement | null;
  contextMenuRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onAction: (action: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const TableContextMenu: React.FC<TableContextMenuProps> = ({
  visible,
  x,
  y,
  contextMenuRef,
  onAction,
  onKeyDown,
}) => {
  if (!visible) return null;

  return createPortal(
    <div 
      ref={contextMenuRef}
      tabIndex={-1}
      id="table-context-menu"
      className="fixed z-[99999] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 min-w-[200px] text-sm max-h-[min(430px,calc(100vh-32px))] overflow-y-auto outline-none transition-all duration-200 ease-out origin-top-left"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={onKeyDown}
    >
      <div id="table-context-menu-title" className="px-3 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none border-b border-slate-100 dark:border-slate-700/50 mb-1">
        Table Actions
      </div>
      
      <button 
        id="tcm-btn-insert-row-above"
        onClick={() => onAction('insertRowAbove')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <Plus size={15} className="text-emerald-500 dark:text-emerald-400" />
        <span>Insert Row Above</span>
      </button>
      <button 
        id="tcm-btn-insert-row-below"
        onClick={() => onAction('insertRowBelow')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <Plus size={15} className="text-emerald-500 dark:text-emerald-400" />
        <span>Insert Row Below</span>
      </button>
      <button 
        id="tcm-btn-insert-col-left"
        onClick={() => onAction('insertColLeft')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <Plus size={15} className="text-emerald-500 dark:text-emerald-400" />
        <span>Insert Column Left</span>
      </button>
      <button 
        id="tcm-btn-insert-col-right"
        onClick={() => onAction('insertColRight')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <Plus size={15} className="text-emerald-500 dark:text-emerald-400" />
        <span>Insert Column Right</span>
      </button>
      
      <div className="border-t border-slate-100 dark:border-slate-700/50 my-1" />
      
      <button 
        id="tcm-btn-merge-cells"
        onClick={() => onAction('mergeCells')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <Merge size={15} className="text-blue-500 dark:text-blue-400" />
        <span>Merge Cells (Right)</span>
      </button>
      <button 
        id="tcm-btn-split-cells"
        onClick={() => onAction('splitCells')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <Split size={15} className="text-blue-500 dark:text-blue-400" />
        <span>Split Cells</span>
      </button>
      
      <div className="border-t border-slate-100 dark:border-slate-700/50 my-1" />
      
      <button 
        id="tcm-btn-delete-row"
        onClick={() => onAction('deleteRow')}
        className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 text-red-600 dark:text-red-400"
      >
        <Trash2 size={15} className="text-red-500 dark:text-red-400" />
        <span>Delete Row</span>
      </button>
      <button 
        id="tcm-btn-delete-col"
        onClick={() => onAction('deleteCol')}
        className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 text-red-600 dark:text-red-400"
      >
        <Trash2 size={15} className="text-red-500 dark:text-red-400" />
        <span>Delete Column</span>
      </button>
      <button 
        id="tcm-btn-delete-table"
        onClick={() => onAction('deleteTable')}
        className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 text-red-600 dark:text-red-400"
      >
        <Trash2 size={15} className="text-red-500 dark:text-red-400" />
        <span>Delete Table</span>
      </button>
      
      <div className="border-t border-slate-100 dark:border-slate-700/50 my-1" />
      
      <button 
        id="tcm-btn-sort-col"
        onClick={() => onAction('sortColumn')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <ArrowUpDown size={15} className="text-indigo-500 dark:text-indigo-400" />
        <span>Sort Column</span>
      </button>
      
      <button 
        id="tcm-btn-toggle-keep-together"
        onClick={() => onAction('toggleKeepTogether')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <FileText size={15} className="text-emerald-500 dark:text-emerald-400" />
        <span>Toggle Row Keep-Together</span>
      </button>
      
      <button 
        id="tcm-btn-properties"
        onClick={() => onAction('properties')}
        className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2 text-slate-700 dark:text-slate-200"
      >
        <Settings size={15} className="text-slate-500 dark:text-slate-400" />
        <span>Table Properties</span>
      </button>
    </div>,
    document.body
  );
};
