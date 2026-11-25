
import React, { useState } from 'react';
import { ListPlus } from 'lucide-react';
import { SmallRibbonButton } from '../common/ReferencesTools';
import { useEditor } from '../../../../../contexts/EditorContext';
import { MenuPortal } from '../../../common/MenuPortal';

export const AddTextTool: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLDivElement | null>(null);
  const { editor } = useEditor();
  const id = 'add-text-toc';

  const setHeading = (level: 1 | 2 | 3) => {
    if (editor) {
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setIsOpen(false);
  };

  return (
    <>
      <div ref={setTriggerEl} id={id}>
        <SmallRibbonButton icon={ListPlus} label="Add Text" onClick={() => setIsOpen(prev => !prev)} hasArrow />
      </div>
      <MenuPortal id={id} activeMenu={isOpen ? id : null} triggerElement={triggerEl} closeMenu={() => setIsOpen(false)} width={170}>
        <div className="p-1 space-y-0.5">
          <button className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs text-slate-700 dark:text-slate-200" onClick={() => setHeading(1)}>Level 1 (H1)</button>
          <button className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs text-slate-700 dark:text-slate-200" onClick={() => setHeading(2)}>Level 2 (H2)</button>
          <button className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs text-slate-700 dark:text-slate-200" onClick={() => setHeading(3)}>Level 3 (H3)</button>
          <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>
          <button className="w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-xs text-slate-700 dark:text-slate-200" onClick={() => { editor?.chain().focus().setParagraph().run(); setIsOpen(false); }}>Do Not Show in TOC</button>
        </div>
      </MenuPortal>
    </>
  );
};
