
import { useContext } from 'react';
import { EditorContext, EditorContextType } from '../contexts/EditorContext';

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
