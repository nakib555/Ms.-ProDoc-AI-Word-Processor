import React from 'react';
import { Download } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const MyAddinsTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <RibbonButton icon={Download} label="My Add-ins" onClick={() => showToast('No third-party add-ins currently installed.', 'info')} hasArrow />
  );
};
