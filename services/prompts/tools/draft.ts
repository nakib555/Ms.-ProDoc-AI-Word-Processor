
import { PRODOC_JSON_SCHEMA, MASTER_STYLE_GUIDE } from '../schemas';

// MASTER MS WORD AI PROMPT
export const MASTER_MS_WORD_WITH_USER_INSTRUCTION = `
You are a world-class Document Designer.
Your task is to generate visually stunning content using a Hybrid Markdown + HTML approach.

${MASTER_STYLE_GUIDE}
`;

export const getSmartDocPrompt = (request: string, flow: string, tone: string) => {
    return `
      ACT AS A MASTER DOCUMENT ARCHITECT.
      TEMPLATE: "${request}"
      FLOW: "${flow}"
      TONE: "${tone}"
      
      INSTRUCTIONS:
      1. Generate a "fill-in-the-blank" template.
      2. Use **Markdown** for structure (# Headers, - Lists).
      3. Use **Inline HTML** (<span style='...'>) for colors, fonts, and highlights.
      4. Create a TABLE using Markdown syntax or HTML <table> if complex.
      5. Include placeholders like [Client Name] highlighted in yellow (<span style='background:#fef08a'>[Client Name]</span>).

      OUTPUT: Return valid JSON matching this schema:
      ${PRODOC_JSON_SCHEMA}
    `;
};

export const getAutoDetectTemplatePrompt = () => {
    return `
        ACT AS A SMART DOCUMENT ARCHITECT.
        TASK: Analyze context and generate a template.
        STYLE: Professional, using Hybrid Markdown + HTML.
        
        OUTPUT: JSON Schema:
        ${PRODOC_JSON_SCHEMA}
      `;
};

export const getGenerateContentPrompt = (userInstruction: string) => {
  return `
      ${MASTER_MS_WORD_WITH_USER_INSTRUCTION}
      USER INSTRUCTION: "${userInstruction}"
      
      TASK: Generate content. Use Markdown for structure and HTML <span style> for visual flair.
      
      OUTPUT SCHEMA:
      ${PRODOC_JSON_SCHEMA}
  `;
};

export const getEditContentPrompt = (instruction: string) => {
  return `
      ${MASTER_MS_WORD_WITH_USER_INSTRUCTION}
      EDIT INSTRUCTION: "${instruction}"

      TASK: Rewrite the input text. Maintain the Hybrid Markdown/HTML format.
      
      OUTPUT SCHEMA:
      ${PRODOC_JSON_SCHEMA}
  `;
};

export const getTemplateListPrompt = (context: string) => {
    return `
      TASK: Generate template ideas.
      INPUT: "${context}"
      OUTPUT: JSON Array of objects [{"l": "Title", "f": "Step -> Step"}]
      Return ONLY JSON.
    `;
};

export const getGenerateOutlinePrompt = () => {
  return `
      TASK: Generate a hierarchical outline using Markdown Lists and Headings.
      OUTPUT SCHEMA:
      ${PRODOC_JSON_SCHEMA}
  `;
};

export const getContinueWritingPrompt = () => {
  return `
      TASK: Continue writing. Match the existing Hybrid Markdown/HTML style.
      OUTPUT SCHEMA:
      ${PRODOC_JSON_SCHEMA}
  `;
};
