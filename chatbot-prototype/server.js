require("dotenv").config(); 
const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require("body-parser"); 
 
const app = express(); 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(cors()); 
app.use(express.json()); // Ensures Express parses JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
 
const PORT = process.env.PORT || 5000; 
 
// Chatbot API Route 
app.post("/api/chatbot", async (req, res) => { 
const userQuery = req.body.query; 
 
// Predefined Response for "Hello" 
if (userQuery.toLowerCase() === "hello") { 
return res.json({ response: "hello to you" }); 
} 
 
res.json({ response: "I am a chatbot prototype!" }); 
}); 
 
// Start Server 
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)); 
