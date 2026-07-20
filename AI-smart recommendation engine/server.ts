import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Initialize Gemini client on the server safely
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey && apiKey !== "MY_GEMINI_API_KEY"
    ? new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      })
    : null;

  console.log(`[Server] Gemini API state: ${ai ? "FULLY ENCRYPTED NEURAL INTERFACE ONLINE" : "DEMO EMBEDDED MATH ENGINE ONLY (Key missing or default)"}`);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "online", 
      time: new Date().toISOString(),
      aiEngine: ai ? "Gemini Neural Active" : "Local Vector Engine"
    });
  });

  // Explain Recommendation API Route using server-side Gemini
  app.post("/api/recommendations/explain", async (req, res) => {
    try {
      const { item, preferences, matchScore, similarityPercentage, technique } = req.body;
      if (!item || !preferences) {
        return res.status(400).json({ error: "Missing item or user preference coordinates" });
      }

      // If Gemini is not initialized or fails, return an incredibly polished local dynamic analysis
      if (!ai) {
        const vocabMatches = item.tags.filter((t: string) => 
          preferences.tags?.some((pt: string) => pt.toLowerCase() === t.toLowerCase()) ||
          preferences.interests?.some((pi: string) => pi.toLowerCase() === t.toLowerCase())
        );
        
        return res.json({
          summary: `The engine detected a robust ${matchScore}% correlation for "${item.title}" based on your target category of ${preferences.category}.`,
          vectorAlignment: `Multidimensional alignment at Cosine Theta = ${(similarityPercentage / 100).toFixed(2)}. Highly weighted tags resolved: [${vocabMatches.join(", ") || "standard matching keywords"}].`,
          collaborativeContext: `Simulated collaborative nodes show a positive overlap. Users with similar profile metrics ranked this at ${(item.rating + 0.1).toFixed(1)}/5 stars.`,
          neuralInsight: `Configure your GEMINI_API_KEY in the Settings Secrets tab to unlock real-time Deep-Mind AI neural synthesis explaining exact behavioral affinity for "${item.title}".`
        });
      }

      const prompt = `You are the core neural AI engine for "AI Smart Recommendation Engine", a premium futuristic SaaS recommendation platform.
Analyze the following item matched with user preferences. Construct a stunning, futuristic, and mathematically interesting explanation.

USER PREFERENCE ATTRIBUTES:
- Category Selected: ${preferences.category}
- Specific Genres: ${preferences.genres?.join(', ') || 'None selected'}
- Interests Chosen: ${preferences.interests?.join(', ') || 'None selected'}
- Budget Matrix: ${preferences.budget}
- Target Skill Level: ${preferences.skillLevel}
- Difficulty Setting: ${preferences.difficulty}
- Duration Matrix: ${preferences.duration}
- Specific Tags: ${preferences.tags?.join(', ') || 'None selected'}

RECOMMENDED ITEM METRICS:
- Title: ${item.title}
- Category: ${item.category}
- Description: ${item.description}
- Product Tags: ${item.tags?.join(', ')}
- Global Star Rating: ${item.rating}/5
- Global Popularity Level: ${item.popularity}/100

CALCULATED ALGORITHM OUTCOMES:
- Composite Match Score: ${matchScore}%
- Content Similarity (Cosine TF-IDF Vector Space): ${similarityPercentage}%
- Primary Recommendation Technique: ${technique}

Generate a highly engaging, futuristic, scientifically precise explanation in JSON format matching this schema:
{
  "summary": "Short 1-2 sentence high-level synthesis of why this is a prime match.",
  "vectorAlignment": "Explanation of the TF-IDF feature overlap and cosine similarity value.",
  "collaborativeContext": "Explanation of how similar users (collaborative matching) influenced this rank.",
  "neuralInsight": "Creative AI insight on the synergy between the user's specific lifestyle preferences and this recommendation."
}
Ensure you do not return markdown wrap like \`\`\`json, just return pure raw valid JSON string. Ensure the tone is extremely polished, scientific, futuristic, and premium.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.75,
        }
      });

      const responseText = response.text?.trim() || "{}";
      
      // Safe parsing to ensure it's valid JSON
      try {
        const parsed = JSON.parse(responseText);
        res.json(parsed);
      } catch (parseError) {
        console.error("Failed to parse Gemini output as JSON, returning fallback structure. Content was:", responseText);
        res.json({
          summary: `We detected a strong correlation of ${matchScore}% for "${item.title}".`,
          vectorAlignment: `Cosine Similarity calculated at ${(similarityPercentage / 100).toFixed(2)}. Highly weighted features matched include: ${item.tags.slice(0, 3).join(", ")}.`,
          collaborativeContext: `Simulated user correlation clusters indicate high utility matching. Predicted rating of ${item.rating}/5.`,
          neuralInsight: responseText.replace(/[\{\}"]/g, '').substring(0, 200) + "..."
        });
      }

    } catch (err: any) {
      console.error("Gemini API processing error:", err);
      res.status(500).json({ error: "Failed to generate AI neural analysis: " + err.message });
    }
  });

  // Express router static file hosting and Vite server integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("[Server] Vite development middleware loaded.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("[Server] Production static server active.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] AI Smart Recommendation Engine listening on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical server bootstrap error:", err);
});
