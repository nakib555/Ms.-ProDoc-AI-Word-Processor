
import React, { useCallback } from 'react';
import { useEditor } from '../contexts/EditorContext';
import { MiniToolbar } from './MiniToolbar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PrintLayoutView } from './ribbon/tabs/ViewTab/views/PrintLayoutView';
import { WebLayoutView } from './ribbon/tabs/ViewTab/views/WebLayoutTool';
import { ReadLayoutView } from './ribbon/tabs/ViewTab/views/ReadLayoutView';

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
        <MiniToolbar />
        
        {viewMode === 'print' ? (
            <div className="flex-1 h-full w-full print-layout-mode overflow-hidden flex flex-col">
                <PrintLayoutView 
                    width={window.innerWidth}
                    height={window.innerHeight}
                    content={content}
                    setContent={handleContentChange}
                    pageConfig={pageConfig}
                    zoom={zoom}
                    showRuler={showRuler}
                    showFormattingMarks={showFormattingMarks}
                    containerRef={registerContainer}
                />
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
