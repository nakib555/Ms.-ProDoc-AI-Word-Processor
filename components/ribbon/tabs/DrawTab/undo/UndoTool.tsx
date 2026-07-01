
import React from 'react';
import { Undo } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const UndoTool: React.FC = () => {
  const { undo, canUndo } = useEditor();
  return <RibbonButton icon={Undo} label="Undo" onClick={undo} disabled={!canUndo} />;
};
