
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const PreviousCommentTool: React.FC = () => {
    const { comments, activeCommentId, setActiveCommentId } = useEditor();
    
    const handlePrevious = () => {
        if (comments.length === 0) return;
        const currentIndex = comments.findIndex(c => c.id === activeCommentId);
        if (currentIndex === -1 || currentIndex === 0) {
            setActiveCommentId(comments[comments.length - 1].id);
        } else {
            setActiveCommentId(comments[currentIndex - 1].id);
        }
    };
    
    return (
        <SmallRibbonButton 
            icon={ChevronLeft} 
            label="Previous" 
            onClick={handlePrevious} 
            disabled={comments.length === 0} 
        />
    );
};
