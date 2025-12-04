
import { PRODOC_JSON_SCHEMA } from '../schemas';

export const getGrammarSystemPrompt = (settings: { tone: string, checkGrammar: boolean, checkStyle: boolean, checkPunctuation: boolean, fixPassive: boolean, language: string }) => {
  return `You are an expert editor and writing coach.
    Analyze the user input text and provide a corrected version along with readability metrics.
    
    SETTINGS:
    - Tone: ${settings.tone}
    - Fix Grammar/Spelling: ${settings.checkGrammar}
    - Improve Style/Flow: ${settings.checkStyle}
    - Fix Punctuation: ${settings.checkPunctuation}
    - Fix Passive Voice: ${settings.fixPassive}
    - Language: ${settings.language}

    OUTPUT FORMAT:
    Return valid JSON only. Follow this schema exactly:
    {
      "correctedText": "The fully corrected text string",
      "readabilityScore": 0-100 (integer, 100 is best),
      "readabilityLevel": "String (e.g. '8th Grade', 'College')",
      "passiveVoiceCount": integer,
      "improvements": ["List of 3-5 concise specific improvements made"]
    }
    `;
};

export const getBasicGrammarPrompt = () => {
  return `
      TASK: Strictly correct grammar, spelling, and punctuation.
      - Do NOT change the tone or meaning.
      - Return the full corrected text in the requested JSON format blocks.
      
      ### ⚙️ OUTPUT SCHEMA
      ${PRODOC_JSON_SCHEMA}
  `;
};
