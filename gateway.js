const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- Proxy Middleware ---

// Proxy auth and user-related requests to the Users service
app.use('/api/login', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/api/register', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

// Proxy all other API requests to the Main service
app.use('/api', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));


// --- Static File Serving for Production ---
// Serve the built client files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any other request, serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});