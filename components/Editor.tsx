
import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { useEditor } from '../contexts/EditorContext';
import { useTheme } from '../contexts/ThemeContext';
import { useGestureContext } from '../contexts/GestureContext';
import { MiniToolbar } from './MiniToolbar';
import { GhostDocument } from './ui/GhostDocument';
import { PrintLayoutView } from './ribbon/tabs/ViewTab/views/PrintLayoutView';
import { WebLayoutView } from './ribbon/tabs/ViewTab/views/WebLayoutView';
import { ReadLayoutView } from './ribbon/tabs/ViewTab/views/ReadLayoutView';
import { HistoryCommitMode } from '../utils/historyManager';

const ResponsiveContainer = ({ children }: { children: (size: { width: number, height: number }) => React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const rafRef = useRef<number | null>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        let mounted = true;
        
        const commitSize = () => {
            if (!mounted || !ref.current) return;
            const { width, height } = ref.current.getBoundingClientRect();
            setSize(prev => (Math.abs(prev.width - width) < 0.5 && Math.abs(prev.height - height) < 0.5) ? prev : { width, height });
        };

        // Initial measurement
        commitSize();

        const scheduleDebouncedResize = () => {
            if (debounceTimerRef.current !== null) {
                clearTimeout(debounceTimerRef.current);
            }
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }
            debounceTimerRef.current = setTimeout(() => {
                debounceTimerRef.current = null;
                rafRef.current = requestAnimationFrame(() => {
                    rafRef.current = null;
                    commitSize();
                });
            }, 60);
        };

        const observer = new ResizeObserver(scheduleDebouncedResize);
        observer.observe(el);

        return () => {
            mounted = false;
            observer.disconnect();
            if (debounceTimerRef.current !== null) clearTimeout(debounceTimerRef.current);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div ref={ref} className="w-full h-full overflow-clip relative">
            {children(size)}
        </div>
    );
};

const Editor: React.FC = () => {
  const { editor, viewMode, content, setContent, pageConfig, zoom, showRuler, showFormattingMarks, registerContainer, editorRef, pasteProgress } = useEditor();
  const { theme } = useTheme();
  const { isPinching, isPanning } = useGestureContext();
  
  const handleContentChange = useCallback((newContent: string, emitUpdate = false, options?: { historyMode?: HistoryCommitMode }) => {
      setContent(newContent, emitUpdate, options);
  }, [setContent]);

  const isDarkMode = theme === 'dark' || theme === 'ocean';
  const webPaperBg = pageConfig.pageColor || (isDarkMode ? (theme === 'ocean' ? '#001a3d' : '#0f172a') : '#ffffff');
  const webPaperTextColor = isDarkMode && !pageConfig.pageColor ? (theme === 'ocean' ? '#f0fdff' : '#f8fafc') : '#000000';

  if (!editor) {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-[#eef2f6] dark:bg-[#0b1120] p-4 sm:p-8">
            <GhostDocument />
        </div>
    );
  }

  // Read Mode
  if (viewMode === 'read') {
      return <ReadLayoutView />;
  }

  return (
    <>
        {!isPinching && !isPanning && (
            <div className="no-print">
                <MiniToolbar />
            </div>
        )}

        
        {viewMode === 'print' ? (
            <div className="flex-1 min-h-0 min-w-0 h-full w-full print-layout-mode overflow-clip flex flex-col">
                <ResponsiveContainer>
                    {({ height, width }) => (
                        <PrintLayoutView 
                            width={width}
                            height={height}
                            content={content}
                            setContent={handleContentChange}
                            pageConfig={pageConfig}
                            zoom={zoom}
                            showRuler={showRuler}
                            showFormattingMarks={showFormattingMarks}
                            containerRef={registerContainer}
                        />
                    )}
                </ResponsiveContainer>
            </div>
        ) : (
            <div className="flex-1 min-h-0 min-w-0 h-full w-full web-layout-mode overflow-clip flex flex-col">
                <WebLayoutView 
                    editorRef={editorRef}
                    content={content}
                    onInput={(e) => {
                      const el = e.currentTarget;
                      const isImmediate = el.dataset.commitImmediate === 'true';
                      if (isImmediate) {
                        delete el.dataset.commitImmediate;
                      }
                      handleContentChange(el.innerHTML, false, {
                        historyMode: isImmediate ? 'immediate' : 'debounced',
                      });
                    }}
                    onPaste={() => {}}
                    onPageClick={() => {}}
                    pageConfig={pageConfig}
                    zoom={zoom}
                    showFormattingMarks={showFormattingMarks}
                    backgroundStyle={{ backgroundColor: webPaperBg, color: webPaperTextColor }}
                />
            </div>
        )}

        {pasteProgress?.active && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[9999] flex items-center justify-center p-3 animate-in fade-in duration-200 no-print">
                <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 w-[min(340px,92vw)] flex flex-col items-center gap-3 sm:gap-4 text-center animate-in scale-in duration-200">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-16 h-16 transform -rotate-90">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                className="stroke-slate-100 dark:stroke-slate-800 fill-none"
                                strokeWidth="4"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                className="stroke-indigo-600 dark:stroke-indigo-400 fill-none transition-all duration-300"
                                strokeWidth="4"
                                strokeDasharray={175}
                                strokeDashoffset={175 - (175 * pasteProgress.percentage) / 100}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="absolute text-xs font-mono font-bold text-slate-800 dark:text-slate-100">{pasteProgress.percentage}%</span>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Pasting Large Content</h4>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal">
                            Inserting chunk {pasteProgress.currentChunk} of {pasteProgress.totalChunks} smoothly without freezing...
                        </p>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                            className="bg-indigo-600 dark:bg-indigo-400 h-full rounded-full transition-all duration-300" 
                            style={{ width: `${pasteProgress.percentage}%` }}
                        />
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default Editor;
