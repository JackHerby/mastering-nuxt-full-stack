import { generateText } from 'ai';
import { createOllama } from 'ollama-ai-provider';
import type { Message, LanguageModelV1 } from 'ai';

export const createOllamaModel = () => {
  return createOllama()('qwen3.6');
};

export const generateChatRespone: (
  model: LanguageModelV1, messages: Message[],
) => Promise<string> = async (model, messages) => {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Invalid messages format');
  }
  const respone = await generateText({ model, messages });
  return respone.text.trim();
};
