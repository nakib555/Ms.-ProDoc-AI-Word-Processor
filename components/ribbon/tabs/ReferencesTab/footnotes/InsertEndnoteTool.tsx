
import React from 'react';
import { ScrollText } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReferencesTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const InsertEndnoteTool: React.FC = () => {
  const { addEndnote } = useEditor();
  return (
    <SmallRibbonButton icon={ScrollText} label="Insert Endnote" onClick={() => addEndnote()} />
  );
};
