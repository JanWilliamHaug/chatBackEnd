require('dotenv').config();
const express = require('express');
const { generateResponse } = require('./openai');
const cors = require('cors');

const app = express();


// Set up CORS options
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Add the cors middleware with options
app.use(cors(corsOptions));

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
