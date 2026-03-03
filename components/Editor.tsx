
import React, { useCallback, useRef, useState, useLayoutEffect } from 'react';
import { useEditor } from '../contexts/EditorContext';
import { MiniToolbar } from './MiniToolbar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PrintLayoutView } from './ribbon/tabs/ViewTab/views/PrintLayoutView';
import { WebLayoutView } from './ribbon/tabs/ViewTab/views/WebLayoutTool';
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
        <div ref={ref} className="w-full h-full overflow-hidden relative">
            {children(size)}
        </div>
    );
};

const Editor: React.FC = () => {
  const { editor, viewMode, content, setContent, pageConfig, zoom, showRuler, showFormattingMarks, registerContainer, editorRef } = useEditor();
  
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
            <div className="flex-1 h-full w-full print-layout-mode overflow-hidden flex flex-col">
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
            <div className="flex-1 h-full w-full web-layout-mode overflow-hidden flex flex-col">
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
    </>
  );
};

export default Editor;
