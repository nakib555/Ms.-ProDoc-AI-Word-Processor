
import React from 'react';
import { Minus } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const HyphenationTool: React.FC = () => {
  const { pageConfig, setPageConfig } = useEditor();

  const toggleHyphenation = () => {
      setPageConfig(prev => ({ ...prev, hyphenation: !prev.hyphenation }));
  };

  return (
    <RibbonButton 
        icon={Minus} 
        label="Hyphenation" 
        onClick={toggleHyphenation} 
        hasArrow 
        className={pageConfig.hyphenation ? 'bg-slate-200 dark:bg-slate-700' : ''}
    />
  );
};
