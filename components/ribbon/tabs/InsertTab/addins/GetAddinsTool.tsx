import React from 'react';
import { Puzzle } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const GetAddinsTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <RibbonButton icon={Puzzle} label="Get Add-ins" onClick={() => showToast('External Add-in Store is unavailable in offline mode.', 'info')} />
  );
};
