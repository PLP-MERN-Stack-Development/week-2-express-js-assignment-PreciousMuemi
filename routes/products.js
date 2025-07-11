const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');

// Utility to get the in-memory products from app.locals
const getProducts = (req) => req.app.locals.products;

// 📌 GET /api/products - List all products (with filters, search, pagination)
router.get('/', (req, res) => {
  const products = getProducts(req);
  const { category, search, page = 1, limit = 5 } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + Number(limit);
  const paginated = result.slice(startIndex, endIndex);

  res.json({
    total: result.length,
    page: Number(page),
    limit: Number(limit),
    data: paginated
  });
});

// 📌 GET /api/products/:id - Get one product by ID
router.get('/:id', (req, res) => {
  const products = getProducts(req);
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// 📌 POST /api/products - Create a new product
router.post('/', validateProduct, (req, res) => {
  const products = getProducts(req);
  const { name, description, price, category, inStock } = req.body;

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 📌 PUT /api/products/:id - Update a product
router.put('/:id', validateProduct, (req, res) => {
  const products = getProducts(req);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const updated = { ...products[index], ...req.body };
  products[index] = updated;
  res.json(updated);
});

// 📌 DELETE /api/products/:id - Delete a product
router.delete('/:id', (req, res) => {
  const products = getProducts(req);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted });
});

// 📌 GET /api/products/stats/by-category - Get product count by category
router.get('/stats/by-category', (req, res) => {
  const products = getProducts(req);
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json(stats);
});

module.exports = router;
