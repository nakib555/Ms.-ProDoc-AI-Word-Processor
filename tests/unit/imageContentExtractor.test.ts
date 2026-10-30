import { describe, it, expect } from 'vitest';
import { 
  buildEditableTableHTML, 
  buildEditableDocumentHTML,
  detectTableGrid,
  extractTextSegments 
} from '../../utils/imageContentExtractor';

describe('imageContentExtractor', () => {
  it('builds editable table HTML with rows, cols, and prodoc-table class', () => {
    const html = buildEditableTableHTML(3, 4, ['Col A', 'Col B', 'Col C', 'Col D']);
    expect(html).toContain('prodoc-table');
    expect(html).toContain('<table');
    expect(html).toContain('Col A');
    expect(html).toContain('Col D');
    expect(html).toContain('<td');
    expect(html).toContain('Item 1.1');
    expect(html).toContain('</table>');
  });

  it('builds editable document HTML with title, headings, and paragraphs', () => {
    const html = buildEditableDocumentHTML('Quarterly Financial Summary', [
      {
        heading: 'Revenue Highlights',
        paragraphs: ['Revenue increased by 18% year-over-year.'],
      },
      {
        heading: 'Action Items',
        isList: true,
        paragraphs: ['Audit operating expenses', 'Present revised budget'],
      },
    ]);

    expect(html).toContain('Quarterly Financial Summary');
    expect(html).toContain('Revenue Highlights');
    expect(html).toContain('Revenue increased by 18%');
    expect(html).toContain('<ul');
    expect(html).toContain('Audit operating expenses');
  });

  it('detectTableGrid correctly flags non-grid blanks', () => {
    const fakeData = new Uint8ClampedArray(100 * 100 * 4);
    fakeData.fill(255); // all white pixels
    const imgData = { data: fakeData, width: 100, height: 100, colorSpace: 'srgb' as PredefinedColorSpace };
    const res = detectTableGrid(imgData, 100, 100);
    expect(res.isTable).toBe(false);
  });

  it('extractTextSegments returns empty array when no dark text pixels exist', () => {
    const fakeData = new Uint8ClampedArray(100 * 100 * 4);
    fakeData.fill(255);
    const imgData = { data: fakeData, width: 100, height: 100, colorSpace: 'srgb' as PredefinedColorSpace };
    const res = extractTextSegments(imgData, 100, 100);
    expect(res.lines).toHaveLength(0);
  });
});
