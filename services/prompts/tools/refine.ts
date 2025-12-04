
import { PRODOC_JSON_SCHEMA } from '../schemas';

export const getAdvancedExpandPrompt = (inputText: string, modeConfig: { label: string, desc: string } | undefined) => {
    return `
      TASK: Expand the following text using the "${modeConfig?.label || 'Detail Expansion'}" method.
      
      METHOD DESCRIPTION: ${modeConfig?.desc || 'Add descriptions, context, and depth.'}
      
      INSTRUCTIONS:
      1. Analyze the INPUT TEXT.
      2. Elaborate significantly based on the selected method.
      3. Maintain the original core meaning but add value.
      4. If "Step-by-Step" is selected, format as a list.
      5. If "Data" is selected, use plausible general statistics or placeholders if real data isn't known.
      
      INPUT TEXT:
      "${inputText}"
      
      OUTPUT FORMAT:
      Return a VALID JSON object matching the ProDoc schema (document.blocks array).
      Do not wrap in markdown code blocks.
      
      ${PRODOC_JSON_SCHEMA}
    `;
};

export const getAdvancedShortenPrompt = (inputText: string, instruction: string) => {
    return `
      TASK: Shorten and rewrite the input text based on these specific rules.
      
      RULES:
      ${instruction}
      
      INPUT TEXT:
      "${inputText}"
      
      OUTPUT FORMAT:
      Return a VALID JSON object matching the ProDoc schema (document.blocks array).
      Do not wrap in markdown code blocks.

      ${PRODOC_JSON_SCHEMA}
    `;
};

export const getSimplifyPrompt = () => {
  return `
      TASK: Simplify the text.
      - Make it easier to understand.
      - Reduce complexity and jargon.
      - Return valid JSON schema.
      
      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
  `;
};

export const getExpandPrompt = () => {
  return `
      TASK: Expand the text.
      - Add detail and context.
      - Elaborate on key points.
      - Return valid JSON schema.

      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
  `;
};

export const getShortenPrompt = () => {
  return `
      TASK: Shorten the text.
      - Make it concise.
      - Remove redundancy.
      - Return valid JSON schema.

      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
  `;
};
