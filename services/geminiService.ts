
import { GoogleGenAI } from "@google/genai";
import { RagDocument } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // Here, we'll rely on the environment providing it.
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const generateAnswer = async (query: string, contextDocuments: RagDocument[]): Promise<string> => {
  if (contextDocuments.length === 0) {
    return "I couldn't find any relevant information to answer your question. Please try rephrasing or asking about a different topic.";
  }

  const contextString = contextDocuments
    .map((doc, i) => `CONTEXT ${i + 1}:\n${doc.context}`)
    .join('\n\n---\n\n');

  const prompt = `
    You are an expert Question Answering system that follows the Retrieval-Augmented Generation (RAG) pattern.
    Your task is to answer the user's 'QUESTION' based ONLY on the provided 'CONTEXT'.
    Do not use any external knowledge or information you were trained on.
    If the context does not contain the answer, you MUST state that you cannot answer based on the information provided.
    Be concise, accurate, and faithful to the source material.

    ---
    ${contextString}
    ---
    
    QUESTION:
    ${query}
    
    ---
    ANSWER:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while trying to generate an answer. Please try again.";
  }
};

export const geminiService = {
  generateAnswer,
};
