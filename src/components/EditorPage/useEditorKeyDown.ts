import React from 'react';
import { useEditor } from '../../contexts/EditorContext';

interface UseEditorKeyDownProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  pageNumber: number;
  totalPages: number;
  readOnly?: boolean;
  isKeyboardLocked: boolean;
  selectionMode: boolean;
  onContentChange?: (html: string, pageIndex: number) => void;
}

export const useEditorKeyDown = ({
  editorRef,
  pageNumber,
  totalPages,
  readOnly,
  isKeyboardLocked,
  selectionMode,
  onContentChange,
}: UseEditorKeyDownProps) => {
  const { undo, redo } = useEditor();

  const selectCellContent = (cell: HTMLTableCellElement) => {
    const range = document.createRange();
    range.selectNodeContents(cell);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    cell.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const handleTableNavigation = (e: React.KeyboardEvent): boolean => {
    if (e.key !== 'Tab') return false;
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return false;
    let node = sel.anchorNode;
    let cell: HTMLTableCellElement | null = null;
    while (node && node !== editorRef.current) {
      if (node.nodeName === 'TD' || node.nodeName === 'TH') {
        cell = node as HTMLTableCellElement;
        break;
      }
      node = node.parentNode;
    }
    if (!cell) return false;
    e.preventDefault();
    const row = cell.parentElement as HTMLTableRowElement;
    const table = row.parentElement?.closest('table') as HTMLTableElement;
    if (!table || !row) return true;
    const allRows = Array.from(table.rows);
    const currentRowIndex = allRows.indexOf(row);
    const cells = Array.from(row.cells);
    const currentCellIndex = cell.cellIndex;

    if (!e.shiftKey) {
      if (currentCellIndex < cells.length - 1) selectCellContent(cells[currentCellIndex + 1]);
      else if (currentRowIndex < allRows.length - 1) {
        const nextRow = allRows[currentRowIndex + 1];
        if (nextRow.cells.length > 0) selectCellContent(nextRow.cells[0]);
      } else {
        const newRow = row.cloneNode(true) as HTMLTableRowElement;
        Array.from(newRow.cells).forEach((c) => (c.innerHTML = '<br>'));
        row.parentElement?.appendChild(newRow);
        selectCellContent(newRow.cells[0]);
        if (onContentChange && editorRef.current) onContentChange(editorRef.current.innerHTML, pageNumber - 1);
      }
    } else {
      if (currentCellIndex > 0) selectCellContent(cells[currentCellIndex - 1]);
      else if (currentRowIndex > 0) {
        const prevRow = allRows[currentRowIndex - 1];
        if (prevRow.cells.length > 0) selectCellContent(prevRow.cells[prevRow.cells.length - 1]);
      }
    }
    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
    if (handleTableNavigation(e)) return;
    if (
      isKeyboardLocked &&
      !selectionMode &&
      !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key) &&
      !(e.ctrlKey || e.metaKey)
    ) {
      e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && !e.altKey) {
      if (e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }
      if (e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
        return;
      }
    }
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !editorRef.current) return;
    const range = selection.getRangeAt(0);

    if (e.key === 'ArrowDown') {
      const editorRect = editorRef.current.getBoundingClientRect();
      const rangeRect = range.getBoundingClientRect();
      const cursorBottom = rangeRect.bottom !== 0 ? rangeRect.bottom : editorRect.bottom;
      if (editorRect.bottom - cursorBottom < 40) {
        if (pageNumber < totalPages) {
          e.preventDefault();
          const nextPage = document.getElementById(`prodoc-editor-${pageNumber + 1}`);
          if (nextPage) {
            nextPage.focus();
            const r = document.createRange();
            r.selectNodeContents(nextPage);
            r.collapse(true);
            selection.removeAllRanges();
            selection.addRange(r);
            nextPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    }
    if (e.key === 'ArrowUp') {
      const editorRect = editorRef.current.getBoundingClientRect();
      const rangeRect = range.getBoundingClientRect();
      const cursorTop = rangeRect.top !== 0 ? rangeRect.top : editorRect.top;
      if (cursorTop - editorRect.top < 40) {
        if (pageNumber > 1) {
          e.preventDefault();
          const prevPage = document.getElementById(`prodoc-editor-${pageNumber - 1}`);
          if (prevPage) {
            prevPage.focus();
            const r = document.createRange();
            r.selectNodeContents(prevPage);
            r.collapse(false);
            selection.removeAllRanges();
            selection.addRange(r);
          }
        }
      }
    }
  };

  return handleKeyDown;
};
