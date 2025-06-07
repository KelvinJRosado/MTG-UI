/**
 * Simple API server using native Node.js HTTP module.
 * Returns a sample JSON response at the root path.
 *
 * This structure allows for easy expansion in the future.
 */
import { createServer } from 'node:http';
import { getCardByName, getRandomCard } from './scryfall';

const PORT = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  // Set CORS headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Handle GET /api/card?name=CardName
  if (req.method === 'GET' && req.url && req.url.startsWith('/api/card')) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const name = urlObj.searchParams.get('name');
    if (!name) {
      res.writeHead(400);
      res.end(
        JSON.stringify({ error: 'Missing required query parameter: name' })
      );
      return;
    }
    const card = await getCardByName(name);
    if (card) {
      res.writeHead(200);
      res.end(JSON.stringify(card));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Card not found' }));
    }
    return;
  }

  // Handle GET /api/random-card
  if (req.method === 'GET' && req.url && req.url === '/api/random-card') {
    const card = await getRandomCard();
    if (card) {
      res.writeHead(200);
      res.end(JSON.stringify(card));
    } else {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to fetch random card' }));
    }
    return;
  }

  // Only handle GET /
  if (req.method === 'GET' && req.url === '/') {
    // Example response
    const response = {
      message: 'Hello from the API!',
      timestamp: new Date().toISOString(),
    };
    res.writeHead(200);
    res.end(JSON.stringify(response));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
