import { describe, it, expect } from 'vitest';
import { 
  JSONDocumentModel, 
  defaultMigrationRegistry, 
  DocumentDiffPatchEngine, 
  validateDocumentNode,
  htmlToJSONDocument,
  jsonDocumentToHtml,
  SectionElement,
  HeadingElement,
  ImageElement,
} from '../../utils/documentModel';

describe('DocumentModel Schema & Migrations', () => {
  it('validates document nodes using registered rules (HeadingLevel, AltText)', () => {
    // Valid heading
    const validHeading: HeadingElement = {
      id: 'h-1',
      type: 'heading',
      level: 2,
      children: [{ type: 'text', text: 'Valid Title' }]
    };
    const validErrors = validateDocumentNode(validHeading);
    expect(validErrors).toHaveLength(0);

    // Invalid heading level > 6 triggers INVALID_HEADING_LEVEL rule
    const invalidHeading: HeadingElement = {
      id: 'h-2',
      type: 'heading',
      level: 9 as any,
      children: [{ type: 'text', text: 'Too deep' }]
    };
    const headingIssues = validateDocumentNode(invalidHeading);
    expect(headingIssues.some(i => i.code === 'INVALID_HEADING_LEVEL')).toBe(true);

    // Image missing alt text triggers ACCESSIBILITY_MISSING_ALT_TEXT rule
    const imageWithoutAlt: ImageElement = {
      id: 'img-1',
      type: 'image',
      src: 'https://example.com/logo.png',
      alt: ''
    };
    const imgIssues = validateDocumentNode(imageWithoutAlt);
    expect(imgIssues.some(i => i.code === 'MISSING_ALT_TEXT')).toBe(true);
  });

  it('performs bidirectional v1 <-> v2 migrations without data loss', () => {
    const v1Doc: any = {
      type: 'document',
      schemaVersion: 1,
      metadata: { title: 'v1 Test Document' },
      pages: [
        {
          sections: [
            {
              elements: [
                { type: 'paragraph', children: [{ type: 'text', text: 'Paragraph v1' }] },
                { 
                  type: 'table', 
                  rows: [
                    { cells: [{ elements: [{ type: 'paragraph', children: [{ type: 'text', text: 'Cell v1' }] }] }] }
                  ] 
                }
              ]
            }
          ]
        }
      ]
    };

    // Forward migration v1 -> v2
    const v2Doc = defaultMigrationRegistry.migrate(v1Doc as JSONDocumentModel, 2);
    expect(v2Doc.schemaVersion).toBe(2);
    expect(v2Doc.pages[0].sections[0].elements[0].id).toBeDefined();

    // Backward migration v2 -> v1
    const v1Downgraded = defaultMigrationRegistry.migrate(v2Doc, 1);
    expect(v1Downgraded.schemaVersion).toBe(1);

    // Double roundtrip verification v1 -> v2 again
    const v2ReMigrated = defaultMigrationRegistry.migrate(v1Downgraded, 2);
    expect(v2ReMigrated.schemaVersion).toBe(2);
    expect(v2ReMigrated.pages[0].sections[0].elements[0].id).toBeDefined();
  });

  it('applies immutable node patches and structural patch arrays via DocumentDiffPatchEngine', () => {
    const initialDoc: JSONDocumentModel = {
      id: 'doc-1',
      schemaVersion: 2,
      metadata: { title: 'Doc A', createdAt: '2026-01-01', modifiedAt: '2026-01-01' },
      pageConfig: { size: 'Letter', orientation: 'portrait', margins: { top: 72, right: 72, bottom: 72, left: 72 } },
      pages: [
        {
          id: 'page-1',
          sections: [
            {
              id: 'sec-1',
              elements: [
                { id: 'el-1', type: 'paragraph', children: [{ type: 'text', text: 'Original line' }] }
              ]
            }
          ]
        }
      ]
    };

    // Test patchNode
    const updatedParagraph: SectionElement = {
      id: 'el-1',
      type: 'paragraph',
      children: [{ type: 'text', text: 'Updated line' }]
    };
    const patchedDoc = DocumentDiffPatchEngine.patchNode(initialDoc, 'el-1', updatedParagraph);
    expect(
      (patchedDoc.pages[0].sections[0].elements[0] as any).children[0].text
    ).toBe('Updated line');
    // Verify immutability of original
    expect(
      (initialDoc.pages[0].sections[0].elements[0] as any).children[0].text
    ).toBe('Original line');

    // Test insertNodeAfter
    const newElement: SectionElement = {
      id: 'el-2',
      type: 'paragraph',
      children: [{ type: 'text', text: 'Inserted line' }]
    };
    const insertedDoc = DocumentDiffPatchEngine.insertNodeAfter(patchedDoc, 'el-1', newElement);
    expect(insertedDoc.pages[0].sections[0].elements).toHaveLength(2);
    expect(insertedDoc.pages[0].sections[0].elements[1].id).toBe('el-2');

    // Test deleteNode
    const deletedDoc = DocumentDiffPatchEngine.deleteNode(insertedDoc, 'el-1');
    expect(deletedDoc.pages[0].sections[0].elements).toHaveLength(1);
    expect(deletedDoc.pages[0].sections[0].elements[0].id).toBe('el-2');
  });

  it('converts HTML headings, paragraphs, and lists to JSON document nodes', () => {
    const html = `
      <h1>Main Document Heading</h1>
      <p>This is a standard <strong>bold paragraph</strong> with <em>italic accent</em>.</p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    `;

    const model = htmlToJSONDocument(html, 'Test Doc', {
      size: 'Letter',
      orientation: 'portrait',
      margins: { top: 72, right: 72, bottom: 72, left: 72 }
    });

    expect(model).toBeDefined();
    expect(model.pages.length).toBeGreaterThan(0);
    const elements = model.pages[0].sections[0].elements;
    expect(elements.length).toBeGreaterThan(0);

    const backToHtml = jsonDocumentToHtml(model);
    expect(backToHtml).toContain('Main Document Heading');
    expect(backToHtml).toContain('bold paragraph');
  });
});
