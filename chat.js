const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

app.post('/api/botpress', async (req, res) => {
  const { userMessage } = req.body;

  // Call Botpress API here
  const botpressApiUrl = 'https://webhook.botpress.cloud/c90a8f0a-b0df-4b23-8a7b-f29664d6cd0c';
  const headers = {
    'Authorization': 'Bearer your-botpress-api-key',
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    text: userMessage,
    // Other fields required by the Botpress API
  });

  try {
    const response = await fetch(botpressApiUrl, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error calling Botpress API:', error);
    res.status(500).json({ error: 'Failed to communicate with Botpress' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
