import React from 'react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { CheckboxItem } from '../common/ViewTools';

export const JsonInspectorCheckTool: React.FC = () => {
  const { showJsonInspector, setShowJsonInspector } = useEditor();
  return (
    <CheckboxItem 
      label="JSON Document Model" 
      checked={showJsonInspector} 
      onChange={() => setShowJsonInspector(!showJsonInspector)} 
    />
  );
};
