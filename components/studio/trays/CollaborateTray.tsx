import React from 'react';
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
    wordCount,
    charCount
  } = useEditor();

  const handleAddComment = () => {
    const text = window.prompt('Enter comment text:');
    if (text?.trim()) {
      addComment(text.trim());
      setShowComments(true);
    }
  };

  const handleShowStats = () => {
    window.alert(`Document Statistics:\n\nWords: ${wordCount}\nCharacters: ${charCount}\nReading time: ~${Math.ceil(wordCount / 200)} min`);
  };

  const unresolvedCount = comments.filter(c => !c.resolved).length;

  return (
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
        onClick={handleAddComment}
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
        onClick={() => window.alert('Spelling and grammar verification active via browser spellcheck.')}
        title="Verify Document Spelling & Proofing"
        size="sm"
      />
    </div>
  );
};
