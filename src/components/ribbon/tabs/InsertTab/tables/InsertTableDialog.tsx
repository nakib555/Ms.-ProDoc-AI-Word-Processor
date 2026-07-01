
import React, { useState } from 'react';

interface InsertTableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (rows: number, cols: number) => void;
}

export const InsertTableDialog: React.FC<InsertTableDialogProps> = ({
  isOpen,
  onClose,
  onInsert
}) => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-sm p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold dark:text-white">Insert Table</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Number of columns:
            </label>
            <input 
              type="number" 
              min="1" 
              max="20"
              value={cols}
              onChange={(e) => setCols(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-3 sm:py-2 border rounded-md dark:bg-slate-900 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Number of rows:
            </label>
            <input 
              type="number" 
              min="1" 
              max="100"
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-3 sm:py-2 border rounded-md dark:bg-slate-900 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <button 
              onClick={onClose}
              className="px-4 py-3 sm:py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => onInsert(rows, cols)}
              className="px-4 py-3 sm:py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
            >
              Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
