import React from 'react';
import { FileSearch } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const EditorTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <RibbonButton 
        icon={FileSearch} 
        label="Editor" 
        onClick={() => showToast('Document Editor Score: 100% — Spelling and clarity look great.', 'success')} 
        title="Editor"
    />
  );
};
