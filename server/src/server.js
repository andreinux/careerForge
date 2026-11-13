
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import Groq from "groq-sdk";
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const MODEL = "openai/gpt-oss-20b";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ]
}));

app.use(express.json());

// Initialize Gemini
if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing from server/.env");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});




console.log("ACTIVE GEMINI MODEL:", MODEL);
// Health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "CareerForge backend is running!"
    });
});
app.get("/api/test-gemini", async (req, res) => {
    try {
        console.log("TEST ROUTE MODEL:", MODEL);

        const result = await ai.interactions.create({
            model: MODEL,
            input: "Reply with exactly: CareerForge is working!"
        });

        res.json({
            success: true,
            activeModel: MODEL,
            response: result.output_text
        });

    } catch (error) {
        console.error("Simple Gemini test failed:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//GROQ ROUTE

app.get("/api/test-groq", async (req, res) => {
    try {
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: "user",
                    content: "Reply with exactly: CareerForge Groq is working!"
                }
            ]
        });

        res.json({
            success: true,
            activeModel: MODEL,
            response: completion.choices[0].message.content
        });

    } catch (error) {
        console.error("Groq test failed:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Receive resume information
app.post("/api/resume", (req, res) => {
    const resumeData = req.body;

    if (!resumeData || typeof resumeData !== "object") {
        return res.status(400).json({
            success: false,
            message: "Invalid resume data."
        });
    }

    if (!resumeData.fullName || !resumeData.email) {
        return res.status(400).json({
            success: false,
            message: "Full name and email are required."
        });
    }

    console.log("Resume information received!");

    res.status(200).json({
        success: true,
        message: "Resume information received successfully!",
        data: resumeData
    });
});



// Generate resume using Groq
app.post("/api/resume/generate", async (req, res) => {
    try {
        const resumeData = req.body;

        if (!resumeData || typeof resumeData !== "object" ||
            Array.isArray(resumeData)) {
            return res.status(400).json({
                success: false,
                message: "Invalid resume information."
            });
        }

        if (!resumeData.fullName || !resumeData.email ||
            !resumeData.education || !resumeData.skills) {
            return res.status(400).json({
                success: false,
                message: "Name, email, education, and skills are required."
            });
        }

        const prompt = `
Create a polished, professional resume using ONLY the information supplied below.

STRICT RULES:
- Never invent employment, education, skills, dates, certifications, or achievements.
- Never turn a personal project into professional employment.
- Do not invent numbers or measurable accomplishments.
- Improve grammar, clarity, wording, and professional presentation.
- If information is missing, leave the relevant section empty.
- Keep the content truthful to the user's actual background.
- Do not include fictional details.

USER INFORMATION:
${JSON.stringify(resumeData, null, 2)}

Generate the resume content in the requested JSON structure.
`;

        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content: `
You are CareerForge, a professional resume-writing assistant.

Return ONLY a valid JSON object with these exact keys:
- professionalHeadline: string
- professionalSummary: string
- experienceBullets: array of strings
- projectBullets: array of strings
- skills: array of strings
- education: string
- certifications: array of strings

Never invent qualifications, employment, dates, achievements, or certifications.
Use only the information provided.
`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.3
        });

        const generatedResume = JSON.parse(
            completion.choices[0].message.content
        );

        res.status(200).json({
            success: true,
            message: "Resume generated successfully!",
            data: generatedResume
        });

    } catch (error) {
        console.error("Groq generation error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to generate your resume. Please try again."
        });
    }
});



app.listen(PORT, () => {
    console.log(`CareerForge server running on port ${PORT}`);
});
