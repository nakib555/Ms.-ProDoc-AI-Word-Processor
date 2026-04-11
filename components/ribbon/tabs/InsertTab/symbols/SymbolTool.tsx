
import React from 'react';
import { Omega } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const SymbolTool: React.FC = () => {
  const { executeCommand } = useEditor();
  
  const insertSymbol = () => {
      const activeEl = document.activeElement;
      const isMathField = activeEl?.tagName.toLowerCase() === 'math-field';
      if (isMathField) {
          (activeEl as any).executeCommand(['insert', '™', { focus: true }]);
      } else {
          executeCommand('insertText', '™');
      }
  };

  return (
      <RibbonButton icon={Omega} label="Symbol" onClick={insertSymbol} hasArrow />
  );
};
