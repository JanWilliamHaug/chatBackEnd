const express = require('express');
const { generateResponse } = require('./openai');
const cors = require('cors');

const app = express();

// Add the cors middleware
app.use(cors());

app.use(express.json());

app.post('/chatbot/message', async (req, res) => {
  const message = req.body.message;
  const response = await generateResponse(message);
  res.send({ response });
});

app.get('/', (req, res) => {
  res.send('Chatbot backend is up and running.');
});

module.exports = app;
