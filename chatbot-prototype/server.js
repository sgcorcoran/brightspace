require("dotenv").config(); 
const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require("body-parser"); 
 
const app = express(); 
app.use(cors()); 
app.use(bodyParser.json()); 
 
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
