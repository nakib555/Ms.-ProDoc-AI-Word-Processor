
import React, { useEffect, useState } from 'react';
import { ArrowUpToLine, ArrowDownToLine } from 'lucide-react';
import { ParagraphInput } from '../common/LayoutTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const SpacingTools: React.FC = () => {
  const { editor } = useEditor();
  const [before, setBefore] = useState('0');
  const [after, setAfter] = useState('0');

  useEffect(() => {
    if (!editor) return;
    
    const updateValues = () => {
        const attrs = editor.getAttributes('paragraph');
        setBefore(attrs.spacingBefore ? `${Math.round(attrs.spacingBefore / 1.33)} pt` : '0 pt');
        setAfter(attrs.spacingAfter ? `${Math.round(attrs.spacingAfter / 1.33)} pt` : '0 pt');
    };

    editor.on('selectionUpdate', updateValues);
    editor.on('update', updateValues);
    
    return () => {
        editor.off('selectionUpdate', updateValues);
        editor.off('update', updateValues);
    };
  }, [editor]);

  const handleBeforeChange = (val: string) => {
      if (!editor) return;
      const num = parseFloat(val);
      if (!isNaN(num)) {
          const px = num * 1.33; // pt to px
          editor.chain().focus().updateAttributes('paragraph', { spacingBefore: px }).run();
      }
  };

  const handleAfterChange = (val: string) => {
      if (!editor) return;
      const num = parseFloat(val);
      if (!isNaN(num)) {
          const px = num * 1.33; // pt to px
          editor.chain().focus().updateAttributes('paragraph', { spacingAfter: px }).run();
      }
  };

  return (
    <div className="flex flex-col h-full justify-center gap-1.5 py-0.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 text-center hidden">Spacing</div>
        <ParagraphInput label="Before" value={before} icon={ArrowUpToLine} onChange={handleBeforeChange} />
        <ParagraphInput label="After" value={after} icon={ArrowDownToLine} onChange={handleAfterChange} />
    </div>
  );
};
