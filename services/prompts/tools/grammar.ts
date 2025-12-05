
import { PRODOC_JSON_SCHEMA } from '../schemas';

export const getGrammarSystemPrompt = (settings: { tone: string, checkGrammar: boolean, checkStyle: boolean, checkPunctuation: boolean, fixPassive: boolean, language: string }) => {
  return `You are an expert editor.
    Analyze input. Return JSON:
    {
      "correctedText": "HTML/Markdown string of corrected text",
      "readabilityScore": 0-100,
      "readabilityLevel": "String",
      "passiveVoiceCount": 0,
      "improvements": ["String"]
    }
    
    Keep formatting (bold, italic, HTML tags) intact unless correcting them.
    `;
};

export const getBasicGrammarPrompt = () => {
  return `
      TASK: Correct grammar. Return valid JSON block structure.
      ### OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
  `;
};
