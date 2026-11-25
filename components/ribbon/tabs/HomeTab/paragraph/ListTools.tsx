import React, { useState, useEffect, useCallback } from 'react';
import { List, ListOrdered, ListTree, Indent, Outdent, Check } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { ToolBtn } from '../common/HomeTools';
import { MenuPortal } from '../../../common/MenuPortal';

export const ListTools: React.FC = () => {
  const { executeCommand, editor } = useEditor();
  const { activeMenu, toggleMenu, closeMenu, menuPos, triggerElement, registerTrigger } = useHomeTab();
  const menuId = 'multilevel_list';
  const [activeList, setActiveList] = useState({
    unordered: false,
    ordered: false,
    listStyleType: ''
  });

  const checkList = useCallback(() => {
    const safeQuery = (cmd: string) => {
      try {
        return document.queryCommandState(cmd);
      } catch {
        return false;
      }
    };

    const sel = typeof window !== 'undefined' ? window.getSelection() : null;
    const anchor = sel?.anchorNode;
    const el = anchor instanceof HTMLElement ? anchor : anchor?.parentElement;
    const listEl = el?.closest('ol, ul') as HTMLElement | null;

    setActiveList({
      unordered: editor?.isActive('bulletList') || safeQuery('insertUnorderedList'),
      ordered: editor?.isActive('orderedList') || safeQuery('insertOrderedList'),
      listStyleType: listEl?.style.listStyleType || ''
    });
  }, [editor]);

  useEffect(() => {
    const id = setTimeout(checkList, 0);
    document.addEventListener('selectionchange', checkList);
    document.addEventListener('mouseup', checkList);
    document.addEventListener('keyup', checkList);
    editor?.on('selectionUpdate', checkList);
    editor?.on('transaction', checkList);

    return () => {
      clearTimeout(id);
      document.removeEventListener('selectionchange', checkList);
      document.removeEventListener('mouseup', checkList);
      document.removeEventListener('keyup', checkList);
      editor?.off('selectionUpdate', checkList);
      editor?.off('transaction', checkList);
    };
  }, [checkList, editor]);

  const applyMultilevelStyle = (listStyleType: string, ordered: boolean) => {
    const cmd = ordered ? 'insertOrderedList' : 'insertUnorderedList';
    if ((ordered && !activeList.ordered) || (!ordered && !activeList.unordered)) {
      executeCommand(cmd);
    }
    const sel = window.getSelection();
    const anchor = sel?.anchorNode;
    const el = anchor instanceof HTMLElement ? anchor : anchor?.parentElement;
    const listEl = el?.closest('ol, ul') as HTMLElement | null;
    if (listEl) {
      listEl.style.listStyleType = listStyleType;
      listEl.closest('[contenteditable="true"]')?.dispatchEvent(new Event('input', { bubbles: true }));
    }
    checkList();
    closeMenu();
  };

  const listStyles = [
    { key: 'decimal', ordered: true, label: '1. / a. / i.', desc: 'Standard multilevel hierarchy' },
    { key: 'upper-roman', ordered: true, label: 'I. / A. / 1.', desc: 'Roman outline numbering' },
    { key: 'lower-alpha', ordered: true, label: 'a. / b. / c.', desc: 'Alphabetical outline' },
    { key: 'square', ordered: false, label: '■ / ◦ / •', desc: 'Symbolic multilevel bullets' },
  ];

  return (
    <>
      <ToolBtn icon={List} onClick={() => { executeCommand('insertUnorderedList'); checkList(); }} title="Bullets" active={activeList.unordered} iconClass="text-indigo-600 dark:text-indigo-400" />
      <ToolBtn icon={ListOrdered} onClick={() => { executeCommand('insertOrderedList'); checkList(); }} title="Numbering" active={activeList.ordered} iconClass="text-blue-600 dark:text-blue-400" />
      <button
        ref={(el) => registerTrigger(menuId, el)}
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => { e.stopPropagation(); toggleMenu(menuId); }}
        aria-haspopup="menu"
        aria-expanded={activeMenu === menuId}
        title="Multilevel List"
        className={`p-1 rounded-md flex items-center justify-center transition-all w-[30px] h-[30px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
          activeMenu === menuId || (activeList.ordered && activeList.listStyleType)
            ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-300 dark:ring-blue-700'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
        }`}
      >
        <ListTree className="w-4 h-4 text-cyan-600 dark:text-cyan-400" strokeWidth={2} />
      </button>
      <MenuPortal id={menuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={220} title="Multilevel List">
        <div className="p-1.5 space-y-0.5">
          <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1">List Library</div>
          {listStyles.map((item) => {
            const isSelected =
              ((item.ordered && activeList.ordered) || (!item.ordered && activeList.unordered)) &&
              activeList.listStyleType === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => applyMultilevelStyle(item.key, item.ordered)}
                className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center justify-between text-xs transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200'
                }`}
              >
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </div>
                {isSelected && <Check size={12} className="text-blue-600 dark:text-blue-400 shrink-0" />}
              </button>
            );
          })}
          <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => { executeCommand('indent'); closeMenu(); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/60 text-xs text-slate-700 dark:text-slate-200"
          >
            <Indent size={13} className="text-blue-500" /> Increase List Level
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => { executeCommand('outdent'); closeMenu(); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/60 text-xs text-slate-700 dark:text-slate-200"
          >
            <Outdent size={13} className="text-blue-500" /> Decrease List Level
          </button>
        </div>
      </MenuPortal>
    </>
  );
};
