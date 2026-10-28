import { describe, it, expect } from 'vitest';
import { htmlToJSONDocument, jsonDocumentToHtml } from '../../utils/documentModel';
import { PageConfig } from '../../types';

describe('Document Model Semantic Roundtrip Suite', () => {
  const dummyConfig: PageConfig = {
    size: 'Letter',
    orientation: 'portrait',
    margins: { top: 72, right: 72, bottom: 72, left: 72 }
  };

  it('preserves text formatting marks (bold, italic, underline, strike, color, highlight) across roundtrip', () => {
    const inputHtml = `
      <p>
        <span style="font-weight: bold;">Bold text</span>
        <span style="font-style: italic;">Italic text</span>
        <span style="text-decoration: underline;">Underlined text</span>
        <span style="text-decoration: line-through;">Strikethrough text</span>
        <span style="color: rgb(239, 68, 68);">Red text</span>
        <span style="background-color: rgb(254, 240, 138);">Highlighted text</span>
      </p>
    `;

    const model = htmlToJSONDocument(inputHtml, 'Marks Doc', dummyConfig);
    const outputHtml = jsonDocumentToHtml(model);

    expect(outputHtml).toContain('Bold text');
    expect(outputHtml).toContain('Italic text');
    expect(outputHtml).toContain('Underlined text');
    expect(outputHtml).toContain('Strikethrough text');
    expect(outputHtml).toContain('Red text');
    expect(outputHtml).toContain('Highlighted text');
  });

  it('preserves table matrix structures and cells across roundtrip', () => {
    const inputTableHtml = `
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ProDoc Writer</td>
            <td>PDW-001</td>
            <td>$99.00</td>
          </tr>
          <tr>
            <td>Cloud Storage Sync</td>
            <td>CSS-002</td>
            <td>$19.00</td>
          </tr>
        </tbody>
      </table>
    `;

    const model = htmlToJSONDocument(inputTableHtml, 'Table Doc', dummyConfig);
    expect(model.pages[0].sections[0].elements.some(el => el.type === 'table')).toBe(true);

    const outputHtml = jsonDocumentToHtml(model);
    expect(outputHtml).toContain('Product Name');
    expect(outputHtml).toContain('PDW-001');
    expect(outputHtml).toContain('Cloud Storage Sync');
    expect(outputHtml).toContain('<table');
  });

  it('preserves ordered and unordered lists across roundtrip', () => {
    const inputListsHtml = `
      <ul>
        <li>First bullet point</li>
        <li>Second bullet point</li>
      </ul>
      <ol>
        <li>Numbered step one</li>
        <li>Numbered step two</li>
      </ol>
    `;

    const model = htmlToJSONDocument(inputListsHtml, 'List Doc', dummyConfig);
    const outputHtml = jsonDocumentToHtml(model);

    expect(outputHtml).toContain('First bullet point');
    expect(outputHtml).toContain('Numbered step one');
  });

  it('preserves page breaks and isolates content between separate pages', () => {
    const inputWithBreak = `
      <p>Page 1 content here</p>
      <div class="prodoc-page-break"></div>
      <p>Page 2 content here</p>
    `;

    const model = htmlToJSONDocument(inputWithBreak, 'Paged Doc', dummyConfig);
    expect(model.pages.length).toBe(2);

    const outputHtml = jsonDocumentToHtml(model);
    expect(outputHtml).toContain('Page 1 content here');
    expect(outputHtml).toContain('Page 2 content here');
  });
});
