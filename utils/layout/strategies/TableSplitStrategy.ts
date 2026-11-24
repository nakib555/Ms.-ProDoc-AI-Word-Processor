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

function copyColGroup(srcTable: HTMLTableElement, destTable: HTMLTableElement) {
  const colGroups = srcTable.querySelectorAll(':scope > colgroup');
  colGroups.forEach((cg) => {
    destTable.appendChild(cg.cloneNode(true));
  });
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

    copyColGroup(table, keepTable);
    copyColGroup(table, moveTable);
    copyColGroup(table, measureTable);

    const isSmallOrAtomicTable =
      rows.length <= 1 ||
      table.getAttribute('data-cant-split') === 'true' ||
      table.getAttribute('data-keep-together') === 'true' ||
      table.classList.contains('exam-mcq-table');

    // If atomic table or single-row table exceeds remaining space on non-empty page, defer to next page
    if (isSmallOrAtomicTable && context.remainingSpace < context.pageHeight * 0.92) {
      measureTable.removeAttribute('data-layout-id');
      const wholeHeight = context.measure(table);
      if (wholeHeight > effectiveLimit) {
        return {
          status: SplitStatus.Deferred,
          keep: null,
          move: node.cloneNode(true) as HTMLElement
        };
      }
    }

    let splitIndex = rows.length;
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
          if (context.remainingSpace < context.pageHeight * 0.85) {
            return {
              status: SplitStatus.Deferred,
              keep: null,
              move: node.cloneNode(true) as HTMLElement
            };
          }
          isFirstRowOversized = true;
          splitIndex = 1;
          break;
        }
        splitIndex = i;
        break;
      }

      if (newTotalHeight > effectiveLimit) {
        if (i === 0) {
          // If first row doesn't fit and we have prior content on this page, push whole table to next page
          if (context.remainingSpace < context.pageHeight * 0.85) {
            return {
              status: SplitStatus.Deferred,
              keep: null,
              move: node.cloneNode(true) as HTMLElement
            };
          }
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
    if (splitIndex >= rows.length && !isFirstRowOversized) {
      return {
        status: SplitStatus.Success,
        keep: node.cloneNode(true) as HTMLElement,
        move: null
      };
    }

    // Prepare keep table preserving hierarchy
    for (let i = 0; i < splitIndex; i++) {
      const rowClone = rows[i].cloneNode(true) as HTMLTableRowElement;
      appendRowToClonedTable(keepTable, rows[i].parentElement, rowClone);
    }

    const hasRemainingRows = splitIndex < rows.length;
    if (hasRemainingRows) {
      const repeatHeader = node.getAttribute('data-repeat-header') === 'true';
      if (repeatHeader && rows.length > 0 && splitIndex > 0) {
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
    }

    if (isFirstRowOversized) {
      return {
        status: SplitStatus.Oversized,
        keep: keepTable,
        move: hasRemainingRows ? moveTable : null,
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
      move: hasRemainingRows ? moveTable : null,
      splitIndex
    };
  }
}
