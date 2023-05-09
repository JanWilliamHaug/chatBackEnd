# Hikari Chatbot Backend

This repository contains the backend for the Hikari Chatbot, a friendly and cute AI chatbot with a personality like sunshine. Hikari loves BTS and enjoys talking about their music, members, and experiences.

## Getting Started

### Prerequisites

- Node.js
- npm
- An OpenAI API key

### Installation

1. Clone the repository
git clone https://github.com/yourusername/hikari-chatbot-backend.git

2. Install dependencies
- cd (folder)
- npm install

3. Set up environment variables
   Create a `.env` file in the root of the project and add the following:
   - OPENAI_API_KEY=your_openai_api_key

4. Start the server
npm run start

The server will be running at `http://localhost:3001`.

## API

### POST /chatbot/message

Send a message to Hikari and receive a response.

Request body:
{
"message": "your_message_here"
}


Response:
{
"response": "hikari_response_here"
}


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
