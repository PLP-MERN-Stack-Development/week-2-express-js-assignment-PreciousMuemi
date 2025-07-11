// routes/products.js

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];
// We'll attach the actual `products` array through `req.app.locals`
const getProducts = (req) => req.app.locals.products;

// 📌 GET /api/products - Get all products
router.get('/', (req, res) => {
  const products = getProducts(req);

  // Filtering by category
  const { category, page = 1, limit = 5, search } = req.query;
  let result = [...products];

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  // Pagination
  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginated = result.slice(start, end);

  res.json(paginated);
});

// 📌 GET /api/products/:id - Get one product
router.get('/:id', (req, res) => {
  const products = getProducts(req);
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// 📌 POST /api/products - Create product
router.post('/', (req, res) => {
  const products = getProducts(req);
  const { name, description, price, category, inStock } = req.body;

  // Basic validation
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 📌 PUT /api/products/:id - Update product
router.put('/:id', (req, res) => {
  const products = getProducts(req);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const updatedProduct = { ...products[index], ...req.body };
  products[index] = updatedProduct;
  res.json(updatedProduct);
});

// 📌 DELETE /api/products/:id - Delete product
router.delete('/:id', (req, res) => {
  const products = getProducts(req);
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', deleted });
});

// 📌 GET /api/products/stats - Get count by category
router.get('/stats/by-category', (req, res) => {
  const products = getProducts(req);
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json(stats);
});

module.exports = router;
