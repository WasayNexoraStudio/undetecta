import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: "Missing text" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: `Analyze the following text and estimate how likely it is to be AI-generated. Return a JSON object with two fields: "percentage" (a number between 0 and 100) and "explanation" (a brief one-line explanation of your reasoning).
        
Text:
${text}`,
      generation_config: {
        thinking_level: "low"
      },
      response_format: {
        type: Type.OBJECT,
        properties: {
          percentage: { type: Type.INTEGER },
          explanation: { type: Type.STRING }
        },
        required: ["percentage", "explanation"]
      }
    });

    let data;
    try {
      data = JSON.parse(interaction.output_text || "{}");
    } catch (e) {
      throw new Error("Failed to parse AI response");
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error("Detect API Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
}
