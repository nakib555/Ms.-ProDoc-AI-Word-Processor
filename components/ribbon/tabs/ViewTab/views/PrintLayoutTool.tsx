
import React from 'react';
import { FileText } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../hooks/useEditor';

export const PrintLayoutTool: React.FC = () => {
  const { viewMode, setViewMode } = useEditor();
  return (
    <RibbonButton 
        icon={FileText} 
        label="Print Layout" 
        onClick={() => setViewMode('print')} 
        className={viewMode === 'print' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200' : ''}
        iconClassName="text-indigo-600"
    />
  );
};

