
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReferencesTools';
import { useEditor } from '../../../../../contexts/EditorContext';

export const NextFootnoteTool: React.FC = () => {
  const { editor } = useEditor();

  const handleNextFootnote = () => {
    if (!editor) return;
    const currentPos = editor.state.selection.from;
    let foundPos = -1;
    let firstPos = -1;

    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'footnoteReference' || node.type.name === 'endnoteReference') {
        if (firstPos === -1) {
          firstPos = pos;
        }
        if (pos > currentPos && foundPos === -1) {
          foundPos = pos;
        }
      }
    });

    const targetPos = foundPos !== -1 ? foundPos : firstPos;
    if (targetPos !== -1) {
      editor.commands.setTextSelection(targetPos);
    }
  };

  return (
    <SmallRibbonButton icon={ArrowRight} label="Next Footnote" onClick={handleNextFootnote} hasArrow />
  );
};
