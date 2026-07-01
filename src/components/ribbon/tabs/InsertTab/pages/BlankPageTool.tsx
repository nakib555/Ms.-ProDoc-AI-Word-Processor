
import React from 'react';
import { FilePlus } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { SmallRibbonButton } from '../common/InsertTools';

export const BlankPageTool: React.FC = () => {
  const { executeCommand } = useEditor();
  return (
    <SmallRibbonButton 
        icon={FilePlus} 
        label="Blank Page" 
        onClick={() => executeCommand('insertHTML', '<div class="prodoc-page-break" style="page-break-after: always; height: 0; width: 100%; display: block;"></div>&#8203;')} 
    />
  );
};
