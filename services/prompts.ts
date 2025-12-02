
import { AIOperation } from '../types';

const PRODOC_JSON_SCHEMA = `
{
  "document": {
    "title": "Document Title",
    "metadata": {
      "author": "AI Assistant",
      "created": "ISO Date",
      "version": "1.0",
      "language": "en-US"
    },
    "header": {
        "content": [ { "type": "paragraph", "content": [{ "text": "Header Content" }] } ]
    },
    "footer": {
        "content": [ { "type": "paragraph", "content": [{ "text": "Footer Content" }] } ]
    },
    "settings": {
      "pageSize": "Letter",
      "orientation": "portrait",
      "margins": { "top": 1, "bottom": 1, "left": 1, "right": 1 }
    },
    "blocks": [
      {
        "type": "heading",
        "level": 1,
        "style": { "textAlign": "center", "color": "#1e3a8a", "fontFamily": "Inter", "fontSize": 28, "bold": true, "marginBottom": "24px", "borderBottom": "2px solid #3b82f6", "paddingBottom": "10px" },
        "paragraphStyle": { "spacingAfter": 24 },
        "content": [ { "text": "Heading Text ", "bold": true }, { "text": "Colored Part", "color": "#2563eb" } ]
      },
      {
        "type": "paragraph",
        "style": { "fontSize": 12, "fontFamily": "Calibri" },
        "paragraphStyle": { 
            "alignment": "justify", 
            "lineSpacing": 1.6,
            "spacingBefore": 12,
            "spacingAfter": 12,
            "indent": { "firstLine": "0.5in" }
        },
        "content": [ { "text": "Regular text. " }, { "text": "Bold text.", "bold": true }, { "text": "Link", "link": "#", "color": "blue" } ]
      },
      {
        "type": "list",
        "listType": "unordered",
        "markerStyle": "disc",
        "items": [
            { "content": [ { "text": "List Item 1" } ] },
            { "content": [ { "text": "List Item 2" } ], "subItems": [ { "content": [{"text": "Sub Item"}] } ] }
        ]
      },
      {
        "type": "table",
        "config": { "columns": 2, "columnWidths": ["30%", "70%"], "hasHeaderRow": true, "bandedRows": true, "borderColor": "#cbd5e1" },
        "style": { "width": "100%", "borderCollapse": "collapse" },
        "rows": [
           { "cells": [ { "content": [{"text": "Header 1", "bold": true}], "style": { "backgroundColor": "#f1f5f9" } }, { "content": [{"text": "Header 2", "bold": true}], "style": { "backgroundColor": "#f1f5f9" } } ] },
           { "cells": [ { "content": [{"text": "Cell 1"}] }, { "content": [{"text": "Cell 2"}], "colSpan": 1 } ] }
        ]
      },
      {
        "type": "code",
        "language": "typescript",
        "content": "console.log('Hello World');",
        "style": { "backgroundColor": "#1e293b", "color": "#e2e8f0", "padding": "15px", "borderRadius": "8px", "fontFamily": "monospace" }
      },
      {
        "type": "equation",
        "latex": "E = mc^2",
        "style": { "displayMode": "block", "fontSize": "1.2em", "color": "#334155", "textAlign": "center" }
      },
      { 
        "type": "sectionBreak",
        "config": { "type": "nextPage", "orientation": "landscape" }
      },
      { "type": "pageBreak" },
      { "type": "image", "src": "url", "alt": "Description", "style": { "width": "100%", "height": "auto" } }
    ]
  }
}
`;

export const getSystemPrompt = (operation: AIOperation, userPrompt?: string): string => {
  let specificDirective = "";

  switch (operation) {
    case 'summarize':
      specificDirective = `TASK: Summarize the input. Return a structured document with a Heading and Bullet Points.`;
      break;
    case 'fix_grammar':
      specificDirective = `TASK: Fix grammar/spelling. Return the corrected text preserving original structure as much as possible.`;
      break;
    case 'make_professional':
      specificDirective = `TASK: Rewrite text to be professional. Use formal language and clear structure.`;
      break;
    case 'generate_content':
      specificDirective = `TASK: Generate high-quality content based on the USER PROMPT.
      
      CONTEXT USAGE:
      - Use INPUT CONTEXT (if any) to match tone/style.
      - Create rich content using Headings, Paragraphs, Lists, and Tables where appropriate.
      - Use "paragraphStyle" for indentation, spacing, and alignment.
      - For technical topics, use Code blocks.
      - For math/science, use Equation blocks.
      
      MODE HANDLING:
      - If asked to REPLACE or create a NEW DOC, you may include "header" and "footer" content in the JSON root.
      - If INSERTING, focus on the "blocks" array.`;
      break;
    case 'edit_content':
      specificDirective = `TASK: Edit the INPUT CONTEXT (Selection) based on the USER PROMPT.
      
      GOAL: Modify the selected text while maintaining valid JSON block structure.`;
      break;
    case 'generate_outline':
      specificDirective = `TASK: Generate a detailed outline using nested Lists.`;
      break;
    case 'continue_writing':
      specificDirective = `TASK: Continue writing seamlessly. Predict the next logical section.`;
      break;
    default:
      specificDirective = "Enhance the text and return it as structured JSON.";
  }

  let finalSystemInstruction = `
  You are an elite AI document engine.
  
  **OUTPUT SCHEMA (STRICT JSON):**
  ${PRODOC_JSON_SCHEMA}
  
  **RULES:**
  1. Output **ONLY** raw valid JSON. No markdown fences. Start with {.
  2. Use "content" arrays for text with inline styling (bold, italic, color, highlight).
  3. Use specific block types (heading, paragraph, list, table, code, equation, image, pageBreak, sectionBreak).
  4. Ensure all keys are double-quoted.
  5. **Header/Footer**: Only populate "header" and "footer" fields if creating a full document or explicitly asked.
  6. Use 'paragraphStyle' object for block-level styling (indentation, spacingBefore/After, padding, borders). Use 'style' object for inline text styling or generic container styles.
  
  **DIRECTIVE:**
  ${specificDirective}
  `;

  if (userPrompt) {
    finalSystemInstruction += `\n\n**USER PROMPT / CONTEXT:** ${userPrompt}`;
  }

  return finalSystemInstruction;
};

export const getChatSystemPrompt = (documentContext: string): string => {
    return `
    You are a helpful Copilot. 
    Use the provided document context to answer questions.
    If asked to write content, output it as simple text or HTML, do not use the JSON schema for chat unless explicitly requested.
    
    CONTEXT:
    ${documentContext.slice(0, 50000)}
    `;
};
