// utils/tocEngine.ts

export interface TocItem {
  id: string; // anchor id
  level: number; // 1 = H1, 2 = H2, etc.
  text: string;
  pageNumber?: number; // computed page position
  prefix?: string; // number hierarchy (e.g. "1.2")
}

/**
 * Enterprise-grade Table of Contents (TOC) Engine.
 * Scans document elements, constructs hierarchy, formats clickable entries,
 * and handles modern flex-dot leaders for clean document layouts.
 */
export class TocEngine {
  /**
   * Scans a compiled HTML string or DOM document to extract structural headings.
   */
  public scanHeadings(htmlContent: string): TocItem[] {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    const headings = tempDiv.querySelectorAll('h1, h2, h3, h4');
    const items: TocItem[] = [];

    // Helper to compute section numbers
    const levelCounters = [0, 0, 0, 0];

    headings.forEach((heading, idx) => {
      const tagName = heading.tagName.toLowerCase();
      const level = parseInt(tagName.substring(1), 10); // 1, 2, 3...
      const text = heading.textContent?.replace(/^[\d.\s]+/, '').trim() || 'Untitled Heading';

      // Increment counters
      const levelIndex = level - 1;
      if (levelIndex < 4) {
        levelCounters[levelIndex]++;
        // Reset sublevels
        for (let i = levelIndex + 1; i < 4; i++) {
          levelCounters[i] = 0;
        }
      }

      // Generate prefix (e.g., "1.2.3")
      const prefixParts = levelCounters.slice(0, levelIndex + 1);
      const prefix = prefixParts.join('.');

      // Ensure heading has an ID for anchors
      let id = heading.getAttribute('id');
      if (!id) {
        id = `heading-${level}-${idx}`;
        heading.setAttribute('id', id);
      }

      items.push({
        id,
        level,
        text,
        prefix
      });
    });

    return items;
  }

  /**
   * Generates production-ready HTML for the Table of Contents, 
   * complete with hyperlinks, dot-leaders, and precise nesting.
   */
  public generateTocHtml(items: TocItem[], pageMap: Record<string, number> = {}): string {
    if (items.length === 0) {
      return `
        <div class="toc-empty p-6 text-center text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
          No headings found. Add H1, H2, or H3 tags in your document to compile a Table of Contents.
        </div>
      `;
    }

    let html = `
      <div class="prodoc-toc p-4 select-none bg-slate-50/40 dark:bg-slate-900/10 rounded-2xl border border-slate-100 dark:border-slate-800/60 font-sans" data-type="toc">
        <h2 class="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200/50 pb-2">Table of Contents</h2>
        <div class="space-y-2.5">
    `;

    items.forEach(item => {
      // Nesting classes based on heading level
      const indentClass = 
        item.level === 2 ? 'pl-5 text-slate-600 dark:text-slate-300' : 
        item.level === 3 ? 'pl-10 text-slate-500 dark:text-slate-400' : 
        item.level >= 4 ? 'pl-14 text-slate-400' : 
        'font-semibold text-slate-800 dark:text-slate-100';

      const pageNum = pageMap[item.id] !== undefined ? pageMap[item.id] + 1 : '1';

      html += `
        <div class="toc-item flex justify-between items-end gap-2 text-sm ${indentClass} group transition-all">
          <a href="#${item.id}" class="hover:underline font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1.5 break-all">
            <span class="text-slate-400 text-xs font-mono select-none">${item.prefix}</span>
            <span>${item.text}</span>
          </a>
          <div class="flex-1 border-b border-dotted border-slate-300 dark:border-slate-700/80 mb-1 opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <span class="text-slate-500 dark:text-slate-400 font-mono text-xs select-all bg-slate-100/50 dark:bg-slate-800/40 px-1.5 py-0.5 rounded">${pageNum}</span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    return html;
  }
}

export const globalTocEngine = new TocEngine();
