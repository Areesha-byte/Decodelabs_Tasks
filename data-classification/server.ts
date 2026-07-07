import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client getter
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
      throw new Error("GEMINI_API_KEY is not configured in the environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Healthcheck endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// 2. AI Explainer endpoint using Gemini 3.5 Flash
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { datasetName, kValue, metrics, customPrompt, currentStep } = req.body;
    
    // Check key availability first
    let ai;
    try {
      ai = getGeminiClient();
    } catch (keyErr: any) {
      return res.status(400).json({ 
        error: "Missing API Key", 
        message: "GEMINI_API_KEY is missing or invalid. Please configure your Gemini API Key under the Secrets panel in Google AI Studio."
      });
    }

    // Build context-rich prompt
    let systemInstruction = "You are an expert AI & Machine Learning professor, teaching university students data classification concepts.";
    let promptText = "";

    if (customPrompt) {
      // General Q&A
      promptText = `A student is studying data classification. They are currently looking at the '${datasetName || "Iris"}' dataset.
Their current model is K-Nearest Neighbors (KNN) with K=${kValue || 5}.
The metrics of the model are: Accuracy=${metrics?.accuracy ? (metrics.accuracy * 100).toFixed(2) + "%" : "N/A"}, Precision=${metrics?.precision ? metrics.precision.toFixed(4) : "N/A"}, Recall=${metrics?.recall ? metrics.recall.toFixed(4) : "N/A"}, F1-Score=${metrics?.f1 ? metrics.f1.toFixed(4) : "N/A"}.

The student has the following question:
"${customPrompt}"

Please provide a clear, encouraging, and academically helpful answer in markdown format. Use bullet points, bold text, and analogies where appropriate. Keep it accessible yet rigorous.`;
    } else {
      // Automated Model Analysis
      promptText = `Analyze the performance of a K-Nearest Neighbors (KNN) classifier with K=${kValue} trained on the ${datasetName === "iris" ? "Iris Flower" : "Breast Cancer Wisconsin"} dataset.
Here are the current testing metrics:
- Accuracy: ${(metrics?.accuracy * 100).toFixed(2)}%
- Macro Precision: ${metrics?.precision?.toFixed(4)}
- Macro Recall: ${metrics?.recall?.toFixed(4)}
- Macro F1-Score: ${metrics?.f1?.toFixed(4)}

The current step in the workflow is: '${currentStep || "Model Evaluation"}'.

Please write a comprehensive, beginner-friendly report in markdown. Include:
1. An evaluation of whether these metrics indicate Overfitting, Underfitting, or an Optimal Sweet Spot, and what these terms mean in simple language.
2. An explanation of how KNN came to this decision using the value of K=${kValue} and Euclidean distances.
3. One concrete piece of advice for the student on how to improve this classification score (e.g., hyperparameter tuning, features, class weights).
Make the response highly professional, clean, and styled with markdown headings.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "API Error", 
      message: error.message || "An unexpected error occurred while communicating with Gemini." 
    });
  }
});

// Configure Vite or Static Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite HMR integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
