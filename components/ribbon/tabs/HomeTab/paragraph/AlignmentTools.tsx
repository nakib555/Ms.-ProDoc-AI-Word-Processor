
import React, { useState, useEffect } from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { ToolBtn } from '../common/HomeTools';

export const AlignmentTools: React.FC = () => {
  const { executeCommand } = useEditor();
  const [activeAlign, setActiveAlign] = useState({
    left: true,
    center: false,
    right: false,
    justify: false
  });

  const checkAlign = () => {
    setActiveAlign({
      left: document.queryCommandState('justifyLeft'),
      center: document.queryCommandState('justifyCenter'),
      right: document.queryCommandState('justifyRight'),
      justify: document.queryCommandState('justifyFull')
    });
  };

  useEffect(() => {
    document.addEventListener('selectionchange', checkAlign);
    document.addEventListener('mouseup', checkAlign);
    document.addEventListener('keyup', checkAlign);
    
    // Initial check
    checkAlign();
    
    return () => {
      document.removeEventListener('selectionchange', checkAlign);
      document.removeEventListener('mouseup', checkAlign);
      document.removeEventListener('keyup', checkAlign);
    };
  }, []);

  return (
    <>
         <ToolBtn icon={AlignLeft} onClick={() => { executeCommand('justifyLeft'); checkAlign(); }} title="Align Left (Ctrl+L)" active={activeAlign.left} iconClass="text-slate-700 dark:text-slate-300" />
         <ToolBtn icon={AlignCenter} onClick={() => { executeCommand('justifyCenter'); checkAlign(); }} title="Center (Ctrl+E)" active={activeAlign.center} iconClass="text-slate-700 dark:text-slate-300" />
         <ToolBtn icon={AlignRight} onClick={() => { executeCommand('justifyRight'); checkAlign(); }} title="Align Right (Ctrl+R)" active={activeAlign.right} iconClass="text-slate-700 dark:text-slate-300" />
         <ToolBtn icon={AlignJustify} onClick={() => { executeCommand('justifyFull'); checkAlign(); }} title="Justify (Ctrl+J)" active={activeAlign.justify} iconClass="text-slate-700 dark:text-slate-300" />
    </>
  );
};
