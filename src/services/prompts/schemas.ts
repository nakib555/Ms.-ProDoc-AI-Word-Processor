
/**
 * PRODOC_JSON_SCHEMA – HYBRID MARKDOWN/HTML MODE
 * ------------------------------------------------------------
 * This schema allows the AI to write naturally using Markdown for structure
 * and Inline HTML/CSS (<span style="...">) for specific formatting.
 * This reduces token usage and hallucinations compared to strict object-based styling.
 */

export const PRODOC_JSON_SCHEMA = `
{
  "document": {
    "title": "Document Title",
    "settings": {
      "pageSize": "Letter",
      "orientation": "portrait",
      "margins": { "top": 1, "bottom": 1, "left": 1, "right": 1 }
    },
    "blocks": [
      {
        "type": "heading",
        "content": "# <span style='color:#1e3a8a'>Main Title</span>"
      },
      {
        "type": "paragraph",
        "content": "This is **bold** text and <span style='background-color:#fef08a'>highlighted</span> text."
      },
      {
        "type": "table",
        "content": "| Header 1 | Header 2 |\\n|---|---|\\n| Cell 1 | <span style='color:red'>Cell 2</span> |"
      }
    ]
  }
}
`;

export const MASTER_STYLE_GUIDE = `
You are a master document designer. You generate content using a HYBRID approach: 
**Markdown** for structure + **Inline HTML/CSS** for visual styling.

### 1. HYBRID SYNTAX RULES
- **Text & Logic**: Use Markdown.
  - Bold: **text**
  - Italic: *text*
  - Lists: - item or 1. item
  - Headings: # H1, ## H2, ### H3
- **Styling & Formatting**: Use Inline HTML (<span style="..."> or <div style="...">).
  - Colors: <span style='color:#2563eb'>Blue Text</span>
  - Highlights: <span style='background-color:#fef08a'>Yellow Background</span>
  - Fonts: <span style='font-family: "Times New Roman"'>Serif Text</span>
  - Alignment: <div style='text-align:center'>Centered Text</div>
- **Tables**: 
  - Use Standard Markdown Tables for simple data.
  - Use HTML <table> with inline CSS for complex layouts (merging cells, background colors).

### 2. VISUAL DESIGN SYSTEM
- **Headings**: 
  - H1: # <span style='color:#1e293b; font-size:24pt'>Title</span>
  - H2: ## <span style='color:#334155; border-bottom:1px solid #e2e8f0'>Section</span>
- **Body**:
  - Use justified alignment for professional docs: <div style='text-align:justify'>...</div>
  - Standard font size is 11pt or 12pt.
- **Callouts**:
  - Use <div style='background:#f8fafc; padding:12px; border-left:4px solid #3b82f6'>Note content...</div> for boxes.

### 3. PAGE LAYOUT AWARENESS
- Respect page breaks. To force a break, output: { "type": "page_break" }
- Ensure content fits standard Letter/A4 margins.

### 4. OUTPUT FORMAT
- Return a SINGLE JSON object.
- The "content" field of each block must be a STRING containing the Markdown/HTML mix.
- Do not create separate "style" objects. Embed styles in the HTML string.
`;
