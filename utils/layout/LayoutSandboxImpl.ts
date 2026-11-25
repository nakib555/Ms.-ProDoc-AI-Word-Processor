import { LayoutSandbox } from './SplitStrategy';
import { MeasurementCache } from './MeasurementCache';
import { TypographyEngine } from '../typographyEngine';

export class LayoutSandboxImpl implements LayoutSandbox {
  el: HTMLElement;

  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'prodoc-editor break-words text-slate-900'; 
    this.el.style.position = 'absolute';
    this.el.style.visibility = 'hidden';
    this.el.style.height = 'auto';
    this.el.style.top = '-10000px';
    this.el.style.left = '-10000px';
    this.el.style.padding = '0';
    this.el.style.margin = '0';
    this.el.style.fontFamily = 'Calibri, Inter, sans-serif';
    this.el.style.fontSize = '11pt';
    this.el.style.lineHeight = '1.35';
    this.el.style.wordWrap = 'break-word';
    this.el.style.overflowWrap = 'break-word';
    this.el.style.whiteSpace = 'normal';
    this.el.style.display = 'flow-root';
    this.el.style.contain = 'layout style';
    if (typeof document !== 'undefined' && document.body) {
      document.body.appendChild(this.el);
    }
  }

  setWidth(width: number): void {
    const wStr = `${Math.round(width)}px`;
    if (this.el.style.width !== wStr) {
      this.el.style.width = wStr;
    }
  }

  measure(node: Node, cache?: MeasurementCache, width?: number): number {
    const effectiveWidth = width || (this.el.clientWidth || 800);
    if (node.nodeType === Node.ELEMENT_NODE && cache) {
      const el = node as HTMLElement;
      const cached = cache.get(el, effectiveWidth);
      if (cached !== undefined) return cached;
    }

    // Fast-path pure text paragraph measurement via TypographyEngine (only for simple Latin scripts)
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as HTMLElement).tagName === 'P' &&
      !(node as HTMLElement).querySelector('img, table, math-field, pre, canvas') &&
      !(node as HTMLElement).getAttribute('style')
    ) {
      const textContent = node.textContent || '';
      // Complex scripts (Bengali, Arabic, ligatures, etc.) require browser-native DOM text shaping
      if (textContent.length > 0 && textContent.length < 500 && !TypographyEngine.isComplexScript(textContent)) {
        const measured = TypographyEngine.measureParagraphText(textContent, effectiveWidth, {
          fontFamily: this.el.style.fontFamily,
          fontSizePt: 11,
          lineHeight: 1.35,
        });
        if (node.nodeType === Node.ELEMENT_NODE && cache) {
          cache.set(node as HTMLElement, measured.totalHeight, effectiveWidth);
        }
        return measured.totalHeight;
      }
    }

    this.el.appendChild(node);
    let height = Math.ceil(this.el.getBoundingClientRect().height);
    // Headless/jsdom layout fallback: if getBoundingClientRect returns 0,
    // compute accurate fallback heights for tables, rows, and text blocks
    if (height === 0 && node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const measureRowFallback = (row: HTMLTableRowElement): number => {
        const explicitRowH = parseFloat(row.style.height || row.style.minHeight || '0') || 0;
        const cells = Array.from(row.cells);
        const colCount = Math.max(1, cells.length);
        const colWidth = Math.max(60, Math.floor(effectiveWidth / colCount) - 12);
        let maxCellH = 28;
        for (const cell of cells) {
          const explicitCellH = parseFloat(cell.style.height || cell.style.minHeight || '0') || 0;
          const childBlocks = Array.from(cell.children).filter(
            (c) => !['BR'].includes(c.tagName)
          );
          let cellH = 0;
          if (childBlocks.length > 0) {
            for (const block of childBlocks) {
              const txt = block.textContent || '';
              if (txt.trim().length > 0) {
                const m = TypographyEngine.measureParagraphText(txt, colWidth, {
                  fontFamily: this.el.style.fontFamily,
                  fontSizePt: 11,
                  lineHeight: 1.35,
                });
                cellH += Math.max(20, Math.ceil(m.totalHeight));
              } else {
                cellH += 20;
              }
            }
            cellH += 10;
          } else {
            const brCount = cell.querySelectorAll('br').length;
            const txt = cell.textContent || '';
            if (txt.trim().length > 0) {
              const m = TypographyEngine.measureParagraphText(txt, colWidth, {
                fontFamily: this.el.style.fontFamily,
                fontSizePt: 11,
                lineHeight: 1.35,
              });
              cellH = Math.max(28, Math.ceil(m.totalHeight) + 10 + Math.max(0, brCount - 1) * 18);
            } else {
              cellH = Math.max(28, 12 + brCount * 18);
            }
          }
          maxCellH = Math.max(maxCellH, explicitCellH, cellH);
        }
        return Math.max(28, explicitRowH, maxCellH);
      };

      if (el.tagName === 'TABLE') {
        const rows = Array.from((el as HTMLTableElement).rows);
        let totalTableH = 16; // top/bottom table margin (8px * 2)
        for (const row of rows) {
          totalTableH += measureRowFallback(row);
        }
        height = Math.max(30, totalTableH);
      } else if (el.tagName === 'TR') {
        height = measureRowFallback(el as HTMLTableRowElement);
      } else {
        const textContent = el.textContent || '';
        if (textContent.length > 0) {
          const isH1 = el.tagName === 'H1';
          const isH2 = el.tagName === 'H2';
          const isH3 = el.tagName === 'H3';
          const fontSizePt = isH1 ? 24 : isH2 ? 18 : isH3 ? 14 : 11;
          const measured = TypographyEngine.measureParagraphText(textContent, effectiveWidth, {
            fontFamily: this.el.style.fontFamily,
            fontSizePt,
            lineHeight: 1.35,
          });
          height = Math.max(24, Math.ceil(measured.totalHeight));
        } else {
          height = 24;
        }
      }
    }
    this.el.removeChild(node);
    if (node.nodeType === Node.ELEMENT_NODE && cache) {
      cache.set(node as HTMLElement, height, effectiveWidth);
    }
    return height;
  }

  destroy(): void {
    if (this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }
}

