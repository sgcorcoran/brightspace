require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// 🔹 Enable CORS
app.use(cors());

// 🔹 Capture Raw Body Before Parsing
app.use((req, res, next) => {
    let rawData = '';
    req.on('data', chunk => {
        rawData += chunk;
    });

    req.on('end', () => {
        console.log("🔹 Raw Body Received:", rawData);
        try {
            req.body = JSON.parse(rawData); // Manually parse JSON
        } catch (err) {
            console.log("❌ Error parsing JSON:", err.message);
            return res.status(400).json({ error: "Invalid JSON format" });
        }
        next();
    });
});

// 🔹 Ensure Express Parses JSON Correctly
app.use(express.json()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Log Incoming Requests for Debugging
app.use((req, res, next) => {
    console.log(`🔹 Received request: ${req.method} ${req.url}`);
    console.log("🔹 Headers:", req.headers);
    console.log("🔹 Parsed Body:", req.body);
    next();
});

// 🔹 Chatbot API Route
app.post("/api/chatbot", (req, res) => {
    console.log("🔹 Parsed JSON:", req.body);

    if (!req.body || !req.body.query) {
        return res.status(400).json({ error: "Invalid request format. Missing 'query' field." });
    }

    const userQuery = req.body.query.toLowerCase();
    if (userQuery === "hello") {
        return res.json({ response: "hello to you" });
    }

    res.json({ response: "I am a chatbot prototype!" });
});

const PORT = process.env.PORT || 5000;

// 🔹 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
