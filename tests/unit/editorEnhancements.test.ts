import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  isAnyModalOpen,
  isEventInsideModal,
  handleGlobalModalWheel,
} from '../../utils/modalScroll';
import {
  buildTableGrid,
  getCellGridPosition,
  getCellsInLogicalColumn,
  focusTableCellLikeWord,
  selectTableCellsRect,
  insertTableRow,
  insertTableColumn,
  deleteTableRow,
  deleteTableColumn,
  mergeTableCells,
  splitTableCell,
  mergeContinuationTables,
  applyTableDesignOptions,
  normalizeBorderColorValue,
} from '../../utils/tableUtils';
import {
  BUILTIN_EQUATION_PRESETS,
  SYMBOL_CATALOG,
  filterSymbols,
  getRecentSymbols,
  recordRecentSymbol,
  latexToLinearUnicode,
  linearUnicodeToLatex,
} from '../../utils/equationPresets';

describe('modalScroll isolation utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('detects open modals via data-modal-backdrop or role=dialog[aria-modal=true]', () => {
    expect(isAnyModalOpen()).toBe(false);

    const backdrop = document.createElement('div');
    backdrop.setAttribute('data-modal-backdrop', 'true');
    const child = document.createElement('button');
    backdrop.appendChild(child);
    document.body.appendChild(backdrop);

    expect(isAnyModalOpen()).toBe(true);
    expect(isEventInsideModal(child)).toBe(true);

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    expect(isEventInsideModal(outside)).toBe(false);
  });

  it('allows wheel scrolling inside a scrollable modal container and blocks outside wheel events', () => {
    const backdrop = document.createElement('div');
    backdrop.setAttribute('data-modal-backdrop', 'true');
    const scrollBox = document.createElement('div');
    scrollBox.style.overflowY = 'auto';
    Object.defineProperty(scrollBox, 'clientHeight', { value: 200, configurable: true });
    Object.defineProperty(scrollBox, 'scrollHeight', { value: 600, configurable: true });
    scrollBox.scrollTop = 50;

    const item = document.createElement('div');
    scrollBox.appendChild(item);
    backdrop.appendChild(scrollBox);
    document.body.appendChild(backdrop);

    const outside = document.createElement('div');
    document.body.appendChild(outside);

    // Wheel inside scrollable dialog content should NOT call preventDefault
    const insideEvt = new WheelEvent('wheel', { deltaY: 40, cancelable: true });
    Object.defineProperty(insideEvt, 'target', { value: item });
    const insidePreventSpy = vi.spyOn(insideEvt, 'preventDefault');
    handleGlobalModalWheel(insideEvt);
    expect(insidePreventSpy).not.toHaveBeenCalled();

    // Wheel outside dialog should be blocked via preventDefault
    const outsideEvt = new WheelEvent('wheel', { deltaY: 40, cancelable: true });
    Object.defineProperty(outsideEvt, 'target', { value: outside });
    const outsidePreventSpy = vi.spyOn(outsideEvt, 'preventDefault');
    handleGlobalModalWheel(outsideEvt);
    expect(outsidePreventSpy).toHaveBeenCalledTimes(1);

    // Wheel at top boundary scrolling up should block background scroll chaining
    scrollBox.scrollTop = 0;
    const boundaryEvt = new WheelEvent('wheel', { deltaY: -40, cancelable: true });
    Object.defineProperty(boundaryEvt, 'target', { value: item });
    const boundaryPreventSpy = vi.spyOn(boundaryEvt, 'preventDefault');
    handleGlobalModalWheel(boundaryEvt);
    expect(boundaryPreventSpy).toHaveBeenCalledTimes(1);
  });
});

describe('tableUtils MS Word table engine', () => {
  const makeTable = () => {
    const editor = document.createElement('div');
    editor.className = 'prodoc-editor';
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th style="border: 1px solid #cbd5e1; background-color: rgb(30, 41, 59); color: #fff;">H1</th>
          <th style="border: 1px solid #cbd5e1; background-color: rgb(30, 41, 59); color: #fff;">H2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #000000; padding: 6px;">R1C1</td>
          <td style="border: 1px solid #000000; padding: 6px;">R1C2</td>
        </tr>
        <tr>
          <td style="border: 1px solid #000000; padding: 6px;">R2C1</td>
          <td style="border: 1px solid #000000; padding: 6px;">R2C2</td>
        </tr>
      </tbody>
    `;
    editor.appendChild(table);
    document.body.appendChild(editor);
    return { editor, table };
  };

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('inserts a tbody <td> row when inserting below a <thead> header row', () => {
    const { table } = makeTable();
    const headerCell = table.querySelector('th') as HTMLTableCellElement;
    const inserted = insertTableRow(table, headerCell, 'below');
    expect(inserted).not.toBeNull();
    expect(inserted?.parentElement?.tagName).toBe('TBODY');
    expect(inserted?.cells[0].tagName).toBe('TD');
    expect(table.tBodies[0].rows[0]).toBe(inserted);
  });

  it('inserts column left preserving neighbor style without self-copy corruption', () => {
    const { table } = makeTable();
    const r1c1 = table.tBodies[0].rows[0].cells[0];
    r1c1.style.backgroundColor = 'rgb(254, 240, 138)';
    const inserted = insertTableColumn(table, r1c1, 'left');
    expect(inserted).not.toBeNull();
    expect(table.rows[0].cells.length).toBe(3);
    expect(table.tBodies[0].rows[0].cells[0].style.backgroundColor).toBe('rgb(254, 240, 138)');
    expect(table.tBodies[0].rows[0].cells[0].innerHTML).toBe('<br>');
  });

  it('deletes the whole table and leaves a valid block paragraph when removing last row or last column', () => {
    const { editor, table } = makeTable();
    const firstTd = table.tBodies[0].rows[0].cells[0];

    // Remove all rows except one, wait — delete column 2 then column 1 removes table
    deleteTableColumn(table, table.tBodies[0].rows[0].cells[1]);
    expect(editor.contains(table)).toBe(true);

    const res = deleteTableColumn(table, firstTd);
    expect(res.tableRemoved).toBe(true);
    expect(editor.querySelector('table')).toBeNull();
    expect(editor.querySelector('p')).not.toBeNull();

    // Now test deleting all rows via selection
    const { editor: ed2, table: t2 } = makeTable();
    const r1 = t2.rows[0].cells[0];
    const rLast = t2.rows[t2.rows.length - 1].cells[0];
    selectTableCellsRect(t2, r1, rLast);
    const delRowRes = deleteTableRow(t2, r1);
    expect(delRowRes.tableRemoved).toBe(true);
    expect(ed2.querySelector('table')).toBeNull();
  });

  it('merges rectangular multi-cell selection and splits preserving rectangular grid geometry', () => {
    const { table } = makeTable();
    const r1c1 = table.tBodies[0].rows[0].cells[0];
    const r2c2 = table.tBodies[0].rows[1].cells[1];

    selectTableCellsRect(table, r1c1, r2c2);
    expect(table.querySelectorAll('.selectedCell').length).toBe(4);

    const merged = mergeTableCells(table, r1c1);
    expect(merged).toBe(true);
    expect(r1c1.colSpan).toBe(2);
    expect(r1c1.rowSpan).toBe(2);
    expect(r1c1.textContent).toContain('R1C1');
    expect(r1c1.textContent).toContain('R2C2');

    // Splitting a 2x2 cell horizontally preserves colCount=2
    expect(splitTableCell(table, r1c1)).toBe(true);
    const gridAfterSplit = buildTableGrid(table);
    expect(gridAfterSplit.colCount).toBe(2);
    expect(getCellsInLogicalColumn(table, 0).length).toBeGreaterThanOrEqual(2);
  });

  it('tracks logical coordinates across colSpan and collapses empty cells on Tab focus', () => {
    const { table } = makeTable();
    const firstTd = table.tBodies[0].rows[0].cells[0];
    firstTd.innerHTML = '<br>';
    focusTableCellLikeWord(firstTd, false);
    const sel = window.getSelection();
    expect(sel?.isCollapsed).toBe(true);

    firstTd.textContent = 'Filled';
    focusTableCellLikeWord(firstTd, false);
    expect(window.getSelection()?.isCollapsed).toBe(false);
    expect(window.getSelection()?.toString()).toBe('Filled');

    const pos = getCellGridPosition(table, table.tBodies[0].rows[0].cells[1]);
    expect(pos?.colIndex).toBe(1);
    expect(pos?.rowIndex).toBe(1);
  });

  it('merges continuation tables back into single <tbody> without duplicate tbodies', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <table data-split-bottom="true"><tbody><tr><td>A</td></tr></tbody></table>
      <table data-continuation="true"><tbody><tr data-repeated-header-row="true"><th>H</th></tr><tr><td>B</td></tr></tbody></table>
    `;
    mergeContinuationTables(container);
    const tables = container.querySelectorAll('table');
    expect(tables.length).toBe(1);
    expect(tables[0].tBodies.length).toBe(1);
    expect(tables[0].rows.length).toBe(2);
    expect(tables[0].getAttribute('data-split-bottom')).toBeNull();
  });

  it('applies Table Design style options and normalizes RGB/Hex border colors', () => {
    const { table } = makeTable();
    applyTableDesignOptions(
      table,
      {
        headerRow: true,
        firstColumn: true,
        totalRow: true,
        lastColumn: false,
        bandedRows: true,
        bandedCols: false,
      },
      'blue'
    );
    expect(table.getAttribute('data-table-theme')).toBe('blue');
    expect(table.rows[0].cells[0].style.fontWeight).toBe('bold');
    expect(table.rows[table.rows.length - 1].cells[0].style.borderTop).toContain('double');

    expect(normalizeBorderColorValue('1px solid rgb(0, 0, 0)')).toBe('#000000');
    expect(normalizeBorderColorValue('2px solid #3B82F6')).toBe('#3b82f6');
    expect(normalizeBorderColorValue('none')).toBe('none');
  });
});

describe('equationPresets & symbol catalog utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('provides built-in equations and filters symbols by name or Unicode codepoint', () => {
    expect(BUILTIN_EQUATION_PRESETS.length).toBeGreaterThanOrEqual(6);
    expect(SYMBOL_CATALOG.length).toBeGreaterThan(50);

    const alphaMatches = filterSymbols('alpha', 'Greek');
    expect(alphaMatches.some((s) => s.char === 'α')).toBe(true);

    const rupeeByHex = filterSymbols('U+20B9', 'All');
    expect(rupeeByHex.some((s) => s.char === '₹')).toBe(true);
  });

  it('persists recently used symbols in MRU order', () => {
    const initial = getRecentSymbols();
    expect(initial.length).toBeGreaterThan(0);

    const updated = recordRecentSymbol('∑');
    expect(updated[0]).toBe('∑');
    expect(getRecentSymbols()[0]).toBe('∑');
  });

  it('converts between LaTeX and Linear Unicode notation', () => {
    const linear = latexToLinearUnicode('\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}');
    expect(linear).toContain('±');
    expect(linear).toContain('√(b² - 4ac)');

    const latexBack = linearUnicodeToLatex('x² + α ≤ ∞');
    expect(latexBack).toContain('^2');
    expect(latexBack).toContain('\\alpha');
    expect(latexBack).toContain('\\leq');
    expect(latexBack).toContain('\\infty');
  });
});
