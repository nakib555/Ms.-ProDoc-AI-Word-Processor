import React, { useState } from 'react';
import { BubbleMenu } from '@tiptap/react';
import { 
  Bold, Italic, Underline, Strikethrough, Highlighter, 
  AlignLeft, AlignCenter, AlignRight, MessageSquarePlus, Check, X
} from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

export const MiniToolbar: React.FC = () => {
  const { editor, addComment, setShowComments } = useEditor();
  const [isComposingComment, setIsComposingComment] = useState(false);
  const [commentText, setCommentText] = useState('');

  if (!editor) {
    return null;
  }

  const btnClass = (isActive: boolean) => `
    p-1 sm:p-1.5 rounded transition-all duration-150 select-none shrink-0
    ${isActive 
      ? 'bg-indigo-600 text-white shadow-sm' 
      : 'text-slate-300 hover:text-white hover:bg-slate-800'
    }
  `;

  const submitComment = () => {
    if (commentText.trim()) {
      addComment(commentText.trim());
      setShowComments(true);
    }
    setCommentText('');
    setIsComposingComment(false);
  };

  return (
    <BubbleMenu 
      editor={editor} 
      tippyOptions={{
        duration: 150,
        placement: 'top',
        animation: 'shift-away',
        maxWidth: 'calc(100vw - 16px)',
        popperOptions: {
          modifiers: [
            { name: 'preventOverflow', options: { boundary: 'viewport', padding: 8, altAxis: true } },
            { name: 'flip', options: { padding: 8 } },
          ],
        },
        onHide: () => {
          setIsComposingComment(false);
          setCommentText('');
        }
      }}
      className="flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 max-w-[calc(100vw-16px)] overflow-x-auto no-scrollbar bg-slate-950/95 text-slate-100 rounded-lg shadow-2xl border border-slate-800 backdrop-blur-md animate-in zoom-in-95 duration-150 z-50 select-none"
    >
      {isComposingComment ? (
        <div className="flex items-center gap-1 px-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submitComment();
              } else if (e.key === 'Escape') {
                setIsComposingComment(false);
                setCommentText('');
              }
            }}
            placeholder="Write a comment..."
            autoFocus
            className="w-36 sm:w-44 max-w-[55vw] bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white placeholder-slate-400 outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={submitComment}
            className="p-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
            title="Post comment"
          >
            <Check size={13} />
          </button>
          <button
            type="button"
            onClick={() => { setIsComposingComment(false); setCommentText(''); }}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            title="Cancel"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <>
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
            onClick={() => setIsComposingComment(true)} 
            className="p-1.5 rounded text-indigo-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Add Comment to selection"
          >
            <MessageSquarePlus size={14} strokeWidth={2} />
          </button>
        </>
      )}
    </BubbleMenu>
  );
};
