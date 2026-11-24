import React from 'react';
import { BookOpen } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReviewTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const ThesaurusTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <SmallRibbonButton 
        icon={BookOpen} 
        label="Thesaurus" 
        onClick={() => showToast('Select a word and right-click or use Smart Lookup for synonyms.', 'info')} 
        iconClassName="text-orange-500 dark:text-orange-400"
    />
  );
};
