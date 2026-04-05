
import React, { useEffect, useRef } from 'react';
import { PageConfig } from '../../../../../types';
import { useMathLive } from '../../../../../hooks/useMathLive';
import { useEditor } from '../../../../../contexts/EditorContext';

interface WebLayoutViewProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  content: string;
  onInput: (e: React.FormEvent<HTMLDivElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onPageClick: (e: React.MouseEvent) => void;
  pageConfig: PageConfig;
  zoom: number;
  showFormattingMarks: boolean;
  backgroundStyle: React.CSSProperties;
}

export const WebLayoutView: React.FC<WebLayoutViewProps> = ({
  editorRef,
  content,
  onInput,
  onPaste,
  onPageClick,
  pageConfig,
  zoom,
  showFormattingMarks,
  backgroundStyle
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const { setActiveElementType } = useEditor();
  
  // Sync content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef]);

  useMathLive(content, editorRef);

  // Track selection to update active element type (e.g., for showing Table tabs)
  useEffect(() => {
    const handleSelectionChange = () => {
      if (!editorRef.current) return;
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      const node = selection.anchorNode;
      if (!node) return;
      
      // Only process if the selection is inside THIS editor
      if (!editorRef.current.contains(node)) return;
      
      const element = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
      if (!element) return;
      
      if (element.closest('table')) {
          setActiveElementType('table');
      } else if (element.tagName === 'IMG' || element.closest('img')) {
          setActiveElementType('image');
      } else if (element.closest('math-field') || element.closest('.math-inline') || element.closest('.math-display')) {
          setActiveElementType('equation');
      } else {
          setActiveElementType('text');
      }
    };
    
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, [setActiveElementType, editorRef]);

  const scale = zoom / 100;

  return (
    <div 
      className="flex-1 w-full overflow-y-auto bg-slate-100 dark:bg-slate-900 p-8 flex flex-col items-center"
      onClick={onPageClick}
      style={{ willChange: 'transform' }}
    >
      <div 
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={onInput}
        onPaste={onPaste}
        className={`bg-white dark:bg-slate-800 shadow-xl outline-none p-12 min-h-screen w-full max-w-5xl prose dark:prose-invert ${showFormattingMarks ? 'show-formatting-marks' : ''}`}
        style={{
          ...backgroundStyle,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          fontFamily: 'Calibri, Inter, sans-serif',
          lineHeight: '1.6',
        }}
      />
    </div>
  );
};
