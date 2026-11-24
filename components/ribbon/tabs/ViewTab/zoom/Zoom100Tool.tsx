
import React from 'react';
import { ZoomIn } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const Zoom100Tool: React.FC = () => {
  const { executeCommand, setPageMovement, setZoomLayout } = useEditor();
  return (
    <RibbonButton 
        icon={ZoomIn} 
        label="100%" 
        onClick={() => {
            setZoomLayout('single');
            setPageMovement('vertical');
            executeCommand('zoomReset');
        }} 
    />
  );
};
