
/**
 * PRODOC_JSON_SCHEMA:
 * Defines the strict structure for AI Document Generation.
 * Mimics the DOM/Node structure of a rich text editor.
 */
export const PRODOC_JSON_SCHEMA = `
{
  "document": {
    "title": "Document Title",
    "metadata": { "author": "AI", "created": "ISO Date" },
    "settings": {
      "pageSize": "Letter",
      "orientation": "portrait",
      "margins": { "top": 1, "bottom": 1, "left": 1, "right": 1 }
    },
    "header": {
      "content": [ { "type": "paragraph", "content": "Header Text" } ]
    },
    "footer": {
      "content": [ { "type": "paragraph", "content": "Page [PAGE_NUMBER]" } ]
    },
    "blocks": [
      {
        "type": "heading", // or "paragraph", "list", "table", "page_break", "section_break"
        "level": 1, // 1-6 for headings
        "style": {
          "fontFamily": "Calibri",
          "fontSize": 24,
          "bold": true,
          "color": "#1e293b",
          "textAlign": "left"
        },
        "paragraphStyle": {
          "spacingBefore": 24,
          "spacingAfter": 12,
          "lineSpacing": 1.15
        },
        "content": [
           { "text": "Plain text " },
           { "text": "Bold text", "bold": true, "color": "#2563eb" }
        ]
      }
    ]
  }
}
`;

/**
 * MASTER STYLE GUIDE:
 * Enforces MS Word-quality formatting standards.
 */
export const MASTER_STYLE_GUIDE = `
### 🎨 MASTER STYLE GUIDE (MS WORD STANDARD)

**1. Typography Hierarchy**
*   **Title (H1)**: Font: "Calibri", Size: 26pt, Bold, Color: #1e293b (Slate 800). Spacing: Before 0, After 24px.
*   **Heading 1 (H2)**: Font: "Calibri", Size: 20pt, Bold, Color: #334155 (Slate 700). BorderBottom: "1px solid #e2e8f0". Spacing: Before 24px, After 12px.
*   **Heading 2 (H3)**: Font: "Calibri", Size: 16pt, Bold, Color: #475569 (Slate 600). Spacing: Before 18px, After 8px.
*   **Body Text**: Font: "Calibri" or "Inter", Size: 11pt or 12pt, Color: #0f172a (Black). LineHeight: 1.5. Spacing: After 12px.

**2. Visual Elements**
*   **Tables**: 
    *   Must use \`width: "100%"\`, \`borderCollapse: "collapse"\`.
    *   **Header Row**: Background: "#f1f5f9", Bold Text.
    *   **Cells**: Padding: "8px", Border: "1px solid #cbd5e1".
*   **Lists**: Use bullet/numbered lists for items > 3. Never use comma-separated text for lists.

**3. Pagination & Flow**
*   **Page Breaks**: Insert \`{ "type": "page_break" }\` explicitly to separate major sections (e.g., Title Page vs TOC vs Content).
*   **Section Breaks**: Use \`{ "type": "sectionBreak", "config": { "orientation": "landscape" } }\` for wide tables.
`;
