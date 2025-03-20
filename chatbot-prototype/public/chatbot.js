async function sendMessage() { 
    const userInput = document.getElementById("userInput").value; 
    document.getElementById("response").innerText = "Waiting for response..."; 
     
    const response = await fetch("https://brightspace-chatbot.onrender.com/api/chatbot", { 
    method: "POST", 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({ query: userInput }), 
    }); 
     
    const data = await response.json(); 
    document.getElementById("response").innerText = data.response; 
    } 
    