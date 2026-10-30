import { describe, it, expect } from 'vitest';
import { TableSplitStrategy } from '../../utils/layout/strategies/TableSplitStrategy';
import { SplitStatus, SplitContext } from '../../utils/layout/SplitStrategy';

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
});
