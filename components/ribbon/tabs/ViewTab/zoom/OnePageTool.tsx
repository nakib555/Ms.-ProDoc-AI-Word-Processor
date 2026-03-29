
import React from 'react';
import { File } from 'lucide-react';
import { SmallRibbonButton } from '../common/ViewTools';
import { useEditor } from '../../../../../hooks/useEditor';

export const OnePageTool: React.FC = () => {
  const { executeCommand } = useEditor();
  return <SmallRibbonButton icon={File} label="One Page" onClick={() => executeCommand('fitPage')} />;
};
