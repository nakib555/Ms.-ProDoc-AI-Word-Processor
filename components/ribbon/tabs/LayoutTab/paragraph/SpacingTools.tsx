
import React, { useEffect, useState } from 'react';
import { ArrowUpToLine, ArrowDownToLine } from 'lucide-react';
import { ParagraphInput } from '../common/LayoutTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const SpacingTools: React.FC = () => {
  const { editor, applyBlockStyle } = useEditor();
  const [before, setBefore] = useState('0 pt');
  const [after, setAfter] = useState('0 pt');

  useEffect(() => {
    const updateValues = () => {
        const sel = window.getSelection();
        let node: Node | null = sel && sel.rangeCount > 0 ? sel.anchorNode : null;
        if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
        const block = node instanceof HTMLElement ? node.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote') as HTMLElement | null : null;
        if (block) {
            const topPx = parseFloat(block.style.marginTop || '0') || 0;
            const bottomPx = parseFloat(block.style.marginBottom || '0') || 0;
            setBefore(`${Math.round(topPx / 1.33)} pt`);
            setAfter(`${Math.round(bottomPx / 1.33)} pt`);
            return;
        }
        if (editor) {
            const attrs = editor.getAttributes('paragraph');
            setBefore(attrs.spacingBefore ? `${Math.round(attrs.spacingBefore / 1.33)} pt` : '0 pt');
            setAfter(attrs.spacingAfter ? `${Math.round(attrs.spacingAfter / 1.33)} pt` : '0 pt');
        }
    };

    document.addEventListener('selectionchange', updateValues);
    if (editor) {
        editor.on('selectionUpdate', updateValues);
        editor.on('update', updateValues);
    }
    
    return () => {
        document.removeEventListener('selectionchange', updateValues);
        if (editor) {
            editor.off('selectionUpdate', updateValues);
            editor.off('update', updateValues);
        }
    };
  }, [editor]);

  const handleBeforeChange = (val: string) => {
      const num = parseFloat(val);
      if (!isNaN(num)) {
          const clamped = Math.max(0, Math.round(num));
          const px = Math.round(clamped * 1.33 * 10) / 10; // pt to px
          setBefore(`${clamped} pt`);
          applyBlockStyle({ marginTop: `${px}px` });
      }
  };

  const handleAfterChange = (val: string) => {
      const num = parseFloat(val);
      if (!isNaN(num)) {
          const clamped = Math.max(0, Math.round(num));
          const px = Math.round(clamped * 1.33 * 10) / 10; // pt to px
          setAfter(`${clamped} pt`);
          applyBlockStyle({ marginBottom: `${px}px` });
      }
  };

  return (
    <div className="flex flex-col h-full justify-center gap-1.5 py-0.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 text-center hidden">Spacing</div>
        <ParagraphInput label="Before" value={before} icon={ArrowUpToLine} step={6} unit="pt" onChange={handleBeforeChange} />
        <ParagraphInput label="After" value={after} icon={ArrowDownToLine} step={6} unit="pt" onChange={handleAfterChange} />
    </div>
  );
};
