require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// 🔹 Enable CORS
app.use(cors());

// 🔹 Ensure Express parses JSON correctly
app.use(express.json()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// 🔹 Log incoming requests for debugging
app.use((req, res, next) => {
    console.log(`🔹 Received request: ${req.method} ${req.url}`);
    console.log("🔹 Headers:", req.headers);
    
    let rawBody = '';
    req.on('data', (chunk) => { rawBody += chunk; });
    req.on('end', () => {
        console.log("🔹 Raw Body Received:", rawBody);
    });

    console.log("🔹 Parsed Body:", req.body); 
    next();
});

// Set up CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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
