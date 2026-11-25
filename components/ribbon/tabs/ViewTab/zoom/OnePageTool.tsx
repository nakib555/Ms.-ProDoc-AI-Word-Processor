
import React from 'react';
import { File } from 'lucide-react';
import { SmallRibbonButton } from '../common/ViewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const OnePageTool: React.FC = () => {
  const { zoomMode, zoomLayout, executeCommand, setPageMovement, setZoomLayout } = useEditor();
  return (
    <SmallRibbonButton 
        icon={File} 
        label="One Page" 
        active={zoomMode === 'fit-page' && zoomLayout === 'single'}
        onClick={() => {
            setZoomLayout('single');
            setPageMovement('vertical');
            executeCommand('fitPage');
        }} 
    />
  );
};
