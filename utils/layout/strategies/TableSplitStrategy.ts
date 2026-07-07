import { SplitStrategy, SplitResult, SplitStatus, SplitContext } from '../SplitStrategy';
import { containsPageBreak } from '../helpers';

function appendRowToClonedTable(
  clonedTable: HTMLTableElement,
  originalParent: HTMLElement | null,
  clonedRow: HTMLTableRowElement
) {
  const parentTag = originalParent?.tagName.toUpperCase();
  if (parentTag === 'THEAD' || parentTag === 'TBODY' || parentTag === 'TFOOT') {
    let container = clonedTable.querySelector(parentTag.toLowerCase());
    if (!container) {
      container = document.createElement(parentTag.toLowerCase());
      clonedTable.appendChild(container);
    }
    container.appendChild(clonedRow);
  } else {
    clonedTable.appendChild(clonedRow);
  }
}

export class TableSplitStrategy implements SplitStrategy {
  readonly priority = 5;

  supports(node: HTMLElement): boolean {
    return node.tagName === 'TABLE';
  }

  split(
    node: HTMLElement,
    context: SplitContext
  ): SplitResult {
    const remainingSpace = context.remainingSpace;
    const table = node as HTMLTableElement;
    const rows = Array.from(table.rows);
    const effectiveLimit = Math.max(0, remainingSpace - context.layoutContext.environment.safetyBuffer);

    const keepTable = table.cloneNode(false) as HTMLTableElement;
    const moveTable = table.cloneNode(false) as HTMLTableElement;
    const measureTable = table.cloneNode(false) as HTMLTableElement;

    keepTable.removeAttribute('data-layout-id');
    moveTable.removeAttribute('data-layout-id');
    measureTable.removeAttribute('data-layout-id');

    let splitIndex = 0;
    let isFirstRowOversized = false;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowClone = row.cloneNode(true) as HTMLTableRowElement;
      appendRowToClonedTable(measureTable, row.parentElement, rowClone);
      
      // Ensure the measureTable does not use stale cached height after row insertion
      measureTable.removeAttribute('data-layout-id');
      const newTotalHeight = context.measure(measureTable);

      // Check for explicit page breaks inside cells
      if (containsPageBreak(rowClone)) {
        if (i === 0) {
          isFirstRowOversized = true;
          splitIndex = 1;
          break;
        }
        splitIndex = i;
        break;
      }

      if (newTotalHeight > effectiveLimit) {
        if (i === 0) {
          isFirstRowOversized = true;
          splitIndex = 1;
          break;
        }
        splitIndex = i;
        break;
      }

      if (i === rows.length - 1) {
        splitIndex = rows.length;
      }
    }

    // If splitIndex equals rows.length, it fits completely in standard flow
    if (splitIndex === rows.length) {
      return {
        status: SplitStatus.Success,
        keep: node.cloneNode(true) as HTMLElement,
        move: null
      };
    }

    // Prepare keep and move tables preserving hierarchy
    for (let i = 0; i < splitIndex; i++) {
      const rowClone = rows[i].cloneNode(true) as HTMLTableRowElement;
      appendRowToClonedTable(keepTable, rows[i].parentElement, rowClone);
    }

    const repeatHeader = node.getAttribute('data-repeat-header') === 'true';
    if (repeatHeader && rows.length > 0 && splitIndex > 0 && splitIndex < rows.length) {
      const headerRow = rows[0];
      const headerRowClone = headerRow.cloneNode(true) as HTMLTableRowElement;
      headerRowClone.setAttribute('data-repeated-header-row', 'true');
      appendRowToClonedTable(moveTable, headerRow.parentElement, headerRowClone);
    }

    for (let i = splitIndex; i < rows.length; i++) {
      const rowClone = rows[i].cloneNode(true) as HTMLTableRowElement;
      appendRowToClonedTable(moveTable, rows[i].parentElement, rowClone);
    }

    keepTable.setAttribute('data-split-bottom', 'true');
    moveTable.setAttribute('data-continuation', 'true');

    if (isFirstRowOversized) {
      return {
        status: SplitStatus.Oversized,
        keep: keepTable,
        move: moveTable,
        splitIndex,
        metrics: {
          originalHeight: context.measure(node),
          remainingSpace,
          overflow: context.measure(measureTable) - remainingSpace
        }
      };
    }

    return {
      status: SplitStatus.Success,
      keep: keepTable,
      move: moveTable,
      splitIndex
    };
  }
}
