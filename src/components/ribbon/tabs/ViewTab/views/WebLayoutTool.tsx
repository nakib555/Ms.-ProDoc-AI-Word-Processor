
import React from 'react';
import { Globe } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const WebLayoutTool: React.FC = () => {
  const { viewMode, setViewMode, isAIProcessing } = useEditor();
  return (
    <div className={isAIProcessing ? "opacity-50 cursor-not-allowed" : ""}>
        <RibbonButton 
            icon={Globe} 
            label="Web Layout" 
            onClick={() => !isAIProcessing && setViewMode('web')} 
            className={viewMode === 'web' ? 'bg-slate-100 text-blue-700' : ''}
            iconClassName="text-indigo-600"
        />
    </div>
  );
};

