
import React from 'react';
import { Redo } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const RedoTool: React.FC = () => {
  const { redo, canRedo } = useEditor();
  return <RibbonButton icon={Redo} label="Redo" onClick={redo} disabled={!canRedo} />;
};
