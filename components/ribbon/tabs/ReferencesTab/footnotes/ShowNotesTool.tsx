
import React from 'react';
import { Eye } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReferencesTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ShowNotesTool: React.FC = () => {
    const { showNotes, setShowNotes } = useEditor();
    return (
        <SmallRibbonButton 
            icon={Eye} 
            label="Show Notes" 
            onClick={() => setShowNotes(!showNotes)} 
            active={showNotes}
        />
    );
};
