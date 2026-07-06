
import React, { useState } from 'react';
import { ListPlus } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReferencesTools';
import { useEditor } from '../../../../../contexts/EditorContext';
import { MenuPortal } from '../../../common/MenuPortal';

export const AddTextTool: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const { editor } = useEditor();
  const id = 'add-text-toc';

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPos({ x: rect.left, y: rect.bottom });
    setIsOpen(!isOpen);
  };

  const setHeading = (level: 1 | 2 | 3) => {
    if (editor) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setIsOpen(false);
  };

  return (
    <>
      <div id={id} onClick={handleClick}>
        <SmallRibbonButton icon={ListPlus} label="Add Text" onClick={() => {}} hasArrow />
      </div>
      <MenuPortal id={id} activeMenu={isOpen ? id : null} menuPos={menuPos} closeMenu={() => setIsOpen(false)} width={150}>
        <div className="py-1">
          <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm" onClick={() => setHeading(1)}>Level 1 (H1)</button>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm" onClick={() => setHeading(2)}>Level 2 (H2)</button>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm" onClick={() => setHeading(3)}>Level 3 (H3)</button>
          <div className="border-t border-slate-100 my-1"></div>
          <button className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm" onClick={() => editor?.chain().focus().setParagraph().run()}>Do Not Show in Table of Contents</button>
        </div>
      </MenuPortal>
    </>
  );
};
