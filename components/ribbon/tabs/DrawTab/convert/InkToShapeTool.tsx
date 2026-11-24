import React from 'react';
import { Shapes } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const InkToShapeTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <RibbonButton 
       icon={Shapes} 
       label="Ink to Shape" 
       onClick={() => showToast('Ink to Shape mode: draw freehand shapes in the Draw tab to snap geometry.', 'info')} 
    />
  );
};