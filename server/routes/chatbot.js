const router = require('express').Router();
const { generateResponse } = require('../openai');

router.post('/message', async (req, res) => {
  const prompt = req.body.message;
  const response = await generateResponse(prompt);

  res.json({ response });
});

module.exports = router;
