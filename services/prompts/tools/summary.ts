
import { PRODOC_JSON_SCHEMA, MASTER_STYLE_GUIDE } from '../schemas';

export const getAdvancedSummaryPrompt = (
  inputText: string, 
  config: { type: string, focus: string, length: number, language: string, extractData: boolean, highlightInsights: boolean }
) => {
    let lengthDesc = "medium length";
    if (config.length < 30) lengthDesc = "very short, concise";
    if (config.length > 70) lengthDesc = "comprehensive, detailed";

    return `
      TASK: Summarize the input text.
      
      CONFIGURATION:
      - Format: ${config.type}
      - Perspective/Focus: ${config.focus}
      - Length Target: ${lengthDesc} (approx ${config.length}% of original detail)
      - Output Language: ${config.language}
      
      SPECIAL INSTRUCTIONS:
      ${config.extractData ? '- EXTRACT DATA: Separately list key dates, numbers, names, and entities found in a list block.' : ''}
      ${config.highlightInsights ? '- KEY INSIGHTS: Identify the top 3 critical takeaways in a separate section.' : ''}
      
      INPUT TEXT:
      "${inputText.replace(/"/g, '\\"')}"
      
      OUTPUT FORMAT (STRICT):
      You MUST return ONLY a VALID JSON object matching the ProDoc schema.
      Do not add any text before or after the JSON.
      
      JSON Structure:
      {
        "document": {
          "blocks": [
            { "type": "heading", "level": 2, "content": "Summary Title" },
            { "type": "paragraph", "content": "Summary content here..." },
            { "type": "list", "listType": "unordered", "items": ["<b>Point 1:</b> Detail text", "<b>Point 2:</b> Detail text"] }
          ]
        }
      }

      CRITICAL RULES:
      1. Do NOT include any "style", "paragraphStyle", or "config" properties in the blocks. These cause rendering issues and overlapping text.
      2. Return plain semantic blocks only.
      3. You can use HTML tags like <b>, <i>, <u> inside content strings for formatting if needed.
    `;
};

export const getBasicSummaryPrompt = () => {
  return `
      TASK: Create a structured summary.
      - Use H2 for the summary title.
      - Use H3 for key themes.
      - Use Bullet Lists for details.
      - Highlight critical data points (dates, costs) in bold.

      ${MASTER_STYLE_GUIDE}
      
      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
  `;
};
