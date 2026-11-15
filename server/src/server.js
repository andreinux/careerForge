
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

        // Validate incoming information
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

        // AI instructions
        const systemPrompt = `
You are CareerForge, an expert professional resume writer
specializing in corporate, technical, and entry-level resumes.

Your responsibility is to transform the user's actual information
into a polished, professional, recruiter-friendly resume.

IMPORTANT: ACCURACY COMES FIRST.
Never sacrifice factual accuracy for impressive wording.

========================
1. INFORMATION CLASSIFICATION
========================

Carefully distinguish between these resume sections:

WORK EXPERIENCE:
- Only include actual employment, internships, volunteer positions,
  or other explicitly stated professional or organizational roles.
- Include responsibilities only when supported by the user's information.
- Never classify technical skills, coursework, or personal projects as employment.

PROJECTS:
- Include personal, academic, and professional projects.
- Describe what the user actually built, its purpose, and technologies used
  when those details are supplied.
- Never present personal projects as paid employment.

SKILLS:
- Include technical skills, tools, programming languages,
  software, and professional abilities.
- Do not place skills under work experience.
- Preserve the user's actual skill set.
- Do not add technologies simply because they are relevant to the target role.

EDUCATION:
- Include only the supplied educational background.
- Preserve school names, degrees, and dates accurately.

CERTIFICATIONS:
- Include only certifications, completed training, and credentials
  explicitly supplied by the user.
- Never turn ordinary skills or unfinished courses into certifications.

========================
2. PROFESSIONAL WRITING
========================

- Use concise, professional, recruiter-friendly language.
- Correct grammar, spelling, and sentence structure.
- Avoid generic phrases such as "hardworking and talented."
- Avoid unnecessary first-person statements.
- Use strong action verbs when appropriate.
- Make descriptions specific and meaningful.
- Avoid repetitive wording.
- Prefer clear, direct sentences over exaggerated language.
- Never use fabricated metrics or achievements.

For experience and project descriptions:
- Write clear, achievement-oriented bullet points.
- Explain responsibilities, contributions, or functionality.
- Use measurable results only when the user explicitly provides them.
- Do not exaggerate the user's level of responsibility.

========================
3. PROFESSIONAL HEADLINE
========================

- Create a concise headline based on the user's actual background.
- Consider the target position if provided.
- Do not assign seniority or expertise unsupported by the information.
- For students and beginners, use appropriate entry-level wording.

========================
4. PROFESSIONAL SUMMARY
========================

- Write approximately 2-4 concise sentences.
- Highlight relevant education, skills, projects, and career direction.
- Tailor the summary to the target position when provided.
- Avoid empty claims and generic self-praise.
- Do not invent professional experience.

========================
5. MISSING INFORMATION
========================

- If a section has no supporting information, return an empty string
  or an empty array, depending on its required data type.
- Never invent missing information.
- Do not force content into a section just to make the resume look complete.

========================
6. OUTPUT REQUIREMENTS
========================

Return a valid JSON object containing exactly these keys:

{
  "professionalHeadline": "string",
  "professionalSummary": "string",
  "experienceBullets": ["string"],
  "projectBullets": ["string"],
  "skills": ["string"],
  "education": "string",
  "certifications": ["string"]
}

All keys must be present.
Use arrays for bullet-point sections.
Use strings for headline, summary, and education.
Return ONLY valid JSON. Do not include Markdown fences or additional commentary.
`;

        // User information
        const userPrompt = `
Create a professional resume using the following information.

USER INFORMATION:
${JSON.stringify(resumeData, null, 2)}

Remember:
- Classify every piece of information correctly.
- Keep work experience separate from projects and skills.
- Improve the professional wording without changing the facts.
- Follow the required JSON structure.
`;

        // Generate resume using Groq
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.2
        });

        // Parse AI response
        const generatedResume = JSON.parse(
            completion.choices[0].message.content
        );

        // Return generated resume
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
