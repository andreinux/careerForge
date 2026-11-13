
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ]
}));

app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "CareerForge backend is running!"
    });
});

// Receive resume information
app.post("/api/resume", (req, res) => {
    const resumeData = req.body;

    // Basic validation
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

app.listen(PORT, () => {
    console.log(`CareerForge server running on port ${PORT}`);
});
