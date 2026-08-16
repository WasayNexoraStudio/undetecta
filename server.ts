import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/detect", async (req, res) => {
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
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the following text and estimate how likely it is to be AI-generated. Return a JSON object with two fields: "percentage" (a number between 0 and 100) and "explanation" (a brief one-line explanation of your reasoning).
        
Text:
${text}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              percentage: { type: "integer" },
              explanation: { type: "string" }
            },
            required: ["percentage", "explanation"]
          }
        }
      });

      let data;
      try {
        data = JSON.parse(response.text || "{}");
      } catch (e) {
        throw new Error("Failed to parse AI response");
      }

      res.json(data);
    } catch (error: any) {
      console.error("Detect API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  });

  app.post("/api/humanize", async (req, res) => {
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
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Rewrite the following text to sound more natural, human-written, and non-repetitive in a ${tone} tone. Keep the core meaning intact but reduce patterns typical of AI content. 

IMPORTANT: Provide ONLY the single final rewritten text. Do not include any explanations, headers, options, bullet points, or conversational filler. Output only the pure humanized text ready to copy.

Text:
${text}`,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("API Error:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
