import React, { useState } from 'react';
import { X, Check, Trash2, MessageSquarePlus } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';
import { EmptyState } from './ui/EmptyState';

export const CommentsSidebar: React.FC = () => {
  const { comments, showComments, setShowComments, resolveComment, removeComment, setActiveCommentId, activeCommentId, addComment } = useEditor();
  const [newCommentText, setNewCommentText] = useState('');

  if (!showComments) return null;

  const handleAdd = () => {
    if (newCommentText.trim()) {
      addComment(newCommentText);
      setNewCommentText('');
    }
  };

  return (
    <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex flex-col h-full absolute right-0 top-0 bottom-0 z-50 shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <h2 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 text-sm uppercase tracking-wider">
          <MessageSquarePlus className="w-4 h-4 text-indigo-500" />
          Comments ({comments.filter(c => !c.resolved).length})
        </h2>
        <button 
          onClick={() => setShowComments(false)} 
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-slate-950/20 flex flex-col">
        {comments.length === 0 ? (
          <EmptyState
            icon={MessageSquarePlus}
            title="No comments yet"
            description="Highlight text anywhere in your document and add a comment to start collaborating."
            compact
            className="my-auto py-8"
          />
        ) : (
          comments.map(comment => (
            <div 
              key={comment.id}
              className={`bg-white p-3 rounded-lg shadow-sm border ${
                comment.resolved ? 'border-gray-200 opacity-60' : 
                activeCommentId === comment.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'
              } transition-all`}
              onClick={() => setActiveCommentId(comment.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-800">{comment.author}</span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className={`text-sm text-gray-600 mb-3 ${comment.resolved ? 'line-through' : ''}`}>
                {comment.content}
              </p>
              
              <div className="flex items-center justify-end gap-2">
                {!comment.resolved && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); resolveComment(comment.id); }}
                    className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded"
                    title="Resolve"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); removeComment(comment.id); }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shrink-0">
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Select text first, then type comment..."
          className="w-full text-xs p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-20 mb-2.5 text-slate-800 dark:text-slate-100 placeholder-slate-400"
        />
        <button
          onClick={handleAdd}
          disabled={!newCommentText.trim()}
          className="w-full bg-indigo-600 text-white text-xs font-medium py-2 rounded-md hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};
