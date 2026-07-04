
import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { useEditor } from '../contexts/EditorContext';
import { MiniToolbar } from './MiniToolbar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PrintLayoutView } from './ribbon/tabs/ViewTab/views/PrintLayoutView';
import { WebLayoutView } from './ribbon/tabs/ViewTab/views/WebLayoutView';
import { ReadLayoutView } from './ribbon/tabs/ViewTab/views/ReadLayoutView';

const ResponsiveContainer = ({ children }: { children: (size: { width: number, height: number }) => React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        
        const updateSize = () => {
            if (ref.current) {
                const { width, height } = ref.current.getBoundingClientRect();
                setSize({ width, height });
            }
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="w-full h-full overflow-clip relative">
            {children(size)}
        </div>
    );
};

const Editor: React.FC = () => {
  const { editor, viewMode, content, setContent, pageConfig, zoom, showRuler, showFormattingMarks, registerContainer, editorRef, pasteProgress } = useEditor();
  
  const handleContentChange = useCallback((newContent: string) => {
      // Sync content back to editor context (and Tiptap)
      setContent(newContent);
  }, [setContent]);

  if (!editor) {
    return (
        <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
        </div>
    );
  }

  // Read Mode
  if (viewMode === 'read') {
      return <ReadLayoutView />;
  }

  return (
    <>
        <div className="no-print">
            <MiniToolbar />
        </div>
        
        {viewMode === 'print' ? (
            <div className="flex-1 h-full w-full print-layout-mode overflow-clip flex flex-col">
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
            <div className="flex-1 h-full w-full web-layout-mode overflow-clip flex flex-col">
                <WebLayoutView 
                    editorRef={editorRef}
                    content={content}
                    onInput={(e) => handleContentChange(e.currentTarget.innerHTML)}
                    onPaste={() => {}}
                    onPageClick={() => {}}
                    pageConfig={pageConfig}
                    zoom={zoom}
                    showFormattingMarks={showFormattingMarks}
                    backgroundStyle={{ backgroundColor: 'white' }}
                />
            </div>
        )}

        {pasteProgress?.active && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[9999] flex items-center justify-center animate-in fade-in duration-200 no-print">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 w-[340px] flex flex-col items-center gap-4 text-center animate-in scale-in duration-200">
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
