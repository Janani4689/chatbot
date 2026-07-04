import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Direct initialization using your Gen 2 API Key
const ai = new GoogleGenAI({
  apiKey:  "AQ.Ab8RXXXXXXXXXXXX"// ⚠️ Unoda real key-ah intha quotes kulla mattum marakama pottuko da!
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message cannot be empty." });
    }

    // Direct object structure prompt tuning
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `Instructions: You are the official AI Assistant of ABC Technologies. Keep your responses precise, very brief, friendly, and directly related to the user's query. Do not talk like a generic AI tool or mention Google. Answer in maximum 2 sentences.\n\nUser Question: ${message}` }]
        }
      ]
    });

    const botReply = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.";

    res.json({ reply: botReply });

  } catch (error) {
    console.error("🚨 CRITICAL BACKEND ERROR DETECTED:");
    console.error(error); 
    
    res.status(500).json({
      reply: "Sorry! Something went wrong on the server side."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

