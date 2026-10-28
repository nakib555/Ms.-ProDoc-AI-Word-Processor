
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface WordCountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    pages: number;
    words: number;
    charsNoSpaces: number;
    charsWithSpaces: number;
    paragraphs: number;
    lines: number;
  };
}

export const WordCountDialog: React.FC<WordCountDialogProps> = ({ isOpen, onClose, stats }) => {
  const [includeNotes, setIncludeNotes] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-[320px] overflow-hidden animate-in zoom-in-95 duration-100 font-sans text-sm select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800">
          <span className="font-semibold text-slate-900 dark:text-slate-100 text-xs">Word Count</span>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-1">
             <span className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wide">Statistics</span>
          </div>
          
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Pages</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-slate-100">{stats.pages}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Words</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-slate-100">{stats.words}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Characters (no spaces)</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-slate-100">{stats.charsNoSpaces}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Characters (with spaces)</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-slate-100">{stats.charsWithSpaces}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Paragraphs</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-slate-100">{stats.paragraphs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Lines</span>
              <span className="font-semibold font-mono text-slate-900 dark:text-slate-100">{stats.lines}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
             <button 
                type="button"
                className="flex items-start gap-2 cursor-pointer group w-full text-left"
                onClick={() => setIncludeNotes(!includeNotes)}
             >
                <div 
                    className={`mt-0.5 w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${includeNotes ? 'bg-indigo-600 border-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`}
                >
                    {includeNotes && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-[11px] text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Include textboxes, footnotes and endnotes</span>
             </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-4 py-3 flex justify-end border-t border-slate-200 dark:border-slate-800">
           <button 
             type="button"
             onClick={onClose}
             className="px-5 py-1.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
           >
             Close
           </button>
        </div>
      </div>
    </div>
  );
};
