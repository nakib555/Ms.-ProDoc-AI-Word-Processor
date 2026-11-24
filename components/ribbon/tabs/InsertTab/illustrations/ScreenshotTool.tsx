import React from 'react';
import { Camera } from 'lucide-react';
import { SmallRibbonButton } from '../common/InsertTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ScreenshotTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <SmallRibbonButton icon={Camera} label="Screenshot" onClick={() => showToast('Paste any screenshot directly (Ctrl+V) into the document.', 'info')} iconClassName="text-purple-500 dark:text-purple-400" />
  );
};
