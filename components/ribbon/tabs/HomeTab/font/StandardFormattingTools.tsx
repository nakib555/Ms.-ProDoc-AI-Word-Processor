import React, { useState, useEffect, useCallback } from 'react';
import {
  Bold, Italic, Underline, Strikethrough, Subscript, Superscript
} from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { ToolBtn, GroupRow } from '../common/HomeTools';

export const StandardFormattingTools: React.FC = () => {
  const { executeCommand, editor } = useEditor();
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    subscript: false,
    superscript: false
  });

  const checkFormats = useCallback(() => {
    const safeQuery = (cmd: string) => {
      try {
        return document.queryCommandState(cmd);
      } catch {
        return false;
      }
    };

    const sel = typeof window !== 'undefined' ? window.getSelection() : null;
    const anchorEl = sel?.anchorNode
      ? sel.anchorNode.nodeType === Node.TEXT_NODE
        ? sel.anchorNode.parentElement
        : (sel.anchorNode as HTMLElement)
      : null;

    setActiveFormats({
      bold: editor?.isActive('bold') || safeQuery('bold'),
      italic: editor?.isActive('italic') || safeQuery('italic'),
      underline: editor?.isActive('underline') || safeQuery('underline'),
      strikethrough: editor?.isActive('strike') || safeQuery('strikethrough'),
      subscript: Boolean(anchorEl?.closest('sub')) || safeQuery('subscript'),
      superscript: Boolean(anchorEl?.closest('sup')) || safeQuery('superscript'),
    });
  }, [editor]);

  useEffect(() => {
    checkFormats();
    document.addEventListener('selectionchange', checkFormats);
    document.addEventListener('mouseup', checkFormats);
    document.addEventListener('keyup', checkFormats);
    editor?.on('selectionUpdate', checkFormats);
    editor?.on('transaction', checkFormats);

    return () => {
      document.removeEventListener('selectionchange', checkFormats);
      document.removeEventListener('mouseup', checkFormats);
      document.removeEventListener('keyup', checkFormats);
      editor?.off('selectionUpdate', checkFormats);
      editor?.off('transaction', checkFormats);
    };
  }, [checkFormats, editor]);

  return (
    <GroupRow>
      <ToolBtn
        icon={Bold}
        onClick={() => { executeCommand('bold'); checkFormats(); }}
        title="Bold (Ctrl+B)"
        active={activeFormats.bold}
        iconClass="text-blue-700 dark:text-blue-400 font-bold"
      />
      <ToolBtn
        icon={Italic}
        onClick={() => { executeCommand('italic'); checkFormats(); }}
        title="Italic (Ctrl+I)"
        active={activeFormats.italic}
        iconClass="text-orange-600 dark:text-orange-400"
      />
      <ToolBtn
        icon={Underline}
        onClick={() => { executeCommand('underline'); checkFormats(); }}
        title="Underline (Ctrl+U)"
        active={activeFormats.underline}
        iconClass="text-emerald-600 dark:text-emerald-400"
      />
      <ToolBtn
        icon={Strikethrough}
        onClick={() => { executeCommand('strikeThrough'); checkFormats(); }}
        title="Strikethrough"
        active={activeFormats.strikethrough}
        iconClass="text-rose-500 dark:text-rose-400"
      />
      <ToolBtn
        icon={Subscript}
        onClick={() => { executeCommand('subscript'); checkFormats(); }}
        title="Subscript (Ctrl+=)"
        active={activeFormats.subscript}
        iconClass="text-purple-600 dark:text-purple-400"
      />
      <ToolBtn
        icon={Superscript}
        onClick={() => { executeCommand('superscript'); checkFormats(); }}
        title="Superscript (Ctrl+Shift++)"
        active={activeFormats.superscript}
        iconClass="text-purple-600 dark:text-purple-400"
      />
    </GroupRow>
  );
};
