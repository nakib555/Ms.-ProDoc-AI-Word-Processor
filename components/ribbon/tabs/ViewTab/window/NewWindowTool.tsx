import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AppWindow, X } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const NewWindowTool: React.FC = () => {
  const { content, documentTitle } = useEditor();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <RibbonButton icon={AppWindow} label="New Window" onClick={() => setIsOpen(true)} title="Open document in floating reference window" />
      {isOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in overscroll-contain"
          role="dialog"
          aria-modal="true"
          data-modal-backdrop="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl w-full max-w-3xl h-[85dvh] max-h-[90dvh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 min-w-0">
                <AppWindow size={14} className="text-blue-500 shrink-0" />
                <span className="truncate">{documentTitle || 'Document'} — Reference View</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 shrink-0"
                title="Close Reference Window"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-6 bg-slate-100 dark:bg-slate-950">
              <div
                className="max-w-2xl mx-auto bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 sm:p-8 rounded shadow-sm border border-slate-200 dark:border-slate-800 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content || '<p></p>' }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
