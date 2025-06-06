/**
 * Simple API server using native Node.js HTTP module.
 * Returns a sample JSON response at the root path.
 *
 * This structure allows for easy expansion in the future.
 */
import { createServer } from 'node:http';

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  // Set CORS headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

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
