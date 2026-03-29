import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface InsertTableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (rows: number, cols: number) => void;
}

export const InsertTableDialog: React.FC<InsertTableDialogProps> = ({ isOpen, onClose, onInsert }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Insert Table</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 dark:text-slate-400">Number of columns:</label>
            <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded">
              <button 
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                onClick={() => setCols(Math.max(1, cols - 1))}
              >
                <Minus size={16} />
              </button>
              <input 
                type="number" 
                value={cols}
                onChange={(e) => setCols(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center border-x border-slate-300 dark:border-slate-600 py-1 bg-transparent dark:text-slate-200 outline-none"
              />
              <button 
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                onClick={() => setCols(Math.min(63, cols + 1))}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm text-slate-600 dark:text-slate-400">Number of rows:</label>
            <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded">
              <button 
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                onClick={() => setRows(Math.max(1, rows - 1))}
              >
                <Minus size={16} />
              </button>
              <input 
                type="number" 
                value={rows}
                onChange={(e) => setRows(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-12 text-center border-x border-slate-300 dark:border-slate-600 py-1 bg-transparent dark:text-slate-200 outline-none"
              />
              <button 
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                onClick={() => setRows(Math.min(100, rows + 1))}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onInsert(rows, cols);
              onClose();
            }}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
