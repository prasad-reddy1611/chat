const express = require('express');
const cors = require('cors');
const responses = require('./data.js'); // Import the chatbot responses

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Route for handling chat
app.post('/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  // Find the bot's response, or use a default message if not found
  const botResponse = responses[userMessage] || "I am not sure how to respond to that.";
  
  res.json({ response: botResponse });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
