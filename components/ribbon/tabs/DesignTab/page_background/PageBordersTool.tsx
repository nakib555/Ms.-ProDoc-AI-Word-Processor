import React from 'react';
import { Square } from 'lucide-react';
import { RibbonButton } from '../../../common/RibbonButton';
import { useEditor } from '../../../../../contexts/EditorContext';

export const PageBordersTool: React.FC = () => {
  const { setShowPageBordersDialog } = useEditor();
  return (
    <RibbonButton 
        icon={Square} 
        label="Page Borders" 
        onClick={() => setShowPageBordersDialog(true)} 
    />
  );
};
