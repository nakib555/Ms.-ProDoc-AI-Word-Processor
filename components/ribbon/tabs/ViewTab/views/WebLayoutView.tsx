
import React, { useEffect, useRef } from 'react';
import { PageConfig } from '../../../../../types';
import { useMathLive } from '../../../../../hooks/useMathLive';

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
  
  // Sync content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef]);

  useMathLive(content, editorRef);

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
