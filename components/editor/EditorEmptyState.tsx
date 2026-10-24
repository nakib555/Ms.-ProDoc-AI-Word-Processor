import React, { useRef } from 'react';
import { PenLine, FileText, FolderOpen, LayoutTemplate } from 'lucide-react';

interface EditorEmptyStateProps {
  onStartWriting: () => void;
  onInsertOutline: () => void;
  onOpenDocument?: () => void;
}

export const EditorEmptyState: React.FC<EditorEmptyStateProps> = ({
  onStartWriting,
  onInsertOutline,
  onOpenDocument,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dispatch custom event for document opener or let handler deal with it
      window.dispatchEvent(new CustomEvent('prodoc:open-file', { detail: file }));
      e.target.value = '';
    }
  };

  const handleOpenClick = () => {
    if (onOpenDocument) {
      onOpenDocument();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      role="status"
      aria-label="Empty document guide"
      className="absolute inset-0 flex flex-col items-center justify-center p-8 select-none pointer-events-none print:hidden z-10 animate-in fade-in duration-300"
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".docx,.txt,.html,.md,.json"
        onChange={handleFileChange}
      />

      <div className="max-w-md w-full flex flex-col items-center text-center">
        {/* Subtle decorative icon container */}
        <div className="w-16 h-16 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 shadow-sm backdrop-blur-xs transition-transform hover:scale-105">
          <FileText className="w-8 h-8 text-indigo-500/80 dark:text-indigo-400/80" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
          Start your document
        </h2>

        {/* Subtitle / Guidance */}
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
          Click anywhere on the page to start writing, or choose a quick start option below.
        </p>

        {/* Action cards / buttons (pointer-events-auto so they are interactive) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 pointer-events-auto">
          <button
            type="button"
            onClick={onStartWriting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
          >
            <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Start Writing</span>
          </button>

          <button
            type="button"
            onClick={onInsertOutline}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-medium shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-indigo-500" aria-hidden="true" />
            <span>Sample Outline</span>
          </button>

          <button
            type="button"
            onClick={handleOpenClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 text-xs font-medium shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
            <span>Open File</span>
          </button>
        </div>

        {/* Keyboard shortcut hint */}
        <p className="mt-5 text-[11px] text-slate-400 dark:text-slate-500">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-600 dark:text-slate-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-600 dark:text-slate-300">O</kbd> to open an existing file
        </p>
      </div>
    </div>
  );
};
