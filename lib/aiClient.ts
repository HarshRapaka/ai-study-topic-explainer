import { GoogleGenAI } from "@google/genai";

/*
AI Client Configuration
Provider: Google Gemini API
Model used in project: gemini-2.0-flash
Purpose: Generate simplified explanations for study topics
*/

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});