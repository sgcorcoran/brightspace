const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

const OPENAI_API_KEY = "OPENAI_API_KEY"; // Replace with your API key

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
