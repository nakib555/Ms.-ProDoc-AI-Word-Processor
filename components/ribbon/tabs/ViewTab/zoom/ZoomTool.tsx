
import React from 'react';
import { Search } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ZoomTool: React.FC = () => {
    const { zoom, zoomMode, setZoomMode } = useEditor();
    
    const handleZoomClick = () => {
        if (zoomMode === 'custom') setZoomMode('fit-width');
        else if (zoomMode === 'fit-width') setZoomMode('fit-page');
        else setZoomMode('custom');
    };

    return (
        <RibbonButton 
            icon={Search} 
            label={`${Number(zoom).toFixed(0)}%`} 
            title="Cycle Zoom Mode"
            onClick={handleZoomClick} 
        />
    );
};
