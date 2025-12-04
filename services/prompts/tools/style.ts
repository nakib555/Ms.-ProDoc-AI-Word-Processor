
import { PRODOC_JSON_SCHEMA, MASTER_STYLE_GUIDE } from '../schemas';

export const getMakeProfessionalPrompt = () => {
  return `
      TASK: Rewrite the text to be Executive-Level Professional.
      - Use authoritative, concise, and clear language.
      - Avoid passive voice.
      - Use strong verbs.
      - Format with H2/H3 headings if the text is long.
      
      ${MASTER_STYLE_GUIDE}

      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
  `;
};

export const getTonePrompt = (tone: string) => {
    return `
      TASK: Rewrite the text with a ${tone} tone.
      - Adjust vocabulary and sentence structure to match the requested persona.
      
      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
    `;
};
