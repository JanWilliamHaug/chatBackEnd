const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateResponse(prompt) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });


    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      return 'Error: No response choices were returned.';
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 429) {
      return 'Error: Too Many Requests. Please wait for a while and try again.';
    } else {
      return 'Error: Unable to generate response.';
    }
  }
}

module.exports = {
  generateResponse,
};
