
import { PageConfig } from '../types';

/**
 * HYBRID PARSER: Markdown -> HTML
 * Preserves existing HTML tags while converting Markdown syntax.
 */
const parseMarkdownToHtml = (text: string): string => {
    if (!text) return '';

    let html = text;

    // 1. Pre-processing: Protect existing HTML tags by temporarily encoding them? 
    // Actually, simple regex replacements usually work fine if we are careful.
    // We assume the AI writes valid HTML mixed with Markdown.

    // 2. Block Level Elements (if the block type is generic 'text' or inside cells)
    
    // Headers (Only if at start of string)
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');

    // Horizontal Rule
    html = html.replace(/^---$/gim, '<hr />');

    // Images (Markdown syntax) ![alt](src)
    html = html.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%; height:auto;" />');

    // Links [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2563eb; text-decoration:underline;">$1</a>');

    // Bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic (*text*)
    html = html.replace(/\*([^*]+)\*/g, 'em>$1</em>'); // Typo fix in regex logic often needed: match non-stars

    // 3. Tables (Markdown Style)
    // Detect table block: | col | col | \n |---|---|
    // This is complex in regex. We will handle simple cases.
    if (html.includes('|') && html.includes('---')) {
        const lines = html.split('\n');
        let inTable = false;
        let tableHtml = '';
        let processedLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('|') && line.endsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    tableHtml += '<table style="border-collapse:collapse; width:100%; margin:1em 0; border:1px solid #cbd5e1;">';
                }
                
                // Check if it's the separator row
                if (line.includes('---')) {
                    continue; // Skip separator row logic in simple parser, browsers handle formatting
                }

                tableHtml += '<tr>';
                const cells = line.split('|').slice(1, -1);
                cells.forEach(cell => {
                    // Recurse for inline styles inside cells
                    const cellContent = parseMarkdownToHtml(cell.trim()); 
                    tableHtml += `<td style="border:1px solid #cbd5e1; padding:8px;">${cellContent}</td>`;
                });
                tableHtml += '</tr>';

            } else {
                if (inTable) {
                    inTable = false;
                    tableHtml += '</table>';
                    processedLines.push(tableHtml);
                    tableHtml = '';
                }
                processedLines.push(line);
            }
        }
        if (inTable) {
            tableHtml += '</table>';
            processedLines.push(tableHtml);
        }
        // Re-join non-table lines (but wait, we already parsed headers etc above. 
        // To avoid double parsing, we should have done table first. 
        // For simplicity in this "Hybrid" function, we assume if it detects table structure it returns that.
        if (processedLines.length > 0 && processedLines.some(l => l.startsWith('<table'))) {
            html = processedLines.join('\n');
        }
    }

    // Lists ( - item)
    // Simple regex for bullet lists
    html = html.replace(/^\s*-\s+(.*)/gim, '<li>$1</li>');
    // Wrap li in ul (basic heuristic)
    if (html.includes('<li>') && !html.includes('<ul>')) {
        // This is a bit aggressive, but works for block-by-block rendering
        html = `<ul>${html}</ul>`.replace(/<\/ul>\s*<ul>/g, ''); 
        // Remove non-list text wrapping if mixed? No, assuming block is primarily a list.
    }

    // Newlines to breaks (only if not already HTML blocks)
    if (!html.includes('<p>') && !html.includes('<div>') && !html.includes('<ul>') && !html.includes('<h1>') && !html.includes('<table>')) {
        html = html.replace(/\n/g, '<br/>');
    }

    return html;
};

export const renderBlock = (block: any): string => {
    // 1. Get content string
    let rawContent = "";
    
    // Handle new schema: block.content is a string
    if (typeof block.content === 'string') {
        rawContent = block.content;
    } 
    // Handle array format if AI outputs that (legacy support or mixed)
    else if (Array.isArray(block.content)) {
        rawContent = block.content.map((c: any) => c.markdown || c.text || "").join("");
    }

    // 2. Parse Content (Markdown + Inline HTML)
    let renderedHtml = parseMarkdownToHtml(rawContent);

    // 3. Wrap in Block Container based on type
    // Note: AI might put <div style="..."> inside the content string directly.
    // If the AI uses a specific 'type', we provide the semantic tag wrapper.
    
    // Extra styling passed via JSON "style" object (legacy/hybrid support)
    let containerStyle = "";
    if (block.style) {
         // Use simple conversion for top-level block styles if they exist
         containerStyle = Object.entries(block.style).map(([k,v]) => `${k.replace(/[A-Z]/g, m=>'-'+m.toLowerCase())}:${v}`).join(';');
    }

    switch (block.type) {
        case 'heading':
            // If markdown parser didn't catch it (e.g. content didn't start with #), force header tag
            if (!renderedHtml.startsWith('<h')) {
                const level = block.level || 1;
                return `<h${level} style="${containerStyle}">${renderedHtml}</h${level}>`;
            }
            return renderedHtml; // Already H tag
        
        case 'paragraph':
            // If it's just text, wrap in P. If it's a div/table, leave it.
            if (renderedHtml.startsWith('<div') || renderedHtml.startsWith('<table') || renderedHtml.startsWith('<ul')) {
                return renderedHtml;
            }
            return `<p style="${containerStyle}">${renderedHtml}</p>`;

        case 'code':
             return `<pre style="background:#1e293b; color:#e2e8f0; padding:1rem; border-radius:6px; font-family:monospace; overflow-x:auto;">${block.content}</pre>`;

        case 'table':
            // If content is markdown table, it was parsed. 
            // If content is empty but has "rows" array (Legacy), handle it.
            if (!rawContent && block.rows) {
                // Legacy renderer fallback
                let rows = block.rows.map((r: any) => `<tr>${r.cells.map((c: any) => `<td style="border:1px solid #ddd; padding:8px">${parseMarkdownToHtml(c.content || "")}</td>`).join('')}</tr>`).join('');
                return `<table style="width:100%; border-collapse:collapse; ${containerStyle}">${rows}</table>`;
            }
            return renderedHtml;

        case 'page_break':
        case 'pageBreak':
            return `<div class="prodoc-page-break" style="page-break-after: always; height: 0; width: 100%; display: block;"></div>`;

        default:
            return `<div style="${containerStyle}">${renderedHtml}</div>`;
    }
};

export const jsonToHtml = (jsonData: any): string => {
  if (!jsonData) return '';
  
  // Handle if AI returns just a string (raw HTML/Markdown)
  if (typeof jsonData === 'string') return parseMarkdownToHtml(jsonData);

  let blocks: any[] = [];
  
  // Handle various root shapes
  if (jsonData.document && Array.isArray(jsonData.document.blocks)) {
      blocks = jsonData.document.blocks;
  } else if (jsonData.blocks && Array.isArray(jsonData.blocks)) {
      blocks = jsonData.blocks;
  } else if (Array.isArray(jsonData)) {
      blocks = jsonData;
  } else {
      // Single block or malformed
      blocks = [jsonData];
  }

  return blocks.map(renderBlock).join('');
};

/**
 * Utility to clean JSON strings from LLM output (e.g. markdown fences)
 */
export const cleanJsonString = (input: string): string => {
    let clean = input.trim();
    const match = clean.match(/```(?:json|json5)?\s*([\s\S]*?)\s*```/i);
    if (match) clean = match[1].trim();
    else {
        clean = clean.replace(/^```(?:json|json5)?/i, '').replace(/```$/, '');
    }
    
    const startObj = clean.indexOf('{');
    const startArr = clean.indexOf('[');
    let start = -1;
    if (startObj !== -1 && startArr !== -1) start = Math.min(startObj, startArr);
    else if (startObj !== -1) start = startObj;
    else if (startArr !== -1) start = startArr;
    
    if (start !== -1) {
        const isObj = clean[start] === '{';
        const endChar = isObj ? '}' : ']';
        const lastEnd = clean.lastIndexOf(endChar);
        if (lastEnd !== -1 && lastEnd > start) {
            clean = clean.substring(start, lastEnd + 1);
        }
    }
    return clean;
};

export const safeJsonParse = (input: string): any => {
    const clean = cleanJsonString(input);
    try {
        return JSON.parse(clean);
    } catch (e) {
        try {
            let fixed = clean.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
            fixed = fixed.replace(/,\s*([}\]])/g, '$1');
            fixed = fixed.replace(/([{,])\s*([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
            if (!fixed.includes('"') && fixed.includes("'")) {
                fixed = fixed.replace(/'/g, '"');
            }
            return JSON.parse(fixed);
        } catch (e2) {
            console.error("JSON Parse Error", e2);
            if (!clean.includes('{') && !clean.includes('[')) {
                 return { blocks: [{ type: 'paragraph', content: clean }] };
            }
            throw e;
        }
    }
};
