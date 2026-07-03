
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ShowCommentsTool: React.FC = () => {
    const { showComments, setShowComments } = useEditor();
    
    return (
        <RibbonButton 
            icon={MessageSquare} 
            label="Show Comments" 
            isActive={showComments}
            onClick={() => setShowComments(!showComments)} 
        />
    );
};
