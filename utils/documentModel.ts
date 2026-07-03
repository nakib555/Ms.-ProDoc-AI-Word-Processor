import { PageConfig } from '../types';

export interface TextStyle {
  fontFamily?: string;
  fontSize?: string | number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  color?: string;
  highlight?: string;
}

export interface TextRun {
  type: 'text';
  text: string;
  style?: TextStyle;
}

export interface EquationElement {
  type: 'equation';
  latex: string;
}

export interface ImageElement {
  type: 'image';
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  style?: Record<string, string>;
}

export interface ParagraphSpacing {
  before?: number;
  after?: number;
}

export interface ParagraphElement {
  type: 'paragraph';
  alignment?: 'left' | 'center' | 'right' | 'justify';
  spacing?: ParagraphSpacing;
  indent?: number;
  bulletList?: boolean;
  orderedList?: boolean;
  listIndex?: number;
  children: (TextRun | EquationElement | ImageElement)[];
}

export interface HeadingElement {
  type: 'heading';
  level: number;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  children: TextRun[];
}

export interface PageBreakElement {
  type: 'pageBreak';
}

export type SectionElement = 
  | ParagraphElement 
  | HeadingElement 
  | TableElement 
  | ImageElement 
  | EquationElement 
  | PageBreakElement;

export interface TableCellElement {
  elements: (ParagraphElement | HeadingElement)[];
  style?: Record<string, string>;
}

export interface TableRowElement {
  cells: TableCellElement[];
  style?: Record<string, string>;
}

export interface TableElement {
  type: 'table';
  rows: TableRowElement[];
  style?: Record<string, string>;
}

export interface DocumentSection {
  elements: SectionElement[];
  pageSettings?: Record<string, any>;
}

export interface DocumentPage {
  sections: DocumentSection[];
  headers?: {
    body?: string;
    firstPage?: string;
  };
  footers?: {
    body?: string;
    firstPage?: string;
  };
}

export interface DocumentMetadata {
  title: string;
  lastModified: string;
  creationDate: string;
}

export interface JSONDocumentModel {
  type: 'document';
  metadata: DocumentMetadata;
  pageConfig: PageConfig;
  pages: DocumentPage[];
}

// Helper to convert CSS style string to a Record<string, string>
function parseInlineStyle(styleString: string | null): Record<string, string> {
  if (!styleString) return {};
  const styles: Record<string, string> = {};
  styleString.split(';').forEach(rule => {
    const parts = rule.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
      const value = parts.slice(1).join(':').trim();
      if (key && value) {
        styles[key] = value;
      }
    }
  });
  return styles;
}

// Helper to convert style Record to inline style string
function styleRecordToString(style: Record<string, string> | undefined): string {
  if (!style) return '';
  return Object.entries(style)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`)
    .join('; ');
}

// Recursively parse inline styles and text nodes into TextRuns
function parseInlineElements(node: Node, parentStyle: TextStyle = {}): (TextRun | EquationElement | ImageElement)[] {
  const elements: (TextRun | EquationElement | ImageElement)[] = [];

  node.childNodes.forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue;
      if (text) {
        elements.push({
          type: 'text',
          text,
          style: Object.keys(parentStyle).length > 0 ? { ...parentStyle } : undefined
        });
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement;
      
      // Handle Image
      if (el.tagName === 'IMG') {
        const styleRecord = parseInlineStyle(el.getAttribute('style'));
        elements.push({
          type: 'image',
          src: el.getAttribute('src') || '',
          alt: el.getAttribute('alt') || '',
          width: el.getAttribute('width') || styleRecord.width || undefined,
          height: el.getAttribute('height') || styleRecord.height || undefined,
          style: styleRecord
        });
        return;
      }

      // Handle Math / Equations
      if (el.tagName === 'MATH-FIELD' || el.classList.contains('equation-wrapper')) {
        let latex = '';
        if (el.tagName === 'MATH-FIELD') {
          latex = el.getAttribute('value') || el.textContent || '';
        } else {
          const mathField = el.querySelector('math-field');
          latex = mathField ? (mathField.getAttribute('value') || mathField.textContent || '') : '';
        }
        elements.push({
          type: 'equation',
          latex
        });
        return;
      }

      // Inherit styles
      const childStyle: TextStyle = { ...parentStyle };
      const tagName = el.tagName.toUpperCase();

      if (tagName === 'STRONG' || tagName === 'B') childStyle.bold = true;
      if (tagName === 'EM' || tagName === 'I') childStyle.italic = true;
      if (tagName === 'U') childStyle.underline = true;
      if (tagName === 'STRIKE' || tagName === 'S' || tagName === 'DEL') childStyle.strikeThrough = true;

      // Extract SPAN styles
      if (el.style.fontFamily) childStyle.fontFamily = el.style.fontFamily;
      if (el.style.fontSize) childStyle.fontSize = el.style.fontSize;
      if (el.style.color) childStyle.color = el.style.color;
      if (el.style.backgroundColor) childStyle.highlight = el.style.backgroundColor;

      // Handle links: render as styled text
      if (tagName === 'A') {
        childStyle.underline = true;
        childStyle.color = '#2563eb';
      }

      const childRuns = parseInlineElements(child, childStyle);
      elements.push(...childRuns);
    }
  });

  return elements;
}

// Parse a single section block
function parseBlockElement(el: HTMLElement): SectionElement | null {
  const tagName = el.tagName.toUpperCase();

  // 1. Page Break
  if (el.classList.contains('prodoc-page-break') || el.style.pageBreakAfter === 'always') {
    return { type: 'pageBreak' };
  }

  // 2. Headings
  if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tagName)) {
    const level = parseInt(tagName.substring(1));
    const alignment = (el.style.textAlign as any) || 'left';
    const runs = parseInlineElements(el).filter(r => r.type === 'text') as TextRun[];
    return {
      type: 'heading',
      level,
      alignment,
      children: runs
    };
  }

  // 3. Table
  if (tagName === 'TABLE') {
    const rows: TableRowElement[] = [];
    const trElements = el.querySelectorAll('tr');
    trElements.forEach(tr => {
      const cells: TableCellElement[] = [];
      const cellElements = tr.querySelectorAll('td, th');
      cellElements.forEach(cell => {
        const subElements: (ParagraphElement | HeadingElement)[] = [];
        cell.childNodes.forEach(child => {
          if (child.nodeType === Node.ELEMENT_NODE) {
            const parsed = parseBlockElement(child as HTMLElement);
            if (parsed && (parsed.type === 'paragraph' || parsed.type === 'heading')) {
              subElements.push(parsed);
            }
          } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue?.trim()) {
            // Text node in table cell gets wrapped in a paragraph
            subElements.push({
              type: 'paragraph',
              children: [{ type: 'text', text: child.nodeValue }]
            });
          }
        });
        
        // Ensure table cell has at least one element
        if (subElements.length === 0) {
          subElements.push({
            type: 'paragraph',
            children: [{ type: 'text', text: '' }]
          });
        }

        cells.push({
          elements: subElements,
          style: parseInlineStyle((cell as HTMLElement).getAttribute('style'))
        });
      });

      rows.push({
        cells,
        style: parseInlineStyle(tr.getAttribute('style'))
      });
    });

    return {
      type: 'table',
      rows,
      style: parseInlineStyle(el.getAttribute('style'))
    };
  }

  // 4. Unordered/Ordered Lists
  if (tagName === 'UL' || tagName === 'OL') {
    // Treat lists as a flat list of paragraph items for layout purposes
    const listItems: ParagraphElement[] = [];
    el.childNodes.forEach((li, index) => {
      if (li.nodeType === Node.ELEMENT_NODE && (li as HTMLElement).tagName === 'LI') {
        const runs = parseInlineElements(li);
        listItems.push({
          type: 'paragraph',
          bulletList: tagName === 'UL',
          orderedList: tagName === 'OL',
          listIndex: index + 1,
          children: runs as any
        });
      }
    });
    // For single element parse block, we'll return the first list paragraph item or join them.
    // Actually, it's cleaner to handle this in body parser where UL/OL children are flattened.
    return null;
  }

  // 5. Paragraph
  const alignment = (el.style.textAlign as any) || 'left';
  const spacing: ParagraphSpacing = {};
  if (el.style.marginTop) spacing.before = parseInt(el.style.marginTop);
  if (el.style.marginBottom) spacing.after = parseInt(el.style.marginBottom);
  const indent = el.style.marginLeft ? parseInt(el.style.marginLeft) : undefined;

  const children = parseInlineElements(el);

  return {
    type: 'paragraph',
    alignment,
    spacing,
    indent,
    children
  };
}

/**
 * Converts live HTML content from the editor into our custom Structured JSON Document Model
 */
export function htmlToJSONDocument(
  html: string,
  title: string,
  pageConfig: PageConfig,
  lastModifiedDate?: Date,
  creationDate?: Date
): JSONDocumentModel {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html || '<p><br></p>', 'text/html');

  const pages: DocumentPage[] = [];
  let currentElements: SectionElement[] = [];

  const addPage = () => {
    pages.push({
      sections: [{
        elements: currentElements.length > 0 ? [...currentElements] : [{ type: 'paragraph', children: [{ type: 'text', text: '' }] }],
        pageSettings: {
          size: pageConfig.size,
          orientation: pageConfig.orientation,
          margins: pageConfig.margins
        }
      }]
    });
    currentElements = [];
  };

  // Flatten lists during HTML traversal
  doc.body.childNodes.forEach(child => {
    if (child.nodeType !== Node.ELEMENT_NODE) return;
    const el = child as HTMLElement;
    const tagName = el.tagName.toUpperCase();

    if (tagName === 'UL' || tagName === 'OL') {
      el.querySelectorAll('li').forEach((li, index) => {
        const runs = parseInlineElements(li);
        currentElements.push({
          type: 'paragraph',
          bulletList: tagName === 'UL',
          orderedList: tagName === 'OL',
          listIndex: index + 1,
          children: runs as any
        });
      });
    } else {
      const parsed = parseBlockElement(el);
      if (parsed) {
        if (parsed.type === 'pageBreak') {
          addPage();
        } else {
          currentElements.push(parsed);
        }
      }
    }
  });

  // Add the last page
  addPage();

  const nowStr = new Date().toISOString();
  return {
    type: 'document',
    metadata: {
      title,
      lastModified: lastModifiedDate ? lastModifiedDate.toISOString() : nowStr,
      creationDate: creationDate ? creationDate.toISOString() : nowStr
    },
    pageConfig,
    pages
  };
}

// Render a TextRun to HTML string
function renderTextRun(run: TextRun): string {
  if (!run.style || Object.keys(run.style).length === 0) {
    return run.text;
  }

  const s = run.style;
  let html = run.text;

  // Render text markers
  if (s.bold) html = `<strong>${html}</strong>`;
  if (s.italic) html = `<em>${html}</em>`;
  if (s.underline) html = `<u>${html}</u>`;
  if (s.strikeThrough) html = `<s>${html}</s>`;

  // Apply spans for visual properties
  const styles: string[] = [];
  if (s.fontFamily) styles.push(`font-family: ${s.fontFamily}`);
  if (s.fontSize) {
    const size = typeof s.fontSize === 'number' ? `${s.fontSize}px` : s.fontSize;
    styles.push(`font-size: ${size}`);
  }
  if (s.color) styles.push(`color: ${s.color}`);
  if (s.highlight) styles.push(`background-color: ${s.highlight}`);

  if (styles.length > 0) {
    html = `<span style="${styles.join('; ')}">${html}</span>`;
  }

  return html;
}

// Render a paragraph/heading/table element to HTML string
function renderSectionElement(el: SectionElement): string {
  switch (el.type) {
    case 'heading': {
      const styles: string[] = [];
      if (el.alignment) styles.push(`text-align: ${el.alignment}`);
      const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
      const content = el.children.map(renderTextRun).join('');
      return `<h${el.level}${styleAttr}>${content || '<br>'}</h${el.level}>`;
    }

    case 'paragraph': {
      const styles: string[] = [];
      if (el.alignment) styles.push(`text-align: ${el.alignment}`);
      if (el.spacing?.before) styles.push(`margin-top: ${el.spacing.before}px`);
      if (el.spacing?.after) styles.push(`margin-bottom: ${el.spacing.after}px`);
      if (el.indent) styles.push(`margin-left: ${el.indent}px`);

      const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
      const content = el.children.map(child => {
        if (child.type === 'text') return renderTextRun(child);
        if (child.type === 'equation') {
          return `<span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type equation here." value="${child.latex}">${child.latex}</math-field><span class="equation-dropdown">▼</span></span>`;
        }
        if (child.type === 'image') {
          const imgStyles = styleRecordToString(child.style);
          const styleAttr = imgStyles ? ` style="${imgStyles}"` : '';
          return `<img src="${child.src}" alt="${child.alt || ''}"${styleAttr}/>`;
        }
        return '';
      }).join('');

      if (el.bulletList) {
        return `<li${styleAttr}>${content || '<br>'}</li>`;
      }
      if (el.orderedList) {
        return `<li${styleAttr}>${content || '<br>'}</li>`;
      }

      return `<p${styleAttr}>${content || '<br>'}</p>`;
    }

    case 'table': {
      const tableStyles = styleRecordToString(el.style);
      const tableStyleAttr = tableStyles ? ` style="${tableStyles}"` : ' style="width: 100%; border-collapse: collapse;"';
      
      let html = `<table${tableStyleAttr}><tbody>`;
      el.rows.forEach(row => {
        const rowStyles = styleRecordToString(row.style);
        const rowStyleAttr = rowStyles ? ` style="${rowStyles}"` : '';
        html += `<tr${rowStyleAttr}>`;
        row.cells.forEach(cell => {
          const cellStyles = styleRecordToString(cell.style);
          const cellStyleAttr = cellStyles ? ` style="${cellStyles}"` : '';
          html += `<td${cellStyleAttr}>`;
          html += cell.elements.map(renderSectionElement).join('');
          html += `</td>`;
        });
        html += `</tr>`;
      });
      html += `</tbody></table>`;
      return html;
    }

    case 'image': {
      const styles = styleRecordToString(el.style);
      const styleAttr = styles ? ` style="${styles}"` : '';
      return `<p style="text-align: center;"><img src="${el.src}" alt="${el.alt || ''}"${styleAttr}/></p>`;
    }

    case 'equation': {
      return `<p style="text-align: center;"><span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field placeholder="Type equation here." value="${el.latex}">${el.latex}</math-field><span class="equation-dropdown">▼</span></span></p>`;
    }

    case 'pageBreak': {
      return `<div class="prodoc-page-break" data-type="page-break" style="page-break-after: always;"><hr></div><p><br></p>`;
    }

    default:
      return '';
  }
}

/**
 * Converts our custom Structured JSON Document Model back into standard HTML content for editor injection and rendering
 */
export function jsonDocumentToHtml(model: JSONDocumentModel | null): string {
  if (!model || !model.pages) return '<p><br></p>';

  const htmlParts: string[] = [];

  model.pages.forEach((page, pageIdx) => {
    // If it's not the first page, prepend a page break
    if (pageIdx > 0) {
      htmlParts.push(`<div class="prodoc-page-break" data-type="page-break" style="page-break-after: always;"><hr></div><p><br></p>`);
    }

    page.sections.forEach(section => {
      let activeListType: 'UL' | 'OL' | null = null;
      
      section.elements.forEach(element => {
        // Handle list wrapping to output semantic <ul> / <ol> blocks
        if (element.type === 'paragraph' && (element.bulletList || element.orderedList)) {
          const expectedListType = element.bulletList ? 'UL' : 'OL';
          if (activeListType !== expectedListType) {
            if (activeListType !== null) {
              htmlParts.push(`</${activeListType}>`);
            }
            htmlParts.push(`<${expectedListType}>`);
            activeListType = expectedListType;
          }
          htmlParts.push(renderSectionElement(element));
        } else {
          if (activeListType !== null) {
            htmlParts.push(`</${activeListType}>`);
            activeListType = null;
          }
          htmlParts.push(renderSectionElement(element));
        }
      });

      if (activeListType !== null) {
        htmlParts.push(`</${activeListType}>`);
      }
    });
  });

  return htmlParts.join('\n');
}
