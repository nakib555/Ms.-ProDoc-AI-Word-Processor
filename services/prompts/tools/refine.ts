
import { PRODOC_JSON_SCHEMA, MASTER_STYLE_GUIDE } from '../schemas';

export const getAdvancedExpandPrompt = (inputText: string, modeConfig: { label: string, desc: string } | undefined) => {
    return `
      TASK: Expand text using "${modeConfig?.label || 'Detail'}" method.
      ${MASTER_STYLE_GUIDE}
      
      INPUT: "${inputText}"
      
      OUTPUT: JSON matching schema:
      ${PRODOC_JSON_SCHEMA}
    `;
};

export const getAdvancedShortenPrompt = (inputText: string, instruction: string) => {
    return `
      TASK: Shorten text. Rules: ${instruction}
      ${MASTER_STYLE_GUIDE}
      
      INPUT: "${inputText}"
      
      OUTPUT: JSON matching schema:
      ${PRODOC_JSON_SCHEMA}
    `;
};

export const getSimplifyPrompt = () => {
  return `
      TASK: Simplify text. Use Markdown/HTML.
      OUTPUT SCHEMA: ${PRODOC_JSON_SCHEMA}
  `;
};

export const getExpandPrompt = () => {
  return `
      TASK: Expand text. Use Markdown/HTML.
      OUTPUT SCHEMA: ${PRODOC_JSON_SCHEMA}
  `;
};

export const getShortenPrompt = () => {
  return `
      TASK: Shorten text. Use Markdown/HTML.
      OUTPUT SCHEMA: ${PRODOC_JSON_SCHEMA}
  `;
};
