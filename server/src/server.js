
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

app.listen(PORT, () => {
    console.log(`CareerForge server running on port ${PORT}`);
});
