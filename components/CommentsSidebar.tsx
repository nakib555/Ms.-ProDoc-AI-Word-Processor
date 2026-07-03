import React, { useState } from 'react';
import { X, Check, Trash2, MessageSquarePlus } from 'lucide-react';
import { useEditor } from '../contexts/EditorContext';

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
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full absolute right-0 top-0 bottom-0 z-50 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4" />
          Comments ({comments.filter(c => !c.resolved).length})
        </h2>
        <button onClick={() => setShowComments(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {comments.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">
            No comments yet. Select text in the document and click 'Add Comment'.
          </div>
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

      <div className="p-4 border-t border-gray-200 bg-white">
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Select text first, then type comment..."
          className="w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20 mb-2"
        />
        <button
          onClick={handleAdd}
          disabled={!newCommentText.trim()}
          className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};
