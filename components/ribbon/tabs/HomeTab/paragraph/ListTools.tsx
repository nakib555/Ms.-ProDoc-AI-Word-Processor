
import React, { useState, useEffect } from 'react';
import { List, ListOrdered, ListTree } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { ToolBtn } from '../common/HomeTools';

export const ListTools: React.FC = () => {
  const { executeCommand } = useEditor();
  const [activeList, setActiveList] = useState({
    unordered: false,
    ordered: false
  });

  const checkList = () => {
    setActiveList({
      unordered: document.queryCommandState('insertUnorderedList'),
      ordered: document.queryCommandState('insertOrderedList')
    });
  };

  useEffect(() => {
    document.addEventListener('selectionchange', checkList);
    document.addEventListener('mouseup', checkList);
    document.addEventListener('keyup', checkList);
    
    checkList();
    
    return () => {
      document.removeEventListener('selectionchange', checkList);
      document.removeEventListener('mouseup', checkList);
      document.removeEventListener('keyup', checkList);
    };
  }, []);

  return (
    <>
        <ToolBtn icon={List} onClick={() => { executeCommand('insertUnorderedList'); checkList(); }} title="Bullets" active={activeList.unordered} iconClass="text-indigo-600 dark:text-indigo-400" />
        <ToolBtn icon={ListOrdered} onClick={() => { executeCommand('insertOrderedList'); checkList(); }} title="Numbering" active={activeList.ordered} iconClass="text-blue-600 dark:text-blue-400" />
        <ToolBtn icon={ListTree} onClick={() => {}} title="Multilevel List" disabled iconClass="text-cyan-600 dark:text-cyan-400 opacity-50" />
    </>
  );
};
