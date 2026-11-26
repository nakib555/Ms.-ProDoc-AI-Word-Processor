import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  MessageSquare, MessageSquarePlus, StickyNote, Eye, 
  BarChart3, ShieldCheck
} from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioDivider } from '../common/StudioDivider';

export const CollaborateTray: React.FC = () => {
  const { 
    comments, 
    showComments, 
    setShowComments, 
    addComment, 
    showNotes, 
    setShowNotes,
    showJsonInspector,
    setShowJsonInspector,
    setShowWordCountDialog,
    showToast,
  } = useEditor();

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleOpenCommentModal = () => {
    setCommentText('');
    setShowCommentModal(true);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(commentText.trim());
      setShowComments(true);
    }
    setShowCommentModal(false);
  };

  const handleShowStats = () => {
    setShowWordCountDialog(true);
  };

  const unresolvedCount = comments.filter(c => !c.resolved).length;

  return (
    <>
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      {/* Comments Sidebar Toggle */}
      <StudioButton
        icon={MessageSquare}
        label={`Comments ${unresolvedCount > 0 ? `(${unresolvedCount})` : ''}`}
        onClick={() => setShowComments(prev => !prev)}
        active={showComments}
        title="Toggle Comments Sidebar"
        size="sm"
      />

      {/* Add Comment Button */}
      <StudioButton
        icon={MessageSquarePlus}
        label="Add Comment"
        onClick={handleOpenCommentModal}
        title="Add a comment to selection"
        size="sm"
      />

      <StudioDivider />

      {/* Notes Sidebar Toggle */}
      <StudioButton
        icon={StickyNote}
        label="Document Notes"
        onClick={() => setShowNotes(prev => !prev)}
        active={showNotes}
        title="Toggle Footnotes & Endnotes Panel"
        size="sm"
      />

      {/* Document Inspector */}
      <StudioButton
        icon={Eye}
        label="JSON Inspector"
        onClick={() => setShowJsonInspector(prev => !prev)}
        active={showJsonInspector}
        title="Inspect Document AST / JSON Tree"
        size="sm"
      />

      <StudioDivider />

      {/* Word Count & Stats */}
      <StudioButton
        icon={BarChart3}
        label="Statistics"
        onClick={handleShowStats}
        title="Show Word Count & Reading Time"
        size="sm"
      />

      {/* Spellcheck / Proofing */}
      <StudioButton
        icon={ShieldCheck}
        label="Proofing"
        onClick={() => showToast('Spelling and grammar verification active via browser spellcheck.', 'info')}
        title="Verify Document Spelling & Proofing"
        size="sm"
      />
    </div>
    {showCommentModal && createPortal(
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in overscroll-contain"
        role="dialog"
        aria-modal="true"
        data-modal-backdrop="true"
        onClick={() => setShowCommentModal(false)}
      >
        <form
          onSubmit={handleSubmitComment}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-4 sm:p-5 w-full max-w-xs max-h-[90dvh] overflow-y-auto space-y-3"
        >
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Add Comment</h3>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter comment text..."
            rows={3}
            autoFocus
            className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowCommentModal(false)} className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium">
              Add Comment
            </button>
          </div>
        </form>
      </div>,
      document.body
    )}
    </>
  );
};
