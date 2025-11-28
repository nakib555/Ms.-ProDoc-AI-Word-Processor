
import React from 'react';
import { Sigma } from 'lucide-react';
import { RibbonButton } from '../../../../../../common/RibbonButton';
import { useEditor } from '../../../../../../../../contexts/EditorContext';

export const EquationBoxTool: React.FC = () => {
  const { executeCommand } = useEditor();
  
  // Insert structured Equation Box
  const insertStructure = (html: string) => executeCommand('insertHTML', html);

  // Use zero-width spaces (&#8203;) around the wrapper
  const boxHtml = `&#8203;<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type equation here."></math-field><span class="equation-dropdown">▼</span></span>&#8203;`;

  return (
    <RibbonButton 
        icon={Sigma} 
        label="Equation" 
        onClick={() => insertStructure(boxHtml)} 
        hasArrow 
        className="min-w-[60px]"
        title="Insert Equation Box"
    />
  );
};
