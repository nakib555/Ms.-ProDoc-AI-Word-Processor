import React from 'react';
import { Indent, Outdent, Pilcrow, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import { useEditor } from '../../../../../contexts/EditorContext';
import { useHomeTab } from '../HomeTabContext';
import { ToolBtn } from '../common/HomeTools';
import { MenuPortal } from '../../../common/MenuPortal';

export const IndentTools: React.FC = () => {
  const { executeCommand, showFormattingMarks, setShowFormattingMarks, showToast } = useEditor();
  const { activeMenu, toggleMenu, closeMenu, menuPos, triggerElement, registerTrigger } = useHomeTab();
  const sortMenuId = 'home_sort';

  const handleSort = (direction: 'asc' | 'desc') => {
    const sel = window.getSelection();
    const anchor = sel?.anchorNode;
    const el = anchor instanceof HTMLElement ? anchor : anchor?.parentElement;

    const table = el?.closest('table') as HTMLTableElement | null;
    if (table) {
      const cell = el?.closest('td, th') as HTMLTableCellElement | null;
      const colIdx = cell ? cell.cellIndex : 0;
      const tbody = table.tBodies[0] || table;
      const allRows = Array.from(tbody.rows);
      const hasHeader = table.tHead !== null || allRows[0]?.cells[0]?.tagName === 'TH';
      const dataRows = hasHeader ? allRows.slice(1) : allRows;

      if (dataRows.length < 2) {
        showToast('Not enough table rows to sort.', 'info');
        closeMenu();
        return;
      }

      dataRows.sort((a, b) => {
        const textA = (a.cells[colIdx]?.innerText || '').trim();
        const textB = (b.cells[colIdx]?.innerText || '').trim();
        const numA = parseFloat(textA);
        const numB = parseFloat(textB);
        const cmp = !isNaN(numA) && !isNaN(numB)
          ? numA - numB
          : textA.localeCompare(textB, undefined, { numeric: true, sensitivity: 'base' });
        return direction === 'asc' ? cmp : -cmp;
      });

      dataRows.forEach(row => tbody.appendChild(row));
      table.closest('[contenteditable="true"]')?.dispatchEvent(new Event('input', { bubbles: true }));
      showToast(`Sorted table column ${direction === 'asc' ? 'ascending' : 'descending'}.`, 'success');
      closeMenu();
      return;
    }

    const editorRoot = el?.closest('[contenteditable="true"]') as HTMLElement | null;
    if (editorRoot && sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const blocks = Array.from(editorRoot.children).filter((child): child is HTMLElement =>
        ['P', 'DIV', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(child.tagName)
      );
      const selectedBlocks = !range.collapsed
        ? blocks.filter(b => range.intersectsNode(b))
        : blocks;

      if (selectedBlocks.length >= 2) {
        const sorted = [...selectedBlocks].sort((a, b) => {
          const cmp = (a.innerText || '').trim().localeCompare((b.innerText || '').trim(), undefined, { numeric: true, sensitivity: 'base' });
          return direction === 'asc' ? cmp : -cmp;
        });
        const parent = selectedBlocks[0].parentElement;
        const anchorNext = selectedBlocks[selectedBlocks.length - 1].nextSibling;
        if (parent) {
          sorted.forEach(node => parent.insertBefore(node, anchorNext));
          editorRoot.dispatchEvent(new Event('input', { bubbles: true }));
          showToast(`Sorted ${sorted.length} paragraphs ${direction === 'asc' ? 'A→Z' : 'Z→A'}.`, 'success');
          closeMenu();
          return;
        }
      }
    }

    showToast('Select multiple paragraphs or place cursor inside a table to sort.', 'info');
    closeMenu();
  };

  return (
    <>
        <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <ToolBtn icon={Outdent} onClick={() => executeCommand('outdent')} title="Decrease Indent" iconClass="text-blue-500 dark:text-blue-400" />
        <ToolBtn icon={Indent} onClick={() => executeCommand('indent')} title="Increase Indent" iconClass="text-blue-500 dark:text-blue-400" />
        <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <button
          ref={(el) => registerTrigger(sortMenuId, el)}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => { e.stopPropagation(); toggleMenu(sortMenuId); }}
          title="Sort"
          className={`p-1 rounded-md flex items-center justify-center transition-all w-7 h-7 ${activeMenu === sortMenuId ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'}`}
        >
          <ArrowDownAZ className="w-4 h-4 text-orange-500 dark:text-orange-400" strokeWidth={2} />
        </button>
        <MenuPortal id={sortMenuId} activeMenu={activeMenu} triggerElement={triggerElement} menuPos={menuPos} closeMenu={closeMenu} width={175}>
          <div className="p-1.5 space-y-0.5">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1">Sort Selection / Table</div>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSort('asc')}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/60 text-xs text-slate-700 dark:text-slate-200"
            >
              <ArrowDownAZ size={14} className="text-orange-500" /> Ascending (A → Z)
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSort('desc')}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700/60 text-xs text-slate-700 dark:text-slate-200"
            >
              <ArrowUpZA size={14} className="text-orange-500" /> Descending (Z → A)
            </button>
          </div>
        </MenuPortal>
        <ToolBtn 
            icon={Pilcrow} 
            onClick={() => setShowFormattingMarks(!showFormattingMarks)} 
            title="Show/Hide ¶" 
            active={showFormattingMarks} 
            iconClass="text-sky-500 dark:text-sky-400"
        />
    </>
  );
};
