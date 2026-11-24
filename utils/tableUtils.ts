/**
 * Canonical MS Word-compatible Table Manipulation & Styling Engine.
 * Handles logical cell grids with colSpan/rowSpan, multi-cell selection,
 * header-aware row/col insertion, full-table cleanup on last row/col delete,
 * multi-cell merge & grid-preserving split, keyboard navigation, and Table Design styles.
 */

export interface GridSlot {
  cell: HTMLTableCellElement;
  isOrigin: boolean;
  originRow: number;
  originCol: number;
  colSpan: number;
  rowSpan: number;
}

export interface TableGrid {
  rows: HTMLTableRowElement[];
  matrix: (GridSlot | null)[][];
  colCount: number;
}

export interface CellGridPos {
  rowIndex: number;
  colIndex: number;
  colSpan: number;
  rowSpan: number;
  maxCols: number;
}

/** Build a logical 2D matrix of a table accounting for colSpan and rowSpan. */
export function buildTableGrid(table: HTMLTableElement): TableGrid {
  const rows = Array.from(table.rows);
  const matrix: (GridSlot | null)[][] = rows.map(() => []);
  let maxCols = 0;

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    let c = 0;
    const cells = Array.from(row.cells);
    for (let cellIdx = 0; cellIdx < cells.length; cellIdx++) {
      while (matrix[r][c]) c++;
      const cell = cells[cellIdx];
      const colSpan = Math.max(1, cell.colSpan || 1);
      const rowSpan = Math.max(1, cell.rowSpan || 1);

      for (let dr = 0; dr < rowSpan; dr++) {
        const targetRow = r + dr;
        if (targetRow >= rows.length) break;
        for (let dc = 0; dc < colSpan; dc++) {
          const targetCol = c + dc;
          if (!matrix[targetRow][targetCol]) {
            matrix[targetRow][targetCol] = {
              cell,
              isOrigin: dr === 0 && dc === 0,
              originRow: r,
              originCol: c,
              colSpan,
              rowSpan,
            };
          }
          if (targetCol + 1 > maxCols) maxCols = targetCol + 1;
        }
      }
      c += colSpan;
    }
  }

  for (let r = 0; r < rows.length; r++) {
    for (let col = 0; col < maxCols; col++) {
      if (matrix[r][col] === undefined) matrix[r][col] = null;
    }
  }

  return { rows, matrix, colCount: maxCols };
}

export function getCellGridPosition(table: HTMLTableElement, targetCell: HTMLTableCellElement): CellGridPos | null {
  const grid = buildTableGrid(table);
  for (let r = 0; r < grid.matrix.length; r++) {
    for (let c = 0; c < grid.colCount; c++) {
      const slot = grid.matrix[r][c];
      if (slot && slot.isOrigin && slot.cell === targetCell) {
        return {
          rowIndex: r,
          colIndex: c,
          colSpan: slot.colSpan,
          rowSpan: slot.rowSpan,
          maxCols: grid.colCount,
        };
      }
    }
  }
  return null;
}

export function getCellsInLogicalColumn(table: HTMLTableElement, colIndex: number): HTMLTableCellElement[] {
  const grid = buildTableGrid(table);
  const seen = new Set<HTMLTableCellElement>();
  const result: HTMLTableCellElement[] = [];
  for (let r = 0; r < grid.matrix.length; r++) {
    const slot = grid.matrix[r][colIndex];
    if (slot && !seen.has(slot.cell)) {
      seen.add(slot.cell);
      result.push(slot.cell);
    }
  }
  return result;
}

export function isCellVisuallyEmpty(cell: HTMLTableCellElement): boolean {
  const text = (cell.textContent || '').replace(/\u00a0/g, '').trim();
  if (text.length > 0) return false;
  return !cell.querySelector('img, math-field, table, svg, hr');
}

/**
 * MS Word Tab/Shift+Tab selection rule:
 * - If cell is empty, collapse caret at offset 0 (never highlight `<br>`).
 * - If cell has content, select its contents cleanly so typing replaces it.
 */
export function focusTableCellLikeWord(cell: HTMLTableCellElement, scroll = true): void {
  const sel = window.getSelection();
  if (!sel) return;
  const range = document.createRange();
  if (isCellVisuallyEmpty(cell)) {
    range.setStart(cell, 0);
    range.collapse(true);
  } else {
    range.selectNodeContents(cell);
  }
  sel.removeAllRanges();
  sel.addRange(range);
  if (scroll && typeof cell.scrollIntoView === 'function') {
    cell.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

export function clearSelectedCellHighlights(scope?: ParentNode): void {
  const root = scope || (typeof document !== 'undefined' ? document : null);
  if (!root) return;
  root.querySelectorAll('.selectedCell').forEach((el) => el.classList.remove('selectedCell'));
}

export function getSelectedTableCells(table: HTMLTableElement): HTMLTableCellElement[] {
  const marked = Array.from(table.querySelectorAll('td.selectedCell, th.selectedCell')) as HTMLTableCellElement[];
  if (marked.length > 0) return marked;

  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return [];
  const range = sel.getRangeAt(0);
  if (range.collapsed) {
    const anchorEl = range.anchorContainer instanceof Element
      ? range.anchorContainer
      : range.anchorContainer?.parentElement;
    const cell = anchorEl?.closest('td, th') as HTMLTableCellElement | null;
    return cell && table.contains(cell) ? [cell] : [];
  }

  const allCells = Array.from(table.querySelectorAll('td, th')) as HTMLTableCellElement[];
  const intersecting = allCells.filter((cell) => {
    try {
      return range.intersectsNode(cell);
    } catch {
      return false;
    }
  });
  return intersecting;
}

export function selectTableCellsRect(
  table: HTMLTableElement,
  startCell: HTMLTableCellElement,
  endCell: HTMLTableCellElement
): HTMLTableCellElement[] {
  const startPos = getCellGridPosition(table, startCell);
  const endPos = getCellGridPosition(table, endCell);
  if (!startPos || !endPos) return [];

  const minRow = Math.min(startPos.rowIndex, endPos.rowIndex);
  const maxRow = Math.max(startPos.rowIndex + startPos.rowSpan - 1, endPos.rowIndex + endPos.rowSpan - 1);
  const minCol = Math.min(startPos.colIndex, endPos.colIndex);
  const maxCol = Math.max(startPos.colIndex + startPos.colSpan - 1, endPos.colIndex + endPos.colSpan - 1);

  clearSelectedCellHighlights(table);
  const grid = buildTableGrid(table);
  const selected = new Set<HTMLTableCellElement>();

  for (let r = minRow; r <= maxRow && r < grid.matrix.length; r++) {
    for (let c = minCol; c <= maxCol && c < grid.colCount; c++) {
      const slot = grid.matrix[r][c];
      if (slot) {
        slot.cell.classList.add('selectedCell');
        selected.add(slot.cell);
      }
    }
  }
  return Array.from(selected);
}

export function selectTableTarget(
  table: HTMLTableElement,
  cell: HTMLTableCellElement,
  scope: 'cell' | 'row' | 'col' | 'table'
): void {
  clearSelectedCellHighlights(table);
  let cellsToMark: HTMLTableCellElement[] = [];

  if (scope === 'table') {
    cellsToMark = Array.from(table.querySelectorAll('td, th')) as HTMLTableCellElement[];
  } else if (scope === 'row') {
    const row = cell.closest('tr');
    if (row) cellsToMark = Array.from(row.cells);
  } else if (scope === 'col') {
    const pos = getCellGridPosition(table, cell);
    if (pos) cellsToMark = getCellsInLogicalColumn(table, pos.colIndex);
  } else {
    cellsToMark = [cell];
  }

  cellsToMark.forEach((c) => c.classList.add('selectedCell'));

  const sel = window.getSelection();
  if (sel && cellsToMark.length > 0) {
    const range = document.createRange();
    if (scope === 'table') {
      range.selectNodeContents(table);
    } else if (scope === 'row' && cell.closest('tr')) {
      range.selectNodeContents(cell.closest('tr')!);
    } else {
      range.selectNodeContents(cellsToMark[0]);
    }
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

export function ensureEditorHasBlock(editorEl: Element | null): void {
  if (!editorEl) return;
  const hasContent = editorEl.children.length > 0 || (editorEl.textContent || '').trim().length > 0;
  if (!hasContent) {
    const p = document.createElement('p');
    p.innerHTML = '<br>';
    editorEl.appendChild(p);
    const sel = window.getSelection();
    if (sel) {
      const r = document.createRange();
      r.setStart(p, 0);
      r.collapse(true);
      sel.removeAllRanges();
      sel.addRange(r);
    }
  }
}

function getOrCreateTBody(table: HTMLTableElement): HTMLTableSectionElement {
  if (table.tBodies.length > 0) return table.tBodies[0];
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  return tbody;
}

function copyTemplateCellStyle(src: HTMLTableCellElement, dest: HTMLTableCellElement): void {
  dest.style.border = src.style.border;
  dest.style.borderTop = src.style.borderTop;
  dest.style.borderRight = src.style.borderRight;
  dest.style.borderBottom = src.style.borderBottom;
  dest.style.borderLeft = src.style.borderLeft;
  dest.style.padding = src.style.padding;
  if (src.style.paddingTop) dest.style.paddingTop = src.style.paddingTop;
  if (src.style.paddingBottom) dest.style.paddingBottom = src.style.paddingBottom;
  if (src.style.paddingLeft) dest.style.paddingLeft = src.style.paddingLeft;
  if (src.style.paddingRight) dest.style.paddingRight = src.style.paddingRight;
  dest.style.verticalAlign = src.style.verticalAlign || 'top';
  dest.style.textAlign = src.style.textAlign;
  dest.style.backgroundColor = src.style.backgroundColor;
  dest.style.color = src.style.color;
  dest.style.width = src.style.width;
  dest.style.minWidth = '';
}

/**
 * Insert row above/below with full MS Word semantics:
 * - Inserting below a `<thead>` row creates a `<tbody>` row with `<td>` cells (not a second `<th>` header).
 * - Cleans up `rowSpan` safely and places caret into first cell of new row.
 */
export function insertTableRow(
  table: HTMLTableElement,
  refCell: HTMLTableCellElement,
  where: 'above' | 'below'
): HTMLTableRowElement | null {
  const row = refCell.closest('tr') as HTMLTableRowElement | null;
  if (!row) return null;

  const grid = buildTableGrid(table);
  const rowIndex = grid.rows.indexOf(row);
  const inThead = row.parentElement?.tagName === 'THEAD';

  const newRow = document.createElement('tr');
  const shouldBeHeaderRow = inThead && where === 'above';
  const cellTag = shouldBeHeaderRow ? 'th' : 'td';

  // Determine exact logical cells from reference row
  const refRowCells = Array.from(row.cells);
  if (refRowCells.length > 0 && grid.colCount === refRowCells.reduce((acc, c) => acc + (c.colSpan || 1), 0)) {
    for (const template of refRowCells) {
      const nc = document.createElement(cellTag) as HTMLTableCellElement;
      if (template.colSpan > 1) nc.colSpan = template.colSpan;
      copyTemplateCellStyle(template, nc);
      if (inThead && !shouldBeHeaderRow) {
        // Data row below header should not inherit solid dark header shading if possible
        nc.style.backgroundColor = '';
        nc.style.color = '';
        nc.style.fontWeight = 'normal';
        if (!nc.style.border) nc.style.border = template.style.border;
      }
      nc.innerHTML = '<br>';
      newRow.appendChild(nc);
    }
  } else {
    // Handle rows containing rowSpanned cells from earlier rows
    const refSlots = rowIndex >= 0 ? grid.matrix[rowIndex] : [];
    for (let c = 0; c < grid.colCount; c++) {
      const slot = refSlots[c];
      if (slot && !slot.isOrigin && where === 'below' && slot.originRow + slot.rowSpan - 1 > rowIndex) {
        // Active rowSpan passes across this boundary: extend it
        slot.cell.rowSpan = slot.rowSpan + 1;
        c += slot.colSpan - 1;
        continue;
      }
      if (slot && !slot.isOrigin && where === 'above' && slot.originRow < rowIndex) {
        slot.cell.rowSpan = slot.rowSpan + 1;
        c += slot.colSpan - 1;
        continue;
      }
      const nc = document.createElement(cellTag) as HTMLTableCellElement;
      if (slot?.cell) {
        copyTemplateCellStyle(slot.cell, nc);
        if (inThead && !shouldBeHeaderRow) {
          nc.style.backgroundColor = '';
          nc.style.color = '';
          nc.style.fontWeight = 'normal';
        }
      }
      nc.innerHTML = '<br>';
      newRow.appendChild(nc);
    }
  }

  if (inThead && where === 'below') {
    const tbody = getOrCreateTBody(table);
    tbody.insertBefore(newRow, tbody.firstChild);
  } else if (row.parentElement) {
    row.parentElement.insertBefore(newRow, where === 'above' ? row : row.nextSibling);
  }

  if (newRow.cells.length > 0) {
    focusTableCellLikeWord(newRow.cells[0], false);
  }
  return newRow;
}

/**
 * Insert column left/right with MS Word semantics:
 * - Fixes the left-insert self-copy bug by snapping neighbor styles BEFORE inserting.
 * - Uses `<th>` in `<thead>` and `<td>` elsewhere.
 * - Expands `colSpan` cleanly when inserting inside a horizontally merged region.
 */
export function insertTableColumn(
  table: HTMLTableElement,
  refCell: HTMLTableCellElement,
  where: 'left' | 'right'
): HTMLTableCellElement | null {
  const pos = getCellGridPosition(table, refCell);
  if (!pos) return null;

  const insertAtCol = where === 'left' ? pos.colIndex : pos.colIndex + pos.colSpan;
  const grid = buildTableGrid(table);
  let insertedFocusCell: HTMLTableCellElement | null = null;

  for (let r = 0; r < grid.rows.length; r++) {
    const row = grid.rows[r];
    const inThead = row.parentElement?.tagName === 'THEAD';
    const slots = grid.matrix[r];

    // Check if an existing merged cell strictly spans across insertAtCol
    const crossingSlot = insertAtCol > 0 && insertAtCol < grid.colCount ? slots[insertAtCol] : null;
    if (crossingSlot && crossingSlot.originCol < insertAtCol) {
      if (crossingSlot.originRow === r) {
        crossingSlot.cell.colSpan = crossingSlot.colSpan + 1;
      }
      continue;
    }

    // Choose neighbor template BEFORE inserting DOM node
    const neighborSlot = where === 'left'
      ? (slots[insertAtCol] || slots[insertAtCol - 1])
      : (slots[pos.colIndex] || slots[insertAtCol - 1] || slots[insertAtCol]);
    const neighborCell = neighborSlot?.cell || refCell;

    const newCell = document.createElement(inThead || neighborCell.tagName === 'TH' && inThead ? 'th' : 'td') as HTMLTableCellElement;
    copyTemplateCellStyle(neighborCell, newCell);
    newCell.style.width = ''; // Allow natural/distributed fit instead of overflowing table
    newCell.innerHTML = '<br>';

    // Find physical DOM child before which to insert
    let beforeNode: HTMLTableCellElement | null = null;
    for (let c = insertAtCol; c < grid.colCount; c++) {
      const s = slots[c];
      if (s && s.isOrigin && s.cell.parentElement === row) {
        beforeNode = s.cell;
        break;
      }
    }

    row.insertBefore(newCell, beforeNode);
    if (r === pos.rowIndex) {
      insertedFocusCell = newCell;
    }
  }

  // Rebalance percentage/pixel column widths if table uses fixed layout with explicit widths
  if (table.style.tableLayout === 'fixed' && grid.rows[0]) {
    const firstRowCells = Array.from(grid.rows[0].cells);
    const allHavePct = firstRowCells.some((c) => c.style.width.endsWith('%'));
    if (allHavePct && firstRowCells.length > 0) {
      const eqPct = `${(100 / firstRowCells.length).toFixed(2)}%`;
      firstRowCells.forEach((c) => {
        c.style.width = eqPct;
      });
    }
  }

  if (insertedFocusCell) {
    focusTableCellLikeWord(insertedFocusCell, false);
  }
  return insertedFocusCell;
}

/**
 * Delete row(s) containing selected cells or refCell.
 * If all rows are deleted, deletes the entire table cleanly (MS Word behavior).
 */
export function deleteTableRow(
  table: HTMLTableElement,
  refCell: HTMLTableCellElement
): { tableRemoved: boolean } {
  const editorEl = table.closest('.prodoc-editor');
  const selected = getSelectedTableCells(table);
  const targetCells = selected.length > 0 ? selected : [refCell];
  const rowsToDelete = Array.from(
    new Set(targetCells.map((c) => c.closest('tr') as HTMLTableRowElement | null).filter(Boolean) as HTMLTableRowElement[])
  );

  if (rowsToDelete.length === 0) return { tableRemoved: false };

  const allRows = Array.from(table.rows);
  if (rowsToDelete.length >= allRows.length) {
    table.remove();
    ensureEditorHasBlock(editorEl);
    return { tableRemoved: true };
  }

  // Determine focus destination before deleting
  const firstDelIdx = allRows.indexOf(rowsToDelete[0]);
  const lastDelIdx = allRows.indexOf(rowsToDelete[rowsToDelete.length - 1]);
  const focusTargetRow = allRows[lastDelIdx + 1] || allRows[firstDelIdx - 1] || null;
  const targetCellCol = refCell.cellIndex;

  rowsToDelete.forEach((r) => r.remove());
  clearSelectedCellHighlights(table);

  if (table.rows.length === 0) {
    table.remove();
    ensureEditorHasBlock(editorEl);
    return { tableRemoved: true };
  }

  if (focusTargetRow && focusTargetRow.cells.length > 0) {
    const targetCell = focusTargetRow.cells[Math.min(targetCellCol, focusTargetRow.cells.length - 1)];
    if (targetCell) focusTableCellLikeWord(targetCell, false);
  }
  return { tableRemoved: false };
}

/**
 * Delete column(s) corresponding to selected cells or refCell using logical grid coordinates.
 * Removes the entire table if the last column is deleted (MS Word behavior).
 */
export function deleteTableColumn(
  table: HTMLTableElement,
  refCell: HTMLTableCellElement
): { tableRemoved: boolean } {
  const editorEl = table.closest('.prodoc-editor');
  const grid = buildTableGrid(table);
  if (grid.colCount <= 1) {
    table.remove();
    ensureEditorHasBlock(editorEl);
    return { tableRemoved: true };
  }

  const pos = getCellGridPosition(table, refCell);
  if (!pos) return { tableRemoved: false };

  const colToDelete = pos.colIndex;
  const touchedCells = new Set<HTMLTableCellElement>();

  for (let r = 0; r < grid.rows.length; r++) {
    const slot = grid.matrix[r][colToDelete];
    if (!slot || touchedCells.has(slot.cell)) continue;
    touchedCells.add(slot.cell);

    if (slot.colSpan > 1) {
      slot.cell.colSpan = slot.colSpan - 1;
    } else {
      slot.cell.remove();
    }
  }

  clearSelectedCellHighlights(table);

  if (table.querySelectorAll('td, th').length === 0 || table.rows.length === 0) {
    table.remove();
    ensureEditorHasBlock(editorEl);
    return { tableRemoved: true };
  }

  const nextGrid = buildTableGrid(table);
  const focusRow = nextGrid.rows[Math.min(pos.rowIndex, nextGrid.rows.length - 1)];
  if (focusRow && focusRow.cells.length > 0) {
    const nextCell = nextGrid.matrix[Math.min(pos.rowIndex, nextGrid.rows.length - 1)]?.[Math.min(colToDelete, nextGrid.colCount - 1)]?.cell || focusRow.cells[0];
    if (nextCell) focusTableCellLikeWord(nextCell, false);
  }

  return { tableRemoved: false };
}

/**
 * Merge either a multi-cell selection (including rowSpan + colSpan)
 * OR merge `refCell` with its right adjacent sibling cell cleanly.
 */
export function mergeTableCells(table: HTMLTableElement, refCell: HTMLTableCellElement): boolean {
  const selected = getSelectedTableCells(table);

  if (selected.length > 1) {
    const grid = buildTableGrid(table);
    let minRow = Infinity;
    let maxRow = -1;
    let minCol = Infinity;
    let maxCol = -1;

    for (const c of selected) {
      const p = getCellGridPosition(table, c);
      if (!p) continue;
      minRow = Math.min(minRow, p.rowIndex);
      maxRow = Math.max(maxRow, p.rowIndex + p.rowSpan - 1);
      minCol = Math.min(minCol, p.colIndex);
      maxCol = Math.max(maxCol, p.colIndex + p.colSpan - 1);
    }

    if (maxRow < minRow || maxCol < minCol) return false;
    const anchorSlot = grid.matrix[minRow]?.[minCol];
    if (!anchorSlot) return false;
    const anchor = anchorSlot.cell;

    const toMerge = new Set<HTMLTableCellElement>();
    for (let r = minRow; r <= maxRow && r < grid.matrix.length; r++) {
      for (let c = minCol; c <= maxCol && c < grid.colCount; c++) {
        const s = grid.matrix[r][c];
        if (s && s.cell !== anchor) {
          toMerge.add(s.cell);
        }
      }
    }

    const combinedChunks: string[] = [];
    if (!isCellVisuallyEmpty(anchor)) {
      combinedChunks.push(anchor.innerHTML.trim());
    }
    toMerge.forEach((c) => {
      if (!isCellVisuallyEmpty(c)) {
        combinedChunks.push(c.innerHTML.trim());
      }
      c.remove();
    });

    anchor.colSpan = maxCol - minCol + 1;
    anchor.rowSpan = maxRow - minRow + 1;
    anchor.innerHTML = combinedChunks.length > 0 ? combinedChunks.join('<br>') : '<br>';
    clearSelectedCellHighlights(table);
    focusTableCellLikeWord(anchor, false);
    return true;
  }

  // Single cell fallback: merge with immediate right neighbor
  const nextSibling = refCell.nextElementSibling as HTMLTableCellElement | null;
  if (!nextSibling) return false;

  const currentColSpan = refCell.colSpan || 1;
  const nextColSpan = nextSibling.colSpan || 1;
  refCell.colSpan = currentColSpan + nextColSpan;

  const leftEmpty = isCellVisuallyEmpty(refCell);
  const rightEmpty = isCellVisuallyEmpty(nextSibling);
  if (leftEmpty && !rightEmpty) {
    refCell.innerHTML = nextSibling.innerHTML;
  } else if (!leftEmpty && !rightEmpty) {
    refCell.innerHTML = `${refCell.innerHTML.trim()} ${nextSibling.innerHTML.trim()}`;
  }
  nextSibling.remove();
  clearSelectedCellHighlights(table);
  focusTableCellLikeWord(refCell, false);
  return true;
}

/**
 * Split a table cell while preserving rectangular table geometry.
 */
export function splitTableCell(table: HTMLTableElement, cell: HTMLTableCellElement): boolean {
  const pos = getCellGridPosition(table, cell);
  if (!pos) return false;

  if (pos.colSpan > 1) {
    const firstSpan = Math.floor(pos.colSpan / 2);
    const secondSpan = pos.colSpan - firstSpan;
    cell.colSpan = firstSpan;
    const newCell = document.createElement(cell.tagName.toLowerCase()) as HTMLTableCellElement;
    copyTemplateCellStyle(cell, newCell);
    newCell.colSpan = secondSpan;
    if (pos.rowSpan > 1) newCell.rowSpan = pos.rowSpan;
    newCell.style.width = '';
    newCell.innerHTML = '<br>';
    cell.parentNode?.insertBefore(newCell, cell.nextSibling);
    focusTableCellLikeWord(cell, false);
    return true;
  }

  if (pos.rowSpan > 1) {
    const newRowSpan = pos.rowSpan - 1;
    cell.rowSpan = 1;
    const grid = buildTableGrid(table);
    const nextRow = grid.rows[pos.rowIndex + 1];
    if (nextRow) {
      const newCell = document.createElement(nextRow.parentElement?.tagName === 'THEAD' ? 'th' : 'td') as HTMLTableCellElement;
      copyTemplateCellStyle(cell, newCell);
      if (newRowSpan > 1) newCell.rowSpan = newRowSpan;
      newCell.innerHTML = '<br>';
      // Insert in logical column order
      let beforeNode: HTMLTableCellElement | null = null;
      for (let c = pos.colIndex + 1; c < grid.colCount; c++) {
        const s = grid.matrix[pos.rowIndex + 1][c];
        if (s && s.isOrigin && s.cell.parentElement === nextRow) {
          beforeNode = s.cell;
          break;
        }
      }
      nextRow.insertBefore(newCell, beforeNode);
      return true;
    }
  }

  // Standard 1x1 cell split: insert a new cell next to it AND expand colSpan in sibling rows at this column
  const grid = buildTableGrid(table);
  const newCell = document.createElement(cell.tagName.toLowerCase()) as HTMLTableCellElement;
  copyTemplateCellStyle(cell, newCell);
  newCell.style.width = '';
  newCell.innerHTML = '<br>';
  cell.parentNode?.insertBefore(newCell, cell.nextSibling);

  for (let r = 0; r < grid.rows.length; r++) {
    if (r === pos.rowIndex) continue;
    const slot = grid.matrix[r][pos.colIndex];
    if (slot && slot.originRow === r) {
      slot.cell.colSpan = (slot.cell.colSpan || 1) + 1;
    }
  }
  focusTableCellLikeWord(cell, false);
  return true;
}

export function distributeTableRows(table: HTMLTableElement): void {
  const rows = Array.from(table.rows);
  if (rows.length === 0) return;
  let maxH = 0;
  rows.forEach((r) => {
    const h = r.offsetHeight || r.getBoundingClientRect().height || 0;
    if (h > maxH) maxH = h;
  });
  if (maxH <= 0) maxH = 30;
  rows.forEach((r) => {
    r.style.height = `${Math.round(maxH)}px`;
    Array.from(r.cells).forEach((c) => {
      c.style.height = '';
      c.style.minHeight = '';
    });
  });
}

export function distributeTableColumns(table: HTMLTableElement): void {
  const grid = buildTableGrid(table);
  if (grid.colCount === 0) return;
  table.style.tableLayout = 'fixed';
  const pct = 100 / grid.colCount;
  Array.from(table.querySelectorAll('td, th')).forEach((el) => {
    const cell = el as HTMLTableCellElement;
    const span = Math.max(1, cell.colSpan || 1);
    cell.style.width = `${(pct * span).toFixed(2)}%`;
    cell.style.minWidth = '';
  });
}

/**
 * Cleanly merge `table[data-continuation="true"]` back into its preceding `<table>`
 * moving `<tr>` elements into the preceding table's `<tbody>` instead of nesting duplicate `<tbody>` nodes.
 */
export function mergeContinuationTables(root: ParentNode): void {
  const splitTables = Array.from(root.querySelectorAll('table[data-continuation="true"]')) as HTMLTableElement[];
  for (const splitTable of splitTables) {
    const repeatedHeaders = Array.from(splitTable.querySelectorAll('tr[data-repeated-header-row="true"]'));
    repeatedHeaders.forEach((rh) => rh.remove());

    const prev = splitTable.previousElementSibling as HTMLTableElement | null;
    if (prev && prev.tagName === 'TABLE') {
      const targetBody = prev.tBodies[0] || prev;
      const rows = Array.from(splitTable.rows);
      for (const row of rows) {
        targetBody.appendChild(row);
      }
      prev.removeAttribute('data-split-bottom');
      splitTable.remove();
    } else {
      splitTable.removeAttribute('data-continuation');
    }
  }
}

export function toggleTableGridlines(force?: boolean): boolean {
  if (typeof document === 'undefined') return false;
  const editors = Array.from(document.querySelectorAll('.prodoc-editor'));
  if (editors.length === 0) return false;
  const currentlyOn = editors.some((ed) => ed.classList.contains('show-table-gridlines'));
  const next = typeof force === 'boolean' ? force : !currentlyOn;
  editors.forEach((ed) => {
    ed.classList.toggle('show-table-gridlines', next);
  });
  return next;
}

export interface TableDesignOptionsState {
  headerRow: boolean;
  firstColumn: boolean;
  totalRow: boolean;
  lastColumn: boolean;
  bandedRows: boolean;
  bandedCols: boolean;
}

export interface TablePresetTheme {
  headerBg: string;
  headerFg: string;
  bandBg: string;
  accentBg: string;
  border: string;
}

export const TABLE_DESIGN_THEMES: Record<string, TablePresetTheme> = {
  grid: {
    headerBg: 'transparent',
    headerFg: 'inherit',
    bandBg: 'transparent',
    accentBg: '#f8fafc',
    border: '1px solid #000000',
  },
  slate: {
    headerBg: '#1e293b',
    headerFg: '#ffffff',
    bandBg: '#f1f5f9',
    accentBg: '#f8fafc',
    border: '1px solid #cbd5e1',
  },
  blue: {
    headerBg: '#2563eb',
    headerFg: '#ffffff',
    bandBg: '#eff6ff',
    accentBg: '#dbeafe',
    border: '1px solid #bfdbfe',
  },
  orange: {
    headerBg: '#ea580c',
    headerFg: '#ffffff',
    bandBg: '#fff7ed',
    accentBg: '#ffedd5',
    border: '1px solid #fed7aa',
  },
  emerald: {
    headerBg: '#0f766e',
    headerFg: '#ffffff',
    bandBg: '#f0fdfa',
    accentBg: '#ccfbf1',
    border: '1px solid #99f6e4',
  },
};

export function applyTableDesignOptions(
  table: HTMLTableElement,
  options: TableDesignOptionsState,
  themeKey: string = 'slate'
): void {
  const theme = TABLE_DESIGN_THEMES[themeKey] || TABLE_DESIGN_THEMES.slate;
  table.setAttribute('data-table-theme', themeKey);
  table.style.borderCollapse = 'collapse';

  const grid = buildTableGrid(table);
  const rowCount = grid.rows.length;
  const colCount = grid.colCount;

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      const slot = grid.matrix[r][c];
      if (!slot || !slot.isOrigin) continue;
      const cell = slot.cell;
      const isHeader = options.headerRow && r === 0;
      const isTotal = options.totalRow && rowCount > 1 && r === rowCount - 1;
      const isFirstCol = options.firstColumn && c === 0;
      const isLastCol = options.lastColumn && colCount > 1 && c + slot.colSpan >= colCount;

      cell.style.border = theme.border;
      cell.style.borderTop = '';
      cell.style.borderBottom = '';
      cell.style.backgroundColor = '';
      cell.style.color = '';
      cell.style.fontWeight = 'normal';

      if (isHeader) {
        cell.style.backgroundColor = theme.headerBg;
        cell.style.color = theme.headerFg;
        cell.style.fontWeight = 'bold';
      } else if (isTotal) {
        cell.style.fontWeight = 'bold';
        cell.style.borderTop = '2px double #475569';
        cell.style.borderBottom = '2px solid #475569';
        cell.style.backgroundColor = theme.accentBg;
      } else {
        const bodyRowIndex = options.headerRow ? r - 1 : r;
        const rowBanded = options.bandedRows && bodyRowIndex % 2 === 1;
        const colBanded = options.bandedCols && c % 2 === 1;
        if (rowBanded || colBanded) {
          cell.style.backgroundColor = theme.bandBg;
        }
        if (isFirstCol || isLastCol) {
          cell.style.fontWeight = 'bold';
        }
      }
    }
  }
}

export function normalizeBorderColorValue(borderValue: string): string {
  if (!borderValue || borderValue.includes('none')) return 'none';
  const hexMatch = borderValue.match(/#([0-9a-f]{3,6})/i);
  if (hexMatch) {
    const raw = hexMatch[1];
    if (raw.length === 3) {
      return `#${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`.toLowerCase();
    }
    return `#${raw.toLowerCase()}`;
  }
  const rgbMatch = borderValue.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0');
    return `#${toHex(Number(rgbMatch[1]))}${toHex(Number(rgbMatch[2]))}${toHex(Number(rgbMatch[3]))}`;
  }
  if (borderValue.toLowerCase().includes('black')) return '#000000';
  return '#cbd5e1';
}
