
import React from 'react';
import { MoveHorizontal } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const SideToSideTool: React.FC = () => {
  const { pageMovement, setPageMovement } = useEditor();

  return (
    <RibbonButton 
        icon={MoveHorizontal} 
        label="Side to Side" 
        onClick={() => setPageMovement('side-to-side')} 
        active={pageMovement === 'side-to-side'}
        title="View pages side by side"
    />
  );
};
