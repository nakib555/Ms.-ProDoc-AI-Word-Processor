
import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const NewCommentTool: React.FC = () => {
    const { setShowComments, hasActiveSelection } = useEditor();

    return (
        <RibbonButton 
            icon={MessageSquarePlus} 
            label="New Comment" 
            onClick={() => setShowComments(true)} 
            disabled={!hasActiveSelection}
            iconClassName="text-violet-600 dark:text-violet-400"
        />
    );
};
