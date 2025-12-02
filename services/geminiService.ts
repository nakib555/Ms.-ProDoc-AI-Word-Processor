
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AIOperation } from '../types';
import { getSystemPrompt, getChatSystemPrompt } from './prompts';

const getClient = () => {
  // Check localStorage first for user-provided key
  const localKey = localStorage.getItem('gemini_api_key');
  if (localKey) {
    return new GoogleGenAI({ apiKey: localKey });
  }
  
  // Always create a new client to ensure we use the latest API Key from the environment if available
  if (process.env.API_KEY) {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return null;
};

const formatGeminiError = (error: any): string => {
  const msg = error.message || error.toString();
  const lowerMsg = msg.toLowerCase();
  
  if (lowerMsg.includes('429') || lowerMsg.includes('quota') || lowerMsg.includes('exhausted')) {
    return "⚠️ Quota exceeded. The AI usage limit has been reached. Please check your billing or try again later.";
  }
  if (lowerMsg.includes('503') || lowerMsg.includes('overloaded') || lowerMsg.includes('capacity')) {
    return "⚠️ The AI model is currently overloaded. Please try again in a few moments.";
  }
  if (lowerMsg.includes('key') || lowerMsg.includes('auth')) {
    return "⚠️ Invalid or missing API Key. Please check your settings.";
  }
  return `⚠️ AI Error: ${msg}`;
};

export const generateAIContent = async (
  operation: AIOperation,
  text: string,
  userPrompt?: string,
  model: string = "gemini-3-pro-preview"
): Promise<string> => {
  // Prioritize user selected model from settings if available, fallback to passed model or default
  const storedModel = localStorage.getItem('gemini_model');
  const effectiveModel = storedModel || model;

  console.log(`[Gemini Service] generateAIContent called. Operation: ${operation}, Model: ${effectiveModel}`);
  const client = getClient();
  if (!client) {
    console.warn("[Gemini Service] Client not initialized (Missing API Key)");
    return JSON.stringify({ error: "API Key not configured. Please use the API Key tool in the AI Assistant tab." });
  }

  const systemPrompt = getSystemPrompt(operation, userPrompt);
  console.log(`[Gemini Service] System Prompt length: ${systemPrompt.length}, User Context length: ${text.length}`);

  try {
    console.log("[Gemini Service] Sending request...");
    const response = await client.models.generateContent({
      model: effectiveModel,
      contents: [
        { role: "user", parts: [{ text: `SYSTEM DIRECTIVE: ${systemPrompt}\n\nINPUT CONTEXT:\n${text}` }] }
      ],
      config: {
        responseMimeType: "application/json", 
      }
    });
    
    // Safety check for empty responses
    if (!response.text) {
        console.error("[Gemini Service] Received empty response text from model.");
        throw new Error("Empty response from AI model.");
    }

    console.log(`[Gemini Service] Response received. Length: ${response.text.length}`);
    return response.text;
  } catch (error: any) {
    console.error("[Gemini Service] generateAIContent Error:", error);
    return JSON.stringify({ error: formatGeminiError(error) });
  }
};

export const streamAIContent = async function* (
  operation: AIOperation,
  text: string,
  userPrompt?: string,
  model: string = "gemini-3-pro-preview"
): AsyncGenerator<string, void, unknown> {
  // Prioritize user selected model
  const storedModel = localStorage.getItem('gemini_model');
  const effectiveModel = storedModel || model;

  console.log(`[Gemini Service] streamAIContent called. Operation: ${operation}, Model: ${effectiveModel}`);
  const client = getClient();
  if (!client) throw new Error("API Key not configured.");

  const systemPrompt = getSystemPrompt(operation, userPrompt);

  try {
    console.log("[Gemini Service] Starting stream request...");
    const responseStream = await client.models.generateContentStream({
      model: effectiveModel,
      contents: [
        { role: "user", parts: [{ text: `SYSTEM DIRECTIVE: ${systemPrompt}\n\nINPUT CONTEXT:\n${text}` }] }
      ],
    });

    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        console.debug(`[Gemini Service] Stream chunk received: ${c.text.length} chars`);
        yield c.text;
      }
    }
    console.log("[Gemini Service] Stream complete.");
  } catch (error) {
    console.error("[Gemini Service] streamAIContent Error:", error);
    throw new Error(formatGeminiError(error));
  }
};

export const chatWithDocumentStream = async function* (
  history: { role: 'user' | 'model', text: string }[],
  lastMessage: string,
  documentContent: string,
  model: string = "gemini-3-pro-preview"
): AsyncGenerator<string, void, unknown> {
  // Prioritize user selected model
  const storedModel = localStorage.getItem('gemini_model');
  const effectiveModel = storedModel || model;

  console.log(`[Gemini Service] chatWithDocumentStream called. History length: ${history.length}, Model: ${effectiveModel}`);
  const client = getClient();
  if (!client) throw new Error("API Key not configured.");

  const systemInstruction = getChatSystemPrompt(documentContent);

  const historyContent = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  try {
    const chat = client.chats.create({
      model: effectiveModel,
      config: { systemInstruction },
      history: historyContent
    });

    console.log("[Gemini Service] Sending chat message stream...");
    const responseStream = await chat.sendMessageStream({ message: lastMessage });

    for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
            yield c.text;
        }
    }
    console.log("[Gemini Service] Chat stream complete.");
  } catch (error) {
    console.error("[Gemini Service] chatWithDocumentStream Error:", error);
    throw new Error(formatGeminiError(error));
  }
};

export const generateAIImage = async (prompt: string): Promise<string | null> => {
  console.log(`[Gemini Service] generateAIImage called. Prompt: "${prompt}"`);
  const client = getClient();
  if (!client) {
    throw new Error("API Key not configured.");
  }

  try {
    console.log("[Gemini Service] Requesting image generation...");
    // Image generation uses specific model, do not use text model override
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          console.log("[Gemini Service] Image generation successful.");
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    console.warn("[Gemini Service] No image data found in response candidates.");
    return null;
  } catch (error: any) {
    console.error("[Gemini Service] generateAIImage Error:", error);
    throw new Error(formatGeminiError(error));
  }
};
