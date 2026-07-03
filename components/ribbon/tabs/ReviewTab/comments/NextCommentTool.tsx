
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const NextCommentTool: React.FC = () => {
    const { comments, activeCommentId, setActiveCommentId } = useEditor();
    
    const handleNext = () => {
        if (comments.length === 0) return;
        const currentIndex = comments.findIndex(c => c.id === activeCommentId);
        if (currentIndex === -1 || currentIndex === comments.length - 1) {
            setActiveCommentId(comments[0].id);
        } else {
            setActiveCommentId(comments[currentIndex + 1].id);
        }
    };
    
    return (
        <SmallRibbonButton 
            icon={ChevronRight} 
            label="Next" 
            onClick={handleNext} 
            disabled={comments.length === 0} 
        />
    );
};
