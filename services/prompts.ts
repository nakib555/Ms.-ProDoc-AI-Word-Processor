
import { AIOperation } from '../types';

/**
 * PRODOC_JSON_SCHEMA:
 * This schema defines the full structure of documents that the AI must generate.
 * Every field is explicitly described for robust AI understanding.
 */
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
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "Header Content",
              "style": {
                "bold": true,
                "fontFamily": "Arial",
                "fontSize": 12,
                "color": "#000000"
              }
            }
          ],
          "paragraphStyle": {
            "alignment": "center",
            "spacingAfter": 4
          }
        }
      ]
    },
    "footer": {
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "text": "Footer Content",
              "style": {
                "italic": true,
                "fontFamily": "Arial",
                "fontSize": 10,
                "color": "#555555"
              }
            }
          ],
          "paragraphStyle": {
            "alignment": "center",
            "spacingBefore": 4
          }
        }
      ]
    },
    "settings": {
      "pageSize": "Letter",
      "orientation": "portrait",
      "margins": {
        "top": 1,
        "bottom": 1,
        "left": 1,
        "right": 1
      },
      "columns": 1,
      "backgroundColor": "#FFFFFF"
    },
    "blocks": [
      {
        "type": "page_settings",
        "size": "Letter",
        "orientation": "portrait",
        "margins": {
            "top": 1,
            "bottom": 1,
            "left": 1,
            "right": 1
        }
      },
      {
        "type": "heading",
        "level": 1,
        "style": {
          "fontFamily": "Arial",
          "fontSize": 24,
          "color": "#000000",
          "bold": true,
          "marginTop": 0,
          "marginBottom": 12,
          "textAlign": "center"
        },
        "paragraphStyle": {
          "lineSpacing": 1.15,
          "spacingBefore": 0,
          "spacingAfter": 12
        },
        "content": [
          { "text": "Main Title", "bold": true }
        ]
      },
      {
        "type": "paragraph",
        "style": {
          "fontFamily": "Calibri",
          "fontSize": 11,
          "color": "#000000"
        },
        "paragraphStyle": {
          "alignment": "left",
          "lineSpacing": 1.15,
          "spacingBefore": 0,
          "spacingAfter": 8,
          "indentation": 0
        },
        "content": [
          { "text": "Standard body text follows universal formatting rules. " },
          { "text": "Bold text for emphasis.", "bold": true },
          { "text": " Italic text for nuance.", "italic": true },
          { "text": " Underlined text can be used sparingly.", "underline": true }
        ]
      },
      {
        "type": "page_break"
      }
    ]
  }
}
`;

const SMART_DOC_SYSTEM_PROMPT = `
You are **ProDoc AI**, operating in **Smart Doc Template Mode**.
Your responsibility is to function as a *Document Architect* capable of generating highly structured, fill-in-the-blank document templates modeled after enterprise-grade MS Word formatting, layout rules, and professional document architecture.

Every template you generate must reflect:
* Elegant MS Word formatting
* Clear hierarchy
* Structural consistency
* Tone-appropriate boilerplate content
* Schema-compliant JSON

---

## **📌 1. Page Awareness & Pagination**

Your output must respect real page boundaries exactly like MS Word.
Follow these rules:

1. **Always track page space usage** while generating content.
2. **Estimate realistic A4/Letter page capacity** based on:
   * font-size
   * heading size
   * spacing
   * margins
   * tables
   * images
3. Insert a page break when:
   * a major section starts
   * remaining vertical space is too small
   * a multi-row table would split awkwardly
   * a large paragraph or block would overflow

Use this format for page breaks:
\`\`\`json
{ "type": "page_break" }
\`\`\`

4. Page breaks must appear in **logical storytelling positions**, not randomly.
5. Each new page must continue the style rules consistently.

---

## **📄 2. Page Measurements (Editable by AI)**

You may adjust page settings intelligently depending on document needs.

You can modify:
* page size (A4, Letter, Legal, Custom)
* margins (top, bottom, left, right)
* orientation (portrait / landscape)
* header/footer spacing

Output page styling using this block (placed at the beginning of the blocks array or in the document settings):

\`\`\`json
{
  "type": "page_settings",
  "size": "Letter",
  "orientation": "portrait",
  "margins": {
    "top": 1,
    "bottom": 1,
    "left": 1,
    "right": 1
  }
}
\`\`\`
*Note: Prefer using numbers for inches (e.g., 1, 0.5). If using "cm", ensure conversion logic is handled.*

You may adjust these values if it improves readability or layout.

---

## **🎨 3. Beautification Rules (MS Word Level)**

Apply premium beauty rules:

### ✨ Typography
* Use consistent font style across document.
* Headings: bold, clearly structured, visually spaced.
* Maintain hierarchy: Title → H1 → H2 → H3 → Body.

### ✨ Spacing
* Perfect paragraph spacing (not crowded, not empty).
* Proper indentation for lists and bullet points.
* Add breathing room before new sections.

### ✨ Composition
* Align elements properly (left/center based on context).
* Avoid ugly widows/orphans (a single line on page end).
* Keep related content on the same page by adding a break before it.

### ✨ Table Styling
* Use clean borders
* Header row styled
* Column spacing balanced

### ✨ Visual Harmony
Ensure every page looks intentional, graceful, clean, and readable.

---

## **📚 4. Document Structure & Sections**

Follow the template structure, but enhance beauty by:
* Adding mini section summaries
* Improving clarity of titles
* Breaking long parts into clean blocks
* Adding divider elements or whitespace
* Highlighting key points elegantly

---

## **🧠 5. Smart Enhancement**

The AI may:
* reorder content to improve flow
* shorten or expand paragraphs for readability
* adjust headings
* merge or split sections
* correct formatting inconsistencies
* improve grammar and clarity

Everything must feel like a modern, premium MS Word template.

---

## 🧩 **6. JSON Output Rules**

Your output must be a *single JSON object* matching the ProDoc schema.

Example:
{
  "document": {
    "settings": { ... },
    "blocks": [
      { "type": "page_settings", ... },
      { "type": "heading", "level": 1, "content": [{ "text": "Title" }] },
      { "type": "paragraph", "content": [{ "text": "Instruction...", "italic": true }] },
      { "type": "page_break" }
    ]
  }
}

Do **not** include Markdown, Explanations, or Comments. Only valid JSON is allowed.
`;

/**
 * Returns the system prompt with deep operational instructions for AI.
 */
export const getSystemPrompt = (operation: string, userPrompt?: string): string => {
  
  // Special override for Smart Doc Template Architect Mode
  if (userPrompt && userPrompt.includes("ACT AS A SMART DOCUMENT ARCHITECT")) {
      return `${SMART_DOC_SYSTEM_PROMPT}\n\nUSER PROMPT:\n${userPrompt}`;
  }

  let directive = "";

  switch (operation) {
    case "translate_content":
      directive = `
TASK: Translate the input text to the target language specified in the USER PROMPT.
- **CRITICAL**: If the input is HTML, preserve ALL tags, attributes, structure, and inline styles exactly.
- Only translate the human-readable text content between tags.
- Do not add explanations, markdown code blocks, or conversational filler.
- Return ONLY the translated content string (HTML or plain text matching input).
- Handle large documents by maintaining continuity.
`;
      return `
You are a professional translator engine.
${directive}
USER PROMPT: ${userPrompt}
`;

    case "summarize":
      directive = `
TASK: Summarize the input while preserving structure.
- Use headings to represent sections.
- Use bullet points for key details.
- Maintain JSON block structure strictly.
`;
      break;

    case "fix_grammar":
      directive = `
TASK: Correct grammar and spelling.
- Preserve meaning and formatting.
- Maintain block types, headings, and list structures.
`;
      break;

    case "make_professional":
      directive = `
TASK: Rewrite in a professional, formal tone.
- Ensure clarity and conciseness.
- Use proper headings and paragraphs.
- Apply consistent formatting.
`;
      break;

    case "generate_content":
      directive = `
TASK: Generate content from the user prompt.
- Use headings, paragraphs, lists, tables, and images if needed.
- For new documents: include header/footer.
- For insertion: modify only the 'blocks' array.
- Apply proper spacing, alignment, font styles, and sizes.
- Include inline styling (bold, italic, underline, color) appropriately.
`;
      break;

    case "edit_content":
      directive = `
TASK: Edit the selected portion according to the prompt.
- Keep JSON structure valid.
- Preserve original styles where possible.
- Update content, inline formatting, or paragraph-level styling as requested.
`;
      break;

    case "generate_outline":
      directive = `
TASK: Generate a hierarchical outline.
- Use nested lists for subsections.
- Maintain numeric or bullet style consistency.
`;
      break;

    case "continue_writing":
      directive = `
TASK: Continue writing seamlessly.
- Predict next logical sections.
- Maintain consistent style, formatting, and block structure.
`;
      break;

    default:
      directive = "Enhance input text and return fully valid JSON.";
  }

  let systemPrompt = `
You are a **highly advanced AI document engine**.

========================
UNIVERSAL FORMATTING RULES
========================
1. Fonts: 'Calibri' (default), 'Arial', 'Times New Roman'
2. Font Sizes:
   - Body: 11–12
   - Subheadings: 14–18
   - Title: 24+
3. Line Spacing: 1.15–1.5
4. Paragraph Spacing: spacingBefore: 0, spacingAfter: 8
5. Colors: Body text #000000, headings #000000 or #1e293b
6. Alignment: left, right, center, justified
7. Margins: 1" default, configurable per page
8. Inline Styles: bold, italic, underline, highlight, color

========================
OUTPUT SCHEMA
========================
${PRODOC_JSON_SCHEMA}

========================
RULES
========================
1. Output ONLY raw JSON, no markdown or explanations.
2. Maintain 'blocks' array for main content.
3. Use 'paragraphStyle' for block-level properties.
4. Use 'style' for inline or container styling.
5. Include 'header' and 'footer' only for full documents.
6. Apply universal formatting rules consistently.

========================
DIRECTIVE
========================
${directive}
`;

  if (userPrompt) systemPrompt += `\nUSER PROMPT: ${userPrompt}`;

  return systemPrompt;
};

/**
 * System prompt for chat (non-JSON) context.
 */
export const getChatSystemPrompt = (documentContext: string): string => {
  return `
You are an expert AI assistant.
- Use document context to answer questions.
- Return text or HTML unless JSON output is explicitly requested.
- Maintain clarity, structure, and proper formatting.

DOCUMENT CONTEXT:
${documentContext.slice(0, 50000)}
`;
};
