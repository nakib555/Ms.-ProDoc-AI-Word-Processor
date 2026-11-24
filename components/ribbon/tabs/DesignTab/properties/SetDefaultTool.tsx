import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';
import { saveDefaultPageConfig } from '../../../../../utils/measurement';

export const SetDefaultTool: React.FC = () => {
  const { pageConfig, showToast } = useEditor();
  return (
    <RibbonButton 
        icon={CheckCircle2} 
        label="Set as Default" 
        onClick={() => {
          saveDefaultPageConfig(pageConfig);
          showToast('Current page layout and formatting saved as default.', 'success');
        }} 
    />
  );
};
