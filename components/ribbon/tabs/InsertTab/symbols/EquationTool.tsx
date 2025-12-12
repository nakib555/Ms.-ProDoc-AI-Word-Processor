
import React from 'react';
import { Sigma } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const EquationTool: React.FC = () => {
  const { executeCommand } = useEditor();

  const insertEquation = () => {
      // Insert a structured equation box mimicking MS Word
      // Wrapper has contenteditable="false" to act as a single block for the editor's cursor handling logic,
      // but allows focus to enter the math-field inside.
      // Using zero-width spaces (&#8203;) for seamless cursor boundary
      const html = `&#8203;<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type equation here."></math-field><span class="equation-dropdown">▼</span></span>&#8203;`;
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
