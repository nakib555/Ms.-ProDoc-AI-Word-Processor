
import React, { useEffect, useState } from 'react';
import { Indent, Outdent } from 'lucide-react';
import { ParagraphInput } from '../common/LayoutTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const IndentTools: React.FC = () => {
  const { editor } = useEditor();
  const [leftIndent, setLeftIndent] = useState('0');
  const [rightIndent, setRightIndent] = useState('0');

  useEffect(() => {
    if (!editor) return;
    
    const updateValues = () => {
        const attrs = editor.getAttributes('paragraph');
        setLeftIndent(attrs.indent ? `${Math.round(attrs.indent / 37.8 * 10) / 10} cm` : '0 cm');
        setRightIndent(attrs.marginRight ? `${Math.round(attrs.marginRight / 37.8 * 10) / 10} cm` : '0 cm');
    };

    editor.on('selectionUpdate', updateValues);
    editor.on('update', updateValues);
    
    return () => {
        editor.off('selectionUpdate', updateValues);
        editor.off('update', updateValues);
    };
  }, [editor]);

  const handleLeftChange = (val: string) => {
      if (!editor) return;
      const num = parseFloat(val);
      if (!isNaN(num)) {
          const px = num * 37.8; // cm to px
          editor.chain().focus().updateAttributes('paragraph', { indent: px }).run();
      }
  };

  const handleRightChange = (val: string) => {
      if (!editor) return;
      const num = parseFloat(val);
      if (!isNaN(num)) {
          const px = num * 37.8; // cm to px
          editor.chain().focus().updateAttributes('paragraph', { marginRight: px }).run();
      }
  };

  return (
    <div className="flex flex-col h-full justify-center gap-1.5 py-0.5">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5 text-center hidden">Indent</div>
        <ParagraphInput label="Left" value={leftIndent} icon={Indent} onChange={handleLeftChange} />
        <ParagraphInput label="Right" value={rightIndent} icon={Outdent} onChange={handleRightChange} />
    </div>
  );
};
