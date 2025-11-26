

import React from 'react';
import { Sigma } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const EquationTool: React.FC = () => {
  const { executeCommand } = useEditor();

  const insertEquation = () => {
      const html = '<div class="prodoc-equation" style="text-align: center; margin: 1em 0;"><span style="display: inline-block; border: 1px solid #cbd5e1; padding: 4px 8px; border-radius: 2px; color: #64748b; min-width: 100px; font-style: italic; background-color: #f8fafc;">Type equation here.</span></div><p><br/></p>';
      executeCommand('insertHTML', html);
  };

  return (
      <RibbonButton 
        icon={Sigma} 
        label="Equation" 
        onClick={insertEquation} 
        hasArrow 
      />
  );
};