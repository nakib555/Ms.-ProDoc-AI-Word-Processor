import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Search, Replace, ArrowRight, ChevronRight, SearchX } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';

interface FindReplaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  initialMode?: 'find' | 'replace';
}

export const FindReplaceDialog: React.FC<FindReplaceDialogProps> = ({
  isOpen,
  onClose,
  editorRef,
  initialMode = 'find'
}) => {
  const { content, setContent, totalPages } = useEditor();
  const [mode, setMode] = useState<'find' | 'replace'>(initialMode);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [message, setMessage] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
        const t = setTimeout(() => {
            setMode(initialMode);
            setMessage('');
        }, 0);
        return () => clearTimeout(t);
    }
  }, [initialMode, isOpen]);

  const buildRegex = useCallback((): RegExp | null => {
    if (!findText) return null;
    const flags = matchCase ? 'g' : 'gi';
    let patternSource = findText;
    if (!useRegex) {
      patternSource = patternSource.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    if (wholeWord && !useRegex) {
      patternSource = `\\b${patternSource}\\b`;
    }
    try {
      return new RegExp(patternSource, flags);
    } catch (_e) {
      setMessage('Invalid Regex');
      return null;
    }
  }, [findText, matchCase, wholeWord, useRegex]);

  const getEditorContainers = useCallback((): HTMLElement[] => {
    const all = Array.from(document.querySelectorAll<HTMLElement>('[id^="prodoc-editor-"]'));
    if (all.length > 0) {
      all.sort((a, b) => {
        const numA = parseInt(a.id.replace('prodoc-editor-', ''), 10) || 0;
        const numB = parseInt(b.id.replace('prodoc-editor-', ''), 10) || 0;
        return numA - numB;
      });
      return all;
    }
    return editorRef.current ? [editorRef.current] : [];
  }, [editorRef]);

  // Helper to get all matches across all mounted document pages
  const getAllMatches = useCallback(() => {
    const containers = getEditorContainers();
    if (containers.length === 0 || !findText) return [];

    const regex = buildRegex();
    if (!regex) return [];

    const matches: { node: Node; start: number; end: number; container: HTMLElement }[] = [];

    for (const container of containers) {
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
      );

      let currentNode: Node | null;
      while ((currentNode = walker.nextNode())) {
        const text = currentNode.textContent || '';
        let match;
        regex.lastIndex = 0;
        while ((match = regex.exec(text)) !== null) {
          matches.push({
            node: currentNode,
            start: match.index,
            end: match.index + match[0].length,
            container,
          });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      }
    }
    return matches;
  }, [getEditorContainers, findText, buildRegex]);

  const findNext = () => {
    const matches = getAllMatches();
    if (matches.length === 0) {
      setMessage('No matches found.');
      return;
    }

    const selection = window.getSelection();
    let nextMatch = matches[0];
    let nextIndex = 0;

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      for (let idx = 0; idx < matches.length; idx++) {
        const m = matches[idx];
        const pos = range.endContainer.compareDocumentPosition(m.node);

        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
          nextMatch = m;
          nextIndex = idx;
          break;
        } else if (range.endContainer === m.node && m.start >= range.endOffset) {
          nextMatch = m;
          nextIndex = idx;
          break;
        }
      }
    }

    const newRange = document.createRange();
    newRange.setStart(nextMatch.node, nextMatch.start);
    newRange.setEnd(nextMatch.node, nextMatch.end);
    selection?.removeAllRanges();
    selection?.addRange(newRange);

    if (nextMatch.node.parentElement) {
      nextMatch.node.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setMessage(`Match ${nextIndex + 1} of ${matches.length}`);
  };

  const replaceCurrent = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      findNext();
      return;
    }

    const anchorNode = selection.anchorNode;
    const container = anchorNode
      ? (anchorNode instanceof HTMLElement ? anchorNode : anchorNode.parentElement)?.closest('.prodoc-editor') as HTMLElement | null
      : null;

    if (container) {
      container.dataset.commitImmediate = 'true';
    }
    document.execCommand('insertText', false, replaceText);
    findNext();
  };

  const replaceAll = () => {
    const regex = buildRegex();
    if (!regex) return;

    const containers = getEditorContainers();

    // If virtualized pages exist beyond mounted containers, update full content HTML safely via DOMParser
    if (totalPages > containers.length && content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
      let count = 0;
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent || '';
        const localMatches = text.match(regex);
        if (localMatches && localMatches.length > 0) {
          count += localMatches.length;
          node.textContent = text.replace(regex, replaceText);
        }
      }
      if (count > 0) {
        setContent(doc.body.innerHTML, true, { historyMode: 'immediate' });
      }
      setMessage(`Replaced ${count} occurrence${count === 1 ? '' : 's'}.`);
      return;
    }

    let count = 0;
    const modifiedContainers = new Set<HTMLElement>();

    for (let i = 0; i < 1000; i++) {
      const matches = getAllMatches();
      if (matches.length === 0) break;

      const m = matches[0];
      const text = m.node.textContent || '';
      const before = text.slice(0, m.start);
      const after = text.slice(m.end);
      m.node.textContent = before + replaceText + after;
      modifiedContainers.add(m.container);
      count++;
    }

    modifiedContainers.forEach((container) => {
      container.dataset.commitImmediate = 'true';
      container.dispatchEvent(new Event('input', { bubbles: true }));
    });
    setMessage(`Replaced ${count} occurrence${count === 1 ? '' : 's'}.`);
  };

  if (!isOpen) return null;

  return (
    <div ref={dialogRef} className="fixed top-14 sm:top-24 md:top-28 left-2 right-2 sm:left-auto sm:right-6 md:right-10 z-50 w-auto sm:w-96 max-w-[calc(100vw-1rem)] max-h-[calc(100dvh-4.5rem)] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 overflow-hidden font-sans text-slate-700 dark:text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 select-none shrink-0">
        <div className="flex gap-4 text-xs sm:text-sm font-semibold">
            <button 
                className={`pb-1 border-b-2 transition-colors ${mode === 'find' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                onClick={() => setMode('find')}
            >
                Find
            </button>
            <button 
                className={`pb-1 border-b-2 transition-colors ${mode === 'replace' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                onClick={() => setMode('replace')}
            >
                Replace
            </button>
        </div>
        <button onClick={onClose} aria-label="Close Find and Replace" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded">
            <X size={16} />
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5 sm:p-4 space-y-3.5 sm:space-y-4 flex-1 min-h-0 overflow-y-auto overscroll-contain">
        {/* Find Input */}
        <div className="space-y-1">
            <div className="relative">
                <input 
                    type="text" 
                    value={findText}
                    onChange={(e) => setFindText(e.target.value)}
                    placeholder="Find what..."
                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-md focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 outline-none"
                    autoFocus
                    onKeyDown={(e) => { if(e.key === 'Enter') findNext(); }}
                />
                <Search className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
            </div>
        </div>

        {/* Replace Input */}
        {mode === 'replace' && (
            <div className="space-y-1 animate-in slide-in-from-top-1 fade-in duration-200">
                <div className="relative">
                    <input 
                        type="text" 
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                        placeholder="Replace with..."
                        className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-md focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 outline-none"
                        onKeyDown={(e) => { if(e.key === 'Enter') replaceCurrent(); }}
                    />
                    <Replace className="absolute left-2.5 top-2.5 text-slate-400" size={14} />
                </div>
            </div>
        )}

        {/* Options */}
        <div className="space-y-2 pt-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Options</div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                    <div 
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${matchCase ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-transparent'}`}
                        onClick={() => setMatchCase(!matchCase)}
                    >
                        <ArrowRight size={10} className="rotate-45" /> 
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white" onClick={() => setMatchCase(!matchCase)}>Match case</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group select-none">
                    <div 
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${wholeWord ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-transparent'}`}
                        onClick={() => setWholeWord(!wholeWord)}
                    >
                         <ArrowRight size={10} className="rotate-45" />
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white" onClick={() => setWholeWord(!wholeWord)}>Whole word</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group select-none xs:col-span-2">
                    <div 
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${useRegex ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-transparent'}`}
                        onClick={() => setUseRegex(!useRegex)}
                    >
                         <ArrowRight size={10} className="rotate-45" />
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white" onClick={() => setUseRegex(!useRegex)}>Use regular expressions</span>
                </label>
            </div>
        </div>

        {/* Message Area */}
        {message && (
            <div 
                role="status" 
                aria-live="polite"
                className="text-xs text-center py-2 px-3 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800/60 flex items-center justify-center gap-1.5 animate-in fade-in"
            >
                <SearchX size={13} className="shrink-0" />
                <span>{message}</span>
            </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {mode === 'replace' && (
                 <button 
                    onClick={replaceAll}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                 >
                    Replace All
                 </button>
            )}
            
            {mode === 'replace' && (
                 <button 
                    onClick={replaceCurrent}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                 >
                    Replace
                 </button>
            )}

            <button 
                onClick={() => findNext()}
                className="px-4 py-1.5 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 rounded shadow-sm transition-colors flex items-center gap-1"
            >
                Find Next <ChevronRight size={12} />
            </button>
        </div>
      </div>
    </div>
  );
};