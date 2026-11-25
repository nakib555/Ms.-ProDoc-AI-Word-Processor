import { describe, it, expect } from 'vitest';
import { TableSplitStrategy } from '../../utils/layout/strategies/TableSplitStrategy';
import { SplitStatus, SplitContext } from '../../utils/layout/SplitStrategy';
import { mergeContinuationTables } from '../../utils/tableUtils';

describe('TableSplitStrategy', () => {
  const strategy = new TableSplitStrategy();

  function createMockContext(remainingSpace: number, pageHeight: number = 1000): SplitContext {
    return {
      remainingSpace,
      pageHeight,
      pageWidth: 800,
      documentVersion: 1,
      pageIndex: 0,
      columnIndex: 0,
      debug: false,
      layoutContext: {
        engine: {} as any,
        environment: { safetyBuffer: 10 } as any,
        state: { oversizedHandled: new Set() } as any,
        diagnostics: { log: () => {}, logEvent: () => {} } as any,
        measurementService: {} as any
      },
      measure: (node: Node) => {
        // Return 50px per row in the table
        const table = node as HTMLTableElement;
        const rowCount = table.rows ? table.rows.length : 1;
        return rowCount * 50;
      }
    };
  }

  function createTable(rowCount: number, attributes: Record<string, string> = {}): HTMLTableElement {
    const table = document.createElement('table');
    for (const [key, value] of Object.entries(attributes)) {
      table.setAttribute(key, value);
    }
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (let i = 0; i < rowCount; i++) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = `Row ${i + 1} Cell content`;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    return table;
  }

  it('identifies table elements correctly', () => {
    const table = createTable(2);
    const div = document.createElement('div');
    expect(strategy.supports(table)).toBe(true);
    expect(strategy.supports(div)).toBe(false);
  });

  it('keeps entire table if all rows fit within available space', () => {
    const table = createTable(3); // 3 rows * 50px = 150px
    const context = createMockContext(300); // 300px space, plenty of room
    const result = strategy.split(table, context);

    expect(result.status).toBe(SplitStatus.Success);
    expect(result.keep).not.toBeNull();
    expect(result.move).toBeNull();
  });

  it('splits multi-row table when later rows exceed available space', () => {
    const table = createTable(6); // 6 rows * 50px = 300px
    // 2 rows = 100px <= 110px effectiveLimit (120 - 10 safety buffer)
    // 3 rows = 150px > 110px effectiveLimit
    const context = createMockContext(120);
    const result = strategy.split(table, context);

    expect(result.status).toBe(SplitStatus.Success);
    expect(result.keep).not.toBeNull();
    expect(result.move).not.toBeNull();
    expect(result.splitIndex).toBe(2);

    const keepTable = result.keep as HTMLTableElement;
    const moveTable = result.move as HTMLTableElement;
    expect(keepTable.rows.length).toBe(2);
    expect(moveTable.rows.length).toBe(4);
    expect(keepTable.getAttribute('data-split-bottom')).toBe('true');
    expect(moveTable.getAttribute('data-continuation')).toBe('true');
  });

  it('defers table to next page if first row does not fit and page is not empty', () => {
    const table = createTable(5);
    // Page height 1000, remaining space 200 (< 850px, meaning page has prior content)
    // 1 row = 50px > effectiveLimit (30px space - 10px buffer = 20px limit)
    const context = createMockContext(30, 1000);
    const result = strategy.split(table, context);

    expect(result.status).toBe(SplitStatus.Deferred);
    expect(result.keep).toBeNull();
    expect(result.move).not.toBeNull();
  });

  it('duplicates header row on continuation table when data-repeat-header is true', () => {
    const table = createTable(6, { 'data-repeat-header': 'true' });
    const context = createMockContext(120);
    const result = strategy.split(table, context);

    expect(result.status).toBe(SplitStatus.Success);
    const moveTable = result.move as HTMLTableElement;
    // 4 remaining rows + 1 repeated header row = 5 rows
    expect(moveTable.rows.length).toBe(5);
    expect(moveTable.rows[0].getAttribute('data-repeated-header-row')).toBe('true');
  });

  it('defers orphan header row on a non-empty page when data rows overflow', () => {
    const table = document.createElement('table');
    table.setAttribute('data-repeat-header', 'true');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = 'Header Column';
    headerRow.appendChild(th);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let i = 0; i < 3; i++) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = `Data row ${i + 1}`;
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    // Remaining space 70px -> effectiveLimit 60px: 1 row (50px) fits, 2 rows (100px) overflow.
    // Because page is non-empty (remainingSpace 70 < 1000 * 0.85) and splitIndex === 1 on a header row,
    // whole table must defer instead of stranding the header alone.
    const context = createMockContext(70, 1000);
    const result = strategy.split(table, context);

    expect(result.status).toBe(SplitStatus.Deferred);
    expect(result.keep).toBeNull();
    expect(result.move).not.toBeNull();
  });

  it('splits an oversized multi-paragraph first row across pages and merges it back cleanly', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const tallRow = document.createElement('tr');
    const cell = document.createElement('td');
    for (let i = 1; i <= 6; i++) {
      const p = document.createElement('p');
      p.textContent = `Paragraph ${i}`;
      cell.appendChild(p);
    }
    tallRow.appendChild(cell);
    tbody.appendChild(tallRow);

    const nextRow = document.createElement('tr');
    const nextTd = document.createElement('td');
    nextTd.textContent = 'Trailing Row';
    nextRow.appendChild(nextTd);
    tbody.appendChild(nextRow);

    // Measure table height strictly by total <p> blocks inside it (40px each)
    const context: SplitContext = {
      ...createMockContext(950, 1000),
      measure: (node: Node) => {
        const el = node as HTMLElement;
        const pCount = el.querySelectorAll('p').length;
        const rowCount = (el as HTMLTableElement).rows ? (el as HTMLTableElement).rows.length : 1;
        return pCount > 0 ? pCount * 40 : rowCount * 40;
      }
    };
    // effectiveLimit = 950 - 10 = 940? Wait: we want first row (6 * 40 = 240px) to exceed effectiveLimit
    // on a fresh/empty page (remainingSpace >= pageHeight * 0.85). Let pageHeight = 200, remainingSpace = 180.
    // effectiveLimit = 180 - 10 = 170px -> fits 4 paragraphs (160px), moves 2 paragraphs + trailing row.
    const oversizedContext: SplitContext = {
      ...context,
      remainingSpace: 180,
      pageHeight: 200,
    };

    const result = strategy.split(table, oversizedContext);
    expect(result.status).toBe(SplitStatus.Success);
    expect(result.keep).not.toBeNull();
    expect(result.move).not.toBeNull();

    const keepTable = result.keep as HTMLTableElement;
    const moveTable = result.move as HTMLTableElement;

    expect(keepTable.getAttribute('data-split-bottom')).toBe('true');
    expect(moveTable.getAttribute('data-continuation')).toBe('true');
    expect(keepTable.rows[0].getAttribute('data-split-row-bottom')).toBe('true');
    expect(moveTable.rows[0].getAttribute('data-split-row-continuation')).toBe('true');
    expect(keepTable.rows[0].cells[0].querySelectorAll('p').length).toBe(4);
    expect(moveTable.rows[0].cells[0].querySelectorAll('p').length).toBe(2);
    expect(moveTable.rows.length).toBe(2); // continuation part of row 1 + trailing row

    // Verify full round-trip reassembly via mergeContinuationTables
    const container = document.createElement('div');
    container.appendChild(keepTable);
    container.appendChild(moveTable);
    mergeContinuationTables(container);

    const mergedTables = container.querySelectorAll('table');
    expect(mergedTables.length).toBe(1);
    const mergedTable = mergedTables[0] as HTMLTableElement;
    expect(mergedTable.rows.length).toBe(2);
    expect(mergedTable.rows[0].cells[0].querySelectorAll('p').length).toBe(6);
    expect(mergedTable.rows[1].cells[0].textContent).toBe('Trailing Row');
    expect(mergedTable.hasAttribute('data-split-bottom')).toBe(false);
    expect(mergedTable.hasAttribute('data-continuation')).toBe(false);
  });

  it('merges tbody-less continuation fragments and strips repeated headers cleanly', () => {
    const container = document.createElement('div');

    const topTable = document.createElement('table');
    topTable.setAttribute('data-split-bottom', 'true');
    const r1 = document.createElement('tr');
    r1.innerHTML = '<th>Header</th>';
    const r2 = document.createElement('tr');
    r2.innerHTML = '<td>Row A</td>';
    topTable.appendChild(r1);
    topTable.appendChild(r2);

    const contTable = document.createElement('table');
    contTable.setAttribute('data-continuation', 'true');
    const repeatedHdr = document.createElement('tr');
    repeatedHdr.setAttribute('data-repeated-header-row', 'true');
    repeatedHdr.innerHTML = '<th>Header</th>';
    const r3 = document.createElement('tr');
    r3.innerHTML = '<td>Row B</td>';
    contTable.appendChild(repeatedHdr);
    contTable.appendChild(r3);

    container.appendChild(topTable);
    container.appendChild(contTable);

    mergeContinuationTables(container);

    const tables = container.querySelectorAll('table');
    expect(tables.length).toBe(1);
    const rows = Array.from(tables[0].rows);
    expect(rows.length).toBe(3);
    expect(rows.map((r) => r.textContent?.trim())).toEqual(['Header', 'Row A', 'Row B']);
    expect(container.querySelectorAll('tr[data-repeated-header-row="true"]').length).toBe(0);
  });
});

