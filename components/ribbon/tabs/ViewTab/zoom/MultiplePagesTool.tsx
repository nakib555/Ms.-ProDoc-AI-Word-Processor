
import React from 'react';
import { Files } from 'lucide-react';
import { SmallRibbonButton } from '../common/ViewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const MultiplePagesTool: React.FC = () => {
    const { setZoomMode, setPageMovement } = useEditor();
    return (
        <SmallRibbonButton 
            icon={Files} 
            label="Multiple Pages" 
            onClick={() => {
                setPageMovement('side-by-side');
                setZoomMode('fit-page');
            }} 
        />
    );
};
