
import React from 'react';
import { SeparatorHorizontal } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { SmallRibbonButton } from '../common/InsertTools';

export const PageBreakTool: React.FC = () => {
  const { executeCommand } = useEditor();
  return (
    <SmallRibbonButton 
        icon={SeparatorHorizontal} 
        label="Page Break" 
        onClick={() => executeCommand('insertHTML', '<div class="prodoc-page-break" style="page-break-after: always; height: 0; width: 100%; display: block;"></div>&#8203;')} 
        iconClassName="text-sky-500"
    />
  );
};
