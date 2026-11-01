import { describe, it, expect } from 'vitest';
import { paginateContent } from '../../utils/layoutEngine';
import { PageConfig } from '../../types';

describe('Stage 4: Word-Level Professional Pagination Engine', () => {
  const standardConfig: PageConfig = {
    size: 'A4',
    orientation: 'portrait',
    margins: { top: 1, bottom: 1, left: 1, right: 1, gutter: 0 },
    marginPreset: 'normal',
    background: 'none',
    headerDistance: 0.5,
    footerDistance: 0.5,
    verticalAlign: 'top',
  };

  it('preserves keep-with-next headings without leaving them orphaned at page bottoms', () => {
    // Fill first page nearly to the bottom, then place a heading
    const paragraphs = Array.from({ length: 15 }, (_, i) => 
      `<p>Paragraph line ${i + 1} with standard body content describing page layout and pagination boundaries in detail.</p>`
    ).join('\n');

    const html = `
      ${paragraphs}
      <h2>Section 2: Architecture Specifications</h2>
      <p>This is the first sentence following Section 2 architecture specification that must stay with its heading.</p>
    `;

    const result = paginateContent(html, standardConfig);
    expect(result.pages.length).toBeGreaterThanOrEqual(2);

    // The heading should either have content following it on its page or be on page 2
    const page1Html = result.pages[0].html;
    if (page1Html.includes('Section 2: Architecture Specifications')) {
      // Must not be the only/last element with zero subsequent text
      expect(page1Html).toContain('This is the first sentence following Section 2');
    } else {
      // Heading was cleanly deferred to page 2 with its following paragraph
      expect(result.pages[1].html).toContain('Section 2: Architecture Specifications');
    }
  });

  it('splits large multi-row tables cleanly across page boundaries', () => {
    const rows = Array.from({ length: 40 }, (_, i) => `
      <tr>
        <td style="border: 1px solid #000; padding: 6px;">Row ID ${i + 1}</td>
        <td style="border: 1px solid #000; padding: 6px;">Data value payload item ${i + 1}</td>
      </tr>
    `).join('\n');

    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #000; padding: 6px;">Header ID</th>
            <th style="border: 1px solid #000; padding: 6px;">Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;

    const result = paginateContent(tableHtml, standardConfig);
    expect(result.pages.length).toBeGreaterThanOrEqual(2);
    // Both pages must contain parts of the table
    expect(result.pages[0].html).toContain('<table');
    expect(result.pages[1].html).toContain('<table');
  });

  it('respects explicit page breaks (.prodoc-page-break)', () => {
    const html = `
      <p>First page text</p>
      <div class="prodoc-page-break" data-type="page-break"></div>
      <p>Second page text</p>
    `;

    const result = paginateContent(html, standardConfig);
    expect(result.pages.length).toBe(2);
    expect(result.pages[0].html).toContain('First page text');
    expect(result.pages[1].html).toContain('Second page text');
  });
});
