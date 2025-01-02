import express from "express";
import fetch from "node-fetch";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
/* in Brightspace the following url will need to be something like virginiatech.brightspace.com */
const allowedOrigins = [
    "http://127.0.0.1:5500",  // Local testing
    "https://virginiatech.brightspace.com"  // Brightspace domain
];

// Enable CORS for all routes
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],  // Allowed HTTP methods
    credentials: true,         // Allow credentials if needed
}));

// Handle preflight requests
app.options("*", cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
}));

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Use environment variables for security

app.post("/api/chat", async (req, res) => {
    const { essay } = req.body;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are a helpful assistant providing feedback on student essays." },
                    { role: "user", content: `Evaluate the following essay: ${essay}` },
                ],
                max_tokens: 300,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API error:", errorText);
            return res.status(response.status).send(errorText);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error communicating with OpenAI:", error);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
