import React from 'react';
import { Workflow } from 'lucide-react';
import { SmallRibbonButton } from '../common/InsertTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const SmartArtTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <SmallRibbonButton icon={Workflow} label="SmartArt" onClick={() => showToast('Use Shapes & Charts under Illustrations to create diagrams.', 'info')} iconClassName="text-emerald-500 dark:text-emerald-400" />
  );
};
