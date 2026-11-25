
import React from 'react';
import { Globe } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const WebLayoutTool: React.FC = () => {
  const { viewMode, setViewMode } = useEditor();
  return (
    <RibbonButton 
        icon={Globe} 
        label="Web Layout" 
        onClick={() => setViewMode('web')} 
        active={viewMode === 'web'}
        iconClassName="text-indigo-600 dark:text-indigo-400"
    />
  );
};

