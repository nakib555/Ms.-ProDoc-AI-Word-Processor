
import React from 'react';
import { Sigma } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const EquationTool: React.FC = () => {
  const { executeCommand } = useEditor();

  const insertEquation = () => {
      // Insert a structured equation box mimicking MS Word
      const html = `&#8203;<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type equation here."></math-field><span class="equation-dropdown">▼</span></span>&#8203;`;
      executeCommand('insertHTML', html);
  };

  return (
      <RibbonButton 
        icon={Sigma} 
        label="Equation" 
        onClick={insertEquation} 
        hasArrow 
        iconClassName="text-green-600"
      />
  );
};
