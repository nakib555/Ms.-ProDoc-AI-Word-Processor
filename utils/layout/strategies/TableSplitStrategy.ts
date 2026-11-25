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

    // Prevent orphan header row at the bottom of a non-empty page when there are data rows after it
    const firstRowIsHeader =
      rows.length > 1 &&
      (node.getAttribute('data-repeat-header') === 'true' ||
        rows[0].parentElement?.tagName === 'THEAD' ||
        (rows[0].cells.length > 0 && Array.from(rows[0].cells).every((c) => c.tagName === 'TH')));
    if (
      splitIndex === 1 &&
      firstRowIsHeader &&
      !isFirstRowOversized &&
      context.remainingSpace < context.pageHeight * 0.85
    ) {
      return {
        status: SplitStatus.Deferred,
        keep: null,
        move: node.cloneNode(true) as HTMLElement
      };
    }

    // If splitIndex equals rows.length, it fits completely in standard flow
    if (splitIndex >= rows.length && !isFirstRowOversized) {
      return {
        status: SplitStatus.Success,
        keep: node.cloneNode(true) as HTMLElement,
        move: null
      };
    }

    // Attempt to split an oversized first row across pages when allowed (not marked cant-split)
    const canSplitRow = (row: HTMLTableRowElement) =>
      node.getAttribute('data-cant-split') !== 'true' &&
      node.getAttribute('data-keep-together') !== 'true' &&
      row.getAttribute('data-cant-split') !== 'true' &&
      !row.classList.contains('table-row-keep-together');

    if (isFirstRowOversized && rows.length > 0 && canSplitRow(rows[0])) {
      const oversizedRow = rows[0];
      const rowSplit = this.splitOversizedRow(
        table,
        oversizedRow,
        effectiveLimit,
        context
      );
      if (rowSplit) {
        appendRowToClonedTable(keepTable, oversizedRow.parentElement, rowSplit.keepRow);

        const repeatHeader = node.getAttribute('data-repeat-header') === 'true';
        if (repeatHeader && rows.length > 1) {
          const headerRowClone = rows[0].cloneNode(true) as HTMLTableRowElement;
          headerRowClone.setAttribute('data-repeated-header-row', 'true');
          appendRowToClonedTable(moveTable, rows[0].parentElement, headerRowClone);
        }

        appendRowToClonedTable(moveTable, oversizedRow.parentElement, rowSplit.moveRow);
        for (let i = 1; i < rows.length; i++) {
          const rowClone = rows[i].cloneNode(true) as HTMLTableRowElement;
          appendRowToClonedTable(moveTable, rows[i].parentElement, rowClone);
        }

        keepTable.setAttribute('data-split-bottom', 'true');
        moveTable.setAttribute('data-continuation', 'true');

        return {
          status: SplitStatus.Success,
          keep: keepTable,
          move: moveTable,
          splitIndex: 1
        };
      }
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

  private splitOversizedRow(
    sourceTable: HTMLTableElement,
    row: HTMLTableRowElement,
    effectiveLimit: number,
    context: SplitContext
  ): { keepRow: HTMLTableRowElement; moveRow: HTMLTableRowElement } | null {
    const cells = Array.from(row.cells);
    if (cells.length === 0) return null;

    // Normalize cell children into block units or text chunks so we can partition tall cell content across pages
    const extractCellBlocks = (cell: HTMLTableCellElement): HTMLElement[] => {
      const doc = cell.ownerDocument || document;
      const blocks: HTMLElement[] = [];
      let inlineBuffer: Node[] = [];

      const flushInline = () => {
        if (inlineBuffer.length === 0) return;
        const hasVisible = inlineBuffer.some(
          (n) => (n.textContent && n.textContent.trim().length > 0) || n.nodeName === 'IMG'
        );
        if (hasVisible) {
          const p = doc.createElement('p');
          p.style.margin = '0';
          inlineBuffer.forEach((n) => p.appendChild(n.cloneNode(true)));
          blocks.push(p);
        }
        inlineBuffer = [];
      };

      Array.from(cell.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const el = child as HTMLElement;
          const tag = el.tagName.toUpperCase();
          if (tag === 'BR') {
            flushInline();
            return;
          }
          if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'PRE', 'UL', 'OL'].includes(tag)) {
            flushInline();
            blocks.push(el.cloneNode(true) as HTMLElement);
            return;
          }
        }
        inlineBuffer.push(child);
      });
      flushInline();

      // If there's only a single long text block, split it into sentence/word chunks (~40 words each) so long text overflows cleanly
      if (blocks.length === 1) {
        const single = blocks[0];
        const fullText = single.textContent || '';
        const words = fullText.trim().split(/\s+/);
        if (words.length > 50 && !single.querySelector('img, table, math-field')) {
          const chunked: HTMLElement[] = [];
          const chunkSize = 35;
          for (let i = 0; i < words.length; i += chunkSize) {
            const frag = single.cloneNode(false) as HTMLElement;
            if (i > 0) frag.setAttribute('data-split-fragment-cont', 'true');
            frag.textContent = words.slice(i, i + chunkSize).join(' ');
            chunked.push(frag);
          }
          return chunked;
        }
      }

      return blocks;
    };

    const cellBlockLists = cells.map(extractCellBlocks);
    const maxBlocks = Math.max(...cellBlockLists.map((b) => b.length), 0);
    if (maxBlocks <= 1) return null;

    const buildRowFromRanges = (endPerCell: number[], fromStart: boolean): HTMLTableRowElement => {
      const clonedRow = row.cloneNode(false) as HTMLTableRowElement;
      cells.forEach((cell, idx) => {
        const clonedCell = cell.cloneNode(false) as HTMLTableCellElement;
        clonedCell.style.height = '';
        clonedCell.style.minHeight = '';
        const list = cellBlockLists[idx];
        const splitAt = Math.min(list.length, endPerCell[idx]);
        const slice = fromStart ? list.slice(0, splitAt) : list.slice(splitAt);
        if (slice.length === 0) {
          const br = (row.ownerDocument || document).createElement('br');
          clonedCell.appendChild(br);
        } else {
          slice.forEach((blk) => clonedCell.appendChild(blk.cloneNode(true)));
        }
        clonedRow.appendChild(clonedCell);
      });
      return clonedRow;
    };

    // Binary/step search across block counts to find how many blocks fit in effectiveLimit
    let bestCount = 0;
    for (let k = 1; k < maxBlocks; k++) {
      const testKeepRow = buildRowFromRanges(
        cellBlockLists.map((list) => Math.min(k, list.length)),
        true
      );
      const testTable = sourceTable.cloneNode(false) as HTMLTableElement;
      testTable.removeAttribute('data-layout-id');
      copyColGroup(sourceTable, testTable);
      appendRowToClonedTable(testTable, row.parentElement, testKeepRow);
      const h = context.measure(testTable);
      if (h > effectiveLimit) {
        break;
      }
      bestCount = k;
    }

    if (bestCount === 0) {
      // Ensure progress by keeping at least 1 block if remaining space is on an empty page
      bestCount = 1;
    }
    if (bestCount >= maxBlocks) return null;

    const perCellCut = cellBlockLists.map((list) => Math.min(bestCount, list.length));
    const keepRow = buildRowFromRanges(perCellCut, true);
    const moveRow = buildRowFromRanges(perCellCut, false);
    keepRow.style.height = '';
    keepRow.style.minHeight = '';
    moveRow.style.height = '';
    moveRow.style.minHeight = '';
    keepRow.setAttribute('data-split-row-bottom', 'true');
    moveRow.setAttribute('data-split-row-continuation', 'true');

    return { keepRow, moveRow };
  }
}
