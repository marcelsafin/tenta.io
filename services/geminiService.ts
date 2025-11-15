import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const gradeOpenEndedAnswer = async (question: Question, userAnswer: string): Promise<{ score: number; feedback: string }> => {
  const gradingPrompt = `
    Du är en AI-assistent som ska rätta en provfråga i React. Var rättvis men noggrann. Ge poäng baserat på hur väl studentens svar matchar det korrekta konceptet. Ge också konstruktiv feedback.

    Fråga: "${question.questionText}"
    Maxpoäng: ${question.points}
    Rätt svar/koncept att leta efter: "${question.correctAnswer} - ${question.feedbackForWrongAnswer}"

    Studentens svar: "${userAnswer}"

    Rätta nu studentens svar. Ge poäng från 0 till ${question.points}. Ge feedback som förklarar vad som var bra och vad som kan förbättras. Svara ENDAST med ett JSON-objekt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: gradingPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
          },
          required: ['score', 'feedback']
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error grading answer:", error);
    throw new Error("Kunde inte rätta svaret. Försök igen.");
  }
};