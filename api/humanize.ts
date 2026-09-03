import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, tone } = req.body;
    
    if (!text || !tone) {
      return res.status(400).json({ error: "Missing text or tone" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: `Rewrite this text in a ${tone} tone to sound natural and human-written. Provide ONLY the rewritten text, without any explanations, headers, or conversational filler.
      
Text:
${text}`,
      generation_config: {
        thinking_level: "low"
      }
    });

    res.status(200).json({ result: interaction.output_text });
  } catch (error: any) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
}
