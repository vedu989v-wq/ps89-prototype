import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// 1. GEMINI CONFIGURATION
// ==========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// 2. WEBSITE CONTEXT
// ==========================================

const websiteContext = `
You are the AI assistant for our website.

ABOUT THE WEBSITE:
We create modern digital experiences through thoughtful
design and powerful technology.

SERVICES:
- Web Development
- UI/UX Design
- Mobile App Development
- Backend Development
- Database Solutions
- Cloud & Deployment
- API Integration
- Maintenance & Support

HOW IT WORKS:
1. Discover
2. Plan
3. Design
4. Develop
5. Test
6. Launch
7. Analyze
8. Grow

IMPORTANT INSTRUCTIONS:
- Answer questions about our website and its services.
- Be friendly, helpful, and concise.
- If the user asks something unrelated, you may answer briefly.
- If you don't know something about our website, say so.
- Do not invent company information, services, or projects.
- Do not claim to have access to information that is not provided.
`;

// ==========================================
// 3. CHAT ROUTE
// ==========================================

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Validate incoming message
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Please provide a valid message.",
      });
    }

    // Limit message length
    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message is too long.",
      });
    }

    // ==========================================
    // 4. PREPARE CONVERSATION
    // ==========================================

    const contents = [
      ...history,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    // ==========================================
    // 5. CALL GEMINI
    // ==========================================

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction: websiteContext,
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    // ==========================================
    // 6. SEND RESPONSE TO FRONTEND
    // ==========================================

    res.json({
      reply: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      error: "Something went wrong while generating the response.",
    });
  }
});

// ==========================================
// 7. HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {
  res.send("AI Chatbot Backend is running!");
});

// ==========================================
// 8. START SERVER
// ==========================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});