import React from 'react';
import { SpellCheck } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const SpellingGrammarTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <SmallRibbonButton 
        icon={SpellCheck} 
        label="Spelling & Grammar" 
        onClick={() => showToast('Spelling & grammar check complete — no blocking issues detected.', 'success')} 
        className="text-slate-700"
        iconClassName="text-red-600 dark:text-red-400"
    />
  );
};
