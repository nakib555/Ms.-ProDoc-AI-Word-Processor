
import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { SmallRibbonButton } from '../common/ViewTools';
import { useEditor } from '../../../../../hooks/useEditor';

export const PageWidthTool: React.FC = () => {
  const { executeCommand } = useEditor();
  return <SmallRibbonButton icon={ArrowLeftRight} label="Page Width" onClick={() => executeCommand('fitWidth')} />;
};
