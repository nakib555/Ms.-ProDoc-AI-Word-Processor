import React from 'react';
import { BubbleMenu } from '@tiptap/react';
import { 
  Bold, Italic, Underline, Strikethrough, Highlighter, 
  AlignLeft, AlignCenter, AlignRight, MessageSquarePlus
} from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

export const MiniToolbar: React.FC = () => {
  const { editor, addComment, setShowComments } = useEditor();

  if (!editor) {
    return null;
  }

  const btnClass = (isActive: boolean) => `
    p-1.5 rounded transition-all duration-150 select-none
    ${isActive 
      ? 'bg-indigo-600 text-white shadow-sm' 
      : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }
  `;

  const handleAddComment = () => {
    setShowComments(true);
    const text = window.prompt("Add comment to selected text:");
    if (text && text.trim()) {
      addComment(text.trim());
    }
  };

  return (
    <BubbleMenu 
      editor={editor} 
      tippyOptions={{ duration: 150, placement: 'top', animation: 'shift-away' }}
      className="flex items-center gap-1 p-1.5 bg-slate-950/95 text-slate-100 rounded-lg shadow-2xl border border-slate-800 backdrop-blur-md animate-in zoom-in-95 duration-150 z-50 select-none"
    >
        <div className="flex items-center gap-0.5">
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold (Ctrl+B)">
                <Bold size={14} strokeWidth={2.25} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic (Ctrl+I)">
                <Italic size={14} strokeWidth={2.25} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Underline (Ctrl+U)">
                <Underline size={14} strokeWidth={2.25} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnClass(editor.isActive('strike'))} title="Strikethrough">
                <Strikethrough size={14} strokeWidth={2.25} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={btnClass(editor.isActive('highlight'))} title="Highlight">
                <Highlighter size={14} strokeWidth={2.25} />
            </button>
        </div>
        
        <div className="w-[1px] h-4 bg-slate-800 mx-1" aria-hidden="true" />
        
        <div className="flex items-center gap-0.5">
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Align Left">
                <AlignLeft size={14} strokeWidth={2} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Align Center">
                <AlignCenter size={14} strokeWidth={2} />
            </button>
            <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Align Right">
                <AlignRight size={14} strokeWidth={2} />
            </button>
        </div>

        <div className="w-[1px] h-4 bg-slate-800 mx-1" aria-hidden="true" />

        <button 
          type="button" 
          onClick={handleAddComment} 
          className="p-1.5 rounded text-indigo-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Add Comment to selection"
        >
          <MessageSquarePlus size={14} strokeWidth={2} />
        </button>
    </BubbleMenu>
  );
};
