import React from 'react';
import { Smile } from 'lucide-react';
import { SmallRibbonButton } from '../common/InsertTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const IconsTool: React.FC = () => {
  const { showToast } = useEditor();
  return (
    <SmallRibbonButton icon={Smile} label="Icons" onClick={() => showToast('Insert inline vector symbols via Insert > Symbol.', 'info')} iconClassName="text-yellow-500" />
  );
};
