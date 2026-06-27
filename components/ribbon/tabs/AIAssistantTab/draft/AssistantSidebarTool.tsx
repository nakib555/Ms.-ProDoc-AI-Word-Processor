import React from 'react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { MessageSquare } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';

export const AssistantSidebarTool: React.FC = () => {
    const { showAssistant, setShowAssistant } = useEditor();

    return (
        <RibbonButton 
            icon={MessageSquare} 
            label="Chat" 
            onClick={() => setShowAssistant(!showAssistant)} 
            isActive={showAssistant}
        />
    );
};
