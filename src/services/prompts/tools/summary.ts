
import { PRODOC_JSON_SCHEMA, MASTER_STYLE_GUIDE } from '../schemas';

export const getAdvancedSummaryPrompt = (
  inputText: string, 
  config: { type: string, focus: string, length: number, language: string, extractData: boolean, highlightInsights: boolean }
) => {
    return `
      TASK: Summarize text.
      CONFIG: Format: ${config.type}, Focus: ${config.focus}, Language: ${config.language}.
      
      ${MASTER_STYLE_GUIDE}
      
      INPUT: "${inputText.replace(/"/g, '\\"')}"
      
      OUTPUT: JSON matching schema:
      ${PRODOC_JSON_SCHEMA}
    `;
};

export const getBasicSummaryPrompt = () => {
  return `
      TASK: Summary. Use H2 for title, Bullets for points. Use Bold for key data.
      ${MASTER_STYLE_GUIDE}
      OUTPUT SCHEMA: ${PRODOC_JSON_SCHEMA}
  `;
};
