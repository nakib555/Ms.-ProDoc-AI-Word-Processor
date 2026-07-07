import { SplitStrategy, SplitResult, SplitStatus, SplitContext } from '../SplitStrategy';
import { containsPageBreak } from '../helpers';

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

    let splitIndex = 0;
    let isFirstRowOversized = false;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].cloneNode(true) as HTMLTableRowElement;
      measureTable.appendChild(row);
      const newTotalHeight = context.measure(measureTable);

      // Check for explicit page breaks inside cells
      if (containsPageBreak(row)) {
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

    // Prepare keep and move tables
    for (let i = 0; i < splitIndex; i++) {
      keepTable.appendChild(rows[i].cloneNode(true));
    }

    const repeatHeader = node.getAttribute('data-repeat-header') === 'true';
    if (repeatHeader && rows.length > 0 && splitIndex > 0 && splitIndex < rows.length) {
      const headerRow = rows[0].cloneNode(true) as HTMLTableRowElement;
      headerRow.setAttribute('data-repeated-header-row', 'true');
      moveTable.appendChild(headerRow);
    }

    for (let i = splitIndex; i < rows.length; i++) {
      moveTable.appendChild(rows[i].cloneNode(true));
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
