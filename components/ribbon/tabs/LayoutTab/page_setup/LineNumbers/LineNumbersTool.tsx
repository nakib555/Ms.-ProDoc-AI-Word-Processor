
import React from 'react';
import { ListOrdered } from 'lucide-react';
import { RibbonButton } from '../../../../common/RibbonButton';
import { useEditor } from '../../../../../../contexts/EditorContext';

export const LineNumbersTool: React.FC = () => {
  const { openPageSetup, pageConfig } = useEditor();
  const isEnabled = Boolean(pageConfig.lineNumbers?.enabled);

  return (
    <RibbonButton 
      icon={ListOrdered} 
      label="Line Numbers" 
      onClick={() => openPageSetup('layout')} 
      hasArrow 
      className={isEnabled ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300' : ''}
      iconClassName="text-teal-600 dark:text-teal-400"
    />
  );
};
