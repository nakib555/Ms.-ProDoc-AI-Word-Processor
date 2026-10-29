import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { ZoomDialog } from '../../../../ui/ZoomDialog';

export const ZoomTool: React.FC = () => {
    const { zoom } = useEditor();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <RibbonButton 
                icon={Search} 
                label={`Zoom (${Number(zoom).toFixed(0)}%)`} 
                title="Open Zoom Presets & View Controls"
                onClick={() => setIsDialogOpen(true)} 
            />
            {isDialogOpen && (
                <ZoomDialog 
                    isOpen={isDialogOpen} 
                    onClose={() => setIsDialogOpen(false)} 
                />
            )}
        </>
    );
};
