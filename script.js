const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define the target URL where requests will be forwarded
const targetURL = 'http://www.google.com';

// Create a proxy middleware with the target URL
const proxy = createProxyMiddleware({
  target: targetURL,
  changeOrigin: true,
  xfwd: true,
});

// Use the proxy middleware for all routes
app.use('/', proxy);

// Handle search requests
app.get('/search', (req, res) => {
  // Log the search query (optional)
  console.log(`Search query: ${req.query.q}`);

  // Forward the search request to Google
  proxy(req, res);
});

// Start the server on port 5500
const port = 5500;
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});