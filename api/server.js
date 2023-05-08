const express = require('express');
const { generateResponse } = require('./openai');

const app = express();
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
