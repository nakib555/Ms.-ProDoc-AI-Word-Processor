
import React from 'react';
import { MoveVertical } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const VerticalTool: React.FC = () => {
  const { pageMovement, setPageMovement, setZoomLayout } = useEditor();
  
  return (
    <RibbonButton 
      icon={MoveVertical} 
      label="Vertical" 
      onClick={() => {
        setZoomLayout('single');
        setPageMovement('vertical');
      }} 
      active={pageMovement === 'vertical'}
      title="Scroll pages vertically"
    />
  );
};
