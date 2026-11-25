import React, { useState, useEffect, useCallback } from 'react';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { ToolBtn } from '../common/HomeTools';

export const AlignmentTools: React.FC = () => {
  const { executeCommand, editor } = useEditor();
  const [activeAlign, setActiveAlign] = useState({
    left: true,
    center: false,
    right: false,
    justify: false
  });

  const checkAlign = useCallback(() => {
    const safeQuery = (cmd: string) => {
      try {
        return document.queryCommandState(cmd);
      } catch {
        return false;
      }
    };

    const center = editor?.isActive({ textAlign: 'center' }) || safeQuery('justifyCenter');
    const right = editor?.isActive({ textAlign: 'right' }) || safeQuery('justifyRight');
    const justify = editor?.isActive({ textAlign: 'justify' }) || safeQuery('justifyFull');
    const left = editor?.isActive({ textAlign: 'left' }) || safeQuery('justifyLeft') || (!center && !right && !justify);

    setActiveAlign({ left, center, right, justify });
  }, [editor]);

  useEffect(() => {
    const id = setTimeout(checkAlign, 0);
    document.addEventListener('selectionchange', checkAlign);
    document.addEventListener('mouseup', checkAlign);
    document.addEventListener('keyup', checkAlign);
    editor?.on('selectionUpdate', checkAlign);
    editor?.on('transaction', checkAlign);

    return () => {
      clearTimeout(id);
      document.removeEventListener('selectionchange', checkAlign);
      document.removeEventListener('mouseup', checkAlign);
      document.removeEventListener('keyup', checkAlign);
      editor?.off('selectionUpdate', checkAlign);
      editor?.off('transaction', checkAlign);
    };
  }, [checkAlign, editor]);

  return (
    <>
      <ToolBtn icon={AlignLeft} onClick={() => { executeCommand('justifyLeft'); checkAlign(); }} title="Align Left (Ctrl+L)" active={activeAlign.left} iconClass="text-slate-700 dark:text-slate-300" />
      <ToolBtn icon={AlignCenter} onClick={() => { executeCommand('justifyCenter'); checkAlign(); }} title="Center (Ctrl+E)" active={activeAlign.center} iconClass="text-slate-700 dark:text-slate-300" />
      <ToolBtn icon={AlignRight} onClick={() => { executeCommand('justifyRight'); checkAlign(); }} title="Align Right (Ctrl+R)" active={activeAlign.right} iconClass="text-slate-700 dark:text-slate-300" />
      <ToolBtn icon={AlignJustify} onClick={() => { executeCommand('justifyFull'); checkAlign(); }} title="Justify (Ctrl+J)" active={activeAlign.justify} iconClass="text-slate-700 dark:text-slate-300" />
    </>
  );
};
