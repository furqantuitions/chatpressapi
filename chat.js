const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

app.post('/api/botpress', async (req, res) => {
  const { userMessage } = req.body;

  // Use the provided Botpress webhook URL
  const botpressApiUrl = 'https://webhook.botpress.cloud/c90a8f0a-b0df-4b23-8a7b-f29664d6cd0c';
  
  // Construct the headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Construct the body for the POST request
  const body = JSON.stringify({
    text: userMessage,
    // Other fields required by Botpress webhook (check Botpress documentation for required fields)
  });

  try {
    // Call Botpress webhook with the user message
    const response = await fetch(botpressApiUrl, {
      method: 'POST',
      headers,
      body,
    });

    // Get the response data from Botpress
    const data = await response.json();

    // Log the response for debugging purposes
    console.log('Botpress response:', data);

    // Return the response back to the client
    res.status(200).json(data);
  } catch (error) {
    console.error('Error calling Botpress API:', error);
    
    // Return a 500 status code if the request fails
    res.status(500).json({ error: 'Failed to communicate with Botpress' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
