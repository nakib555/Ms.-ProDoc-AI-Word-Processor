
import React from 'react';

interface TablePropertiesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  table: HTMLTableElement | null;
}

export const TablePropertiesDialog: React.FC<TablePropertiesDialogProps> = ({
  isOpen,
  onClose,
  table
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Table Properties</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Properties for the selected table.
          </p>
          
          {table && (
            <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded border dark:border-slate-700 dark:text-slate-300">
              Rows: {table.rows.length}
              <br />
              Cols: {table.rows[0]?.cells.length || 0}
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-6">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
