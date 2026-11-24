
import React from 'react';
import { Search } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ZoomTool: React.FC = () => {
    const { zoom, setZoomLayout, setPageMovement, executeCommand } = useEditor();

    const handleAutoFit = () => {
        setPageMovement('vertical');
        setZoomLayout('single');
        executeCommand('fitWidth');
    };

    return (
        <RibbonButton 
            icon={Search} 
            label={`${Number(zoom).toFixed(0)}%`} 
            title="Auto-fit zoom to screen"
            onClick={handleAutoFit} 
        />
    );
};
