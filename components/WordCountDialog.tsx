import React, { useMemo, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

interface WordCountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const stripHtml = (html: string) =>
  (html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim();

export const WordCountDialog: React.FC<WordCountDialogProps> = ({ isOpen, onClose }) => {
  const {
    content,
    wordCount,
    charCount,
    totalPages,
    headerContent,
    footerContent,
    firstHeaderContent,
    firstFooterContent,
    footnotes,
    endnotes,
  } = useEditor();

  const [includeNotesAndHf, setIncludeNotesAndHf] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const stats = useMemo(() => {
    const parser = typeof DOMParser !== 'undefined' ? new DOMParser() : null;
    let paragraphs = 0;
    let lines = 0;
    let charsNoSpaces = 0;

    const plainBody = (content || '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
    charsNoSpaces = plainBody.replace(/\s+/g, '').length;

    if (parser) {
      const doc = parser.parseFromString(content || '', 'text/html');
      const blockEls = doc.body.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote, pre');
      blockEls.forEach((el) => {
        if ((el.textContent || '').trim().length > 0) paragraphs++;
      });
      const brCount = doc.body.querySelectorAll('br').length;
      lines = Math.max(paragraphs, paragraphs + brCount);
    }

    let extraWords = 0;
    let extraCharsWithSpaces = 0;
    let extraCharsNoSpaces = 0;

    if (includeNotesAndHf) {
      const extraChunks = [
        headerContent,
        footerContent,
        firstHeaderContent,
        firstFooterContent,
        ...footnotes.map((f) => f.content),
        ...endnotes.map((e) => e.content),
      ];
      extraChunks.forEach((chunk) => {
        const clean = stripHtml(chunk);
        if (clean) {
          extraWords += clean.split(/\s+/).length;
          extraCharsWithSpaces += clean.length;
          extraCharsNoSpaces += clean.replace(/\s+/g, '').length;
        }
      });
    }

    const totalWords = wordCount + extraWords;
    const totalCharsWithSpaces = charCount + extraCharsWithSpaces;
    const totalCharsNoSpaces = charsNoSpaces + extraCharsNoSpaces;
    const readingMinutes = Math.max(1, Math.ceil(totalWords / 200));

    return {
      pages: totalPages,
      words: totalWords,
      charsNoSpaces: totalCharsNoSpaces,
      charsWithSpaces: totalCharsWithSpaces,
      paragraphs,
      lines,
      readingMinutes,
    };
  }, [
    content,
    wordCount,
    charCount,
    totalPages,
    includeNotesAndHf,
    headerContent,
    footerContent,
    firstHeaderContent,
    firstFooterContent,
    footnotes,
    endnotes,
  ]);

  if (!isOpen) return null;

  const rows = [
    { label: 'Pages', value: stats.pages.toLocaleString() },
    { label: 'Words', value: stats.words.toLocaleString() },
    { label: 'Characters (no spaces)', value: stats.charsNoSpaces.toLocaleString() },
    { label: 'Characters (with spaces)', value: stats.charsWithSpaces.toLocaleString() },
    { label: 'Paragraphs', value: stats.paragraphs.toLocaleString() },
    { label: 'Lines (approx.)', value: stats.lines.toLocaleString() },
    { label: 'Estimated reading time', value: `~${stats.readingMinutes} min` },
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-sm overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-modal-backdrop="true"
      aria-labelledby="word-count-dialog-title"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-sm max-h-[90vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-blue-600 dark:text-blue-400" />
            <h2 id="word-count-dialog-title" className="text-sm font-bold">
              Word Count
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close Word Count dialog"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4 flex-1 min-h-0 overflow-y-auto overscroll-contain">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Statistics
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            {rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between px-3.5 py-2 text-xs bg-white dark:bg-slate-900">
                <span className="text-slate-600 dark:text-slate-300">{row.label}</span>
                <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-slate-100">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeNotesAndHf}
              onChange={(e) => setIncludeNotesAndHf(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>Include headers, footers, footnotes &amp; endnotes</span>
          </label>
        </div>

        <div className="flex justify-end px-5 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
