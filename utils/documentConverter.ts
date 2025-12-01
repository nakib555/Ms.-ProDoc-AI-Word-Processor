
import React from 'react';

// Helper to convert style objects to CSS string
const styleToString = (style: any): string => {
  if (!style) return '';
  return Object.entries(style).map(([k, v]) => {
    // Convert camelCase to kebab-case
    const key = k.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    // Add units if missing for common numeric properties
    const val = (typeof v === 'number' && ['width', 'height', 'font-size', 'margin', 'padding', 'border-width'].some(p => key.includes(p))) 
      ? `${v}px` 
      : v;
    return `${key}: ${val}`;
  }).join('; ');
};

const renderInlineContent = (contentItems: any): string => {
  if (!contentItems) return '';
  
  // Handle if content is just a string
  if (typeof contentItems === 'string') return contentItems;

  // Handle if content is not an array (single object)
  if (!Array.isArray(contentItems)) {
      contentItems = [contentItems];
  }
  
  return contentItems.map((item: any) => {
    // Handle if item is just a string
    if (typeof item === 'string') return item;

    let text = item.text || '';
    if (!text && !item.type) return ''; // Skip empty text

    // Apply inline styles wrapper if needed
    const styles: string[] = [];
    if (item.bold) styles.push('font-weight: bold');
    if (item.italic) styles.push('font-style: italic');
    if (item.underline && item.underline !== 'none') styles.push(`text-decoration: underline ${item.underlineColor || ''}`);
    if (item.strikethrough) styles.push('text-decoration: line-through');
    if (item.color) styles.push(`color: ${item.color}`);
    if (item.highlight) styles.push(`background-color: ${item.highlight}`);
    if (item.fontFamily) styles.push(`font-family: ${item.fontFamily}`);
    if (item.fontSize) styles.push(`font-size: ${item.fontSize}px`);
    if (item.subscript) return `<sub>${text}</sub>`;
    if (item.superscript) return `<sup>${text}</sup>`;
    if (item.style) styles.push(styleToString(item.style));

    let contentHtml = text;
    if (styles.length > 0) {
      contentHtml = `<span style="${styles.join('; ')}">${text}</span>`;
    }

    // Handle Links
    if (item.link) {
      return `<a href="${item.link}" style="color: #2563eb; text-decoration: underline;">${contentHtml}</a>`;
    }

    return contentHtml;
  }).join('');
};

export const jsonToHtml = (jsonData: any): string => {
  if (!jsonData) return '';

  // If it's a raw string response, assume it's just a paragraph
  if (typeof jsonData === 'string') {
      return `<p>${jsonData}</p>`;
  }

  // Robustness: Handle different root structures
  let blocks = [];
  if (jsonData.document && Array.isArray(jsonData.document.blocks)) {
      blocks = jsonData.document.blocks;
  } else if (jsonData.blocks && Array.isArray(jsonData.blocks)) {
      blocks = jsonData.blocks;
  } else if (Array.isArray(jsonData)) {
      blocks = jsonData;
  } else if (jsonData.type && jsonData.content) {
      // Single block object treated as root
      blocks = [jsonData];
  } else {
      // Fallback: If object keys look like content, try to render
      if (jsonData.title) blocks.push({type: 'heading', level: 1, content: jsonData.title});
      if (jsonData.summary) blocks.push({type: 'paragraph', content: jsonData.summary});
      // If we still have nothing, stringify it safely
      if (blocks.length === 0) return `<p>${JSON.stringify(jsonData)}</p>`;
  }

  let html = '';

  blocks.forEach((block: any) => {
    // Combine explicit style object with paragraphStyle properties
    const combinedStyle = {
      ...(block.style || {}),
      ...(block.paragraphStyle ? {
        textAlign: block.paragraphStyle.alignment,
        marginTop: block.paragraphStyle.spacingBefore ? `${block.paragraphStyle.spacingBefore}pt` : undefined,
        marginBottom: block.paragraphStyle.spacingAfter ? `${block.paragraphStyle.spacingAfter}pt` : undefined,
        lineHeight: block.paragraphStyle.lineSpacing,
        textIndent: block.paragraphStyle.indent?.firstLine ? (typeof block.paragraphStyle.indent.firstLine === 'number' ? `${block.paragraphStyle.indent.firstLine}in` : block.paragraphStyle.indent.firstLine) : undefined,
        marginLeft: block.paragraphStyle.indent?.left ? (typeof block.paragraphStyle.indent.left === 'number' ? `${block.paragraphStyle.indent.left}in` : block.paragraphStyle.indent.left) : undefined,
      } : {})
    };

    const styleStr = styleToString(combinedStyle);

    switch (block.type) {
      case 'heading':
        const level = Math.min(Math.max(block.level || 1, 1), 6);
        html += `<h${level} style="${styleStr}">${renderInlineContent(block.content)}</h${level}>`;
        break;

      case 'paragraph':
        html += `<p style="${styleStr}">${renderInlineContent(block.content)}</p>`;
        break;

      case 'image':
        html += `<div style="text-align: center; margin: 1em 0;">
                  <img src="${block.src}" alt="${block.alt || ''}" style="${styleStr}" />
                 </div>`;
        break;

      case 'code':
        html += `<pre style="background-color: #1e1e1e; color: #d4d4d4; padding: 1em; border-radius: 4px; overflow-x: auto; ${styleStr}"><code>${typeof block.content === 'string' ? block.content : renderInlineContent(block.content)}</code></pre>`;
        break;

      case 'equation':
        // Render as the editor's equation wrapper
        const latex = block.latex || '';
        html += `<p style="text-align: center;"><span class="equation-wrapper" contenteditable="false"><span class="equation-handle">⋮⋮</span><math-field>${latex}</math-field><span class="equation-dropdown">▼</span></span></p>`;
        break;

      case 'table':
        let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 1em 0; ${styleStr}">`;
        if (block.rows) {
          block.rows.forEach((row: any, rIndex: number) => {
            tableHtml += '<tr>';
            const isHeader = block.config?.hasHeaderRow && rIndex === 0;
            const cellTag = isHeader ? 'th' : 'td';
            
            if (row.cells) {
              row.cells.forEach((cell: any) => {
                const cellStyle = {
                  padding: '8px',
                  border: `1px solid ${block.config?.borderColor || '#cbd5e1'}`,
                  textAlign: 'left',
                  backgroundColor: isHeader ? '#f1f5f9' : (block.config?.bandedRows && rIndex % 2 === 0 ? '#f8fafc' : 'transparent'),
                  ...(cell.style || {})
                };
                tableHtml += `<${cellTag} style="${styleToString(cellStyle)}">${renderInlineContent(cell.content)}</${cellTag}>`;
              });
            }
            tableHtml += '</tr>';
          });
        }
        tableHtml += '</table>';
        html += tableHtml;
        break;

      case 'list':
        const tag = block.listType === 'ordered' ? 'ol' : 'ul';
        html += `<${tag} style="${styleStr}">`;
        if (block.items) {
          block.items.forEach((item: any) => {
            html += `<li>${renderInlineContent(item.content || item)}`; // Robust handle if item is direct text
            if (item.subItems) {
               html += `<${tag}>`;
               item.subItems.forEach((sub: any) => {
                   html += `<li>${renderInlineContent(sub.content || sub)}</li>`;
               });
               html += `</${tag}>`;
            }
            html += `</li>`;
          });
        }
        html += `</${tag}>`;
        break;

      case 'pageBreak':
        html += `<div class="prodoc-page-break" style="page-break-after: always; height: 0; width: 100%; display: block;"></div>`;
        break;

      default:
        // Try generic fallback if content exists
        if (block.content) {
             html += `<div style="${styleStr}">${renderInlineContent(block.content)}</div>`;
        }
        break;
    }
  });

  return html;
};
