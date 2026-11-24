import React from 'react';
import { Box } from 'lucide-react';
import { SmallRibbonButton } from '../common/InsertTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ThreeDModelsTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <SmallRibbonButton icon={Box} label="3D Models" onClick={() => showToast('Insert local PNG/SVG graphics via Pictures.', 'info')} iconClassName="text-orange-500 dark:text-orange-400" />
  );
};
