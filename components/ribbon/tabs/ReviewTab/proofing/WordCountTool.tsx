import React from 'react';
import { Hash } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const WordCountTool: React.FC = () => {
  const { setShowWordCountDialog } = useEditor();
  return (
    <SmallRibbonButton 
        icon={Hash} 
        label="Word Count" 
        onClick={() => setShowWordCountDialog(true)} 
        iconClassName="text-blue-500 dark:text-blue-400"
    />
  );
};
