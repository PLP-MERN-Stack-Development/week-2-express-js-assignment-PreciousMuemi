// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const products = require('./data/products'); // ✅ Import your products array
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const auth = require('./middleware/auth');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(logger); // logs method, url, timestamp
app.use(bodyParser.json()); // parses JSON
app.use(auth); // checks for API key

// Attach products array to app locals (for access in routers)
app.locals.products = products;

// Route setup
app.use('/api/products', productsRouter);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Visit /api/products to view all products.');
});

// Error handler must come **after** all other routes/middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
