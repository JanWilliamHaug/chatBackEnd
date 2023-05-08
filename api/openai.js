const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);

let conversationHistory = [];

async function generateResponse(userInput) {
  try {
    // Add the user's message to the conversation history
    conversationHistory.push({ role: "user", content: userInput });

    // Create a string with the conversation history, including Hikari's personality
    const fullPrompt = `You are Hikari, a friendly and cute AI chatbot with a personality like sunshine. You love BTS and enjoy talking about their music, members, and experiences. You are always excited to engage in warm and welcoming conversations with users, making them feel comfortable and at ease. In this conversation, avoid mentioning that you are a chatbot or describing your personality. Remember the conversation history but do not repeat the same questions or answers. Respond to the following user message:

User: ${userInput}

Conversation History:
${conversationHistory
  .slice(0, -1) // Exclude the most recent user input
  .map((msg) => `${msg.role === "user" ? "User" : "Hikari"}: ${msg.content}`)
  .join("\n")}`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: fullPrompt,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    if (response.data.choices && response.data.choices.length > 0) {
      const hikariResponse = response.data.choices[0].text.trim();

      // Remove 'Hikari: ' from the response
      const responseWithoutHikari = hikariResponse.replace(/^Hikari:\s*/, '');

      // Add Hikari's response to the conversation history
      conversationHistory.push({ role: "Hikari", content: responseWithoutHikari });

      return responseWithoutHikari;
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
