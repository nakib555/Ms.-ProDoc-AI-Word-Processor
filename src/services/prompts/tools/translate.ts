
import { PRODOC_JSON_SCHEMA } from '../schemas';

export const getTranslatePrompt = (context: string) => {
    return `
      You are a professional translator engine.
      TASK: Translate the input text to the target language specified.
      CRITICAL: Preserve ALL HTML tags, attributes, and structure. Only translate the text content inside tags.
      INPUT CONTEXT: ${context}
      
      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
    `;
};
