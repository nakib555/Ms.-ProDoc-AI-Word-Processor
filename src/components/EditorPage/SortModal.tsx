import React from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpDown } from 'lucide-react';

interface SortModalProps {
  isOpen: boolean;
  sortColIndex: number;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (dir: 'asc' | 'desc') => void;
  sortExcludeHeader: boolean;
  setSortExcludeHeader: (exclude: boolean) => void;
  sortType: 'auto' | 'text' | 'number';
  setSortType: (type: 'auto' | 'text' | 'number') => void;
  onClose: () => void;
  onApply: () => void;
}

export const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  sortColIndex,
  sortDirection,
  setSortDirection,
  sortExcludeHeader,
  setSortExcludeHeader,
  sortType,
  setSortType,
  onClose,
  onApply,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 border border-slate-200 dark:border-slate-700 transform scale-100 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Sort Column</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="text-xs font-mono bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-150 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 flex justify-around">
            <div><span className="text-slate-400">Sorting Column:</span> #{sortColIndex + 1}</div>
          </div>

          {/* Sort Direction */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Sort Order
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Ascending (A-Z, 1-9)', value: 'asc' },
                { label: 'Descending (Z-A, 9-1)', value: 'desc' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSortDirection(opt.value as 'asc' | 'desc')}
                  className={`py-2 px-3 rounded-lg text-sm border font-medium transition-all text-center ${
                    sortDirection === opt.value
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Data Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Auto', value: 'auto' },
                { label: 'Text', value: 'text' },
                { label: 'Number', value: 'number' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSortType(opt.value as 'auto' | 'text' | 'number')}
                  className={`py-1.5 px-3 rounded-lg text-sm border font-medium transition-all ${
                    sortType === opt.value
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-700/30 border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Exclude Header Row */}
          <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-700/50 mt-2">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Exclude First Row (Header Row)
            </span>
            <button
              type="button"
              onClick={() => setSortExcludeHeader(!sortExcludeHeader)}
              className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                sortExcludeHeader ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  sortExcludeHeader ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6 border-t border-slate-100 dark:border-slate-700 pt-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onApply}
            className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors"
          >
            Sort
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
