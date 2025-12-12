
import React from 'react';
import { Hash } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const WordCountTool: React.FC = () => {
  const { wordCount } = useEditor();
  return (
    <SmallRibbonButton 
        icon={Hash} 
        label="Word Count" 
        onClick={() => alert(`Word Count: ${wordCount}`)} 
        className="text-slate-600 group-hover:text-green-600"
    />
  );
};
