
import React from 'react';
import { Trash2 } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const DeleteCommentTool: React.FC = () => {
    const { activeCommentId, removeComment } = useEditor();
    
    return (
        <SmallRibbonButton 
            icon={Trash2} 
            label="Delete" 
            onClick={() => {
                if (activeCommentId) removeComment(activeCommentId);
            }} 
            disabled={!activeCommentId} 
        />
    );
};
