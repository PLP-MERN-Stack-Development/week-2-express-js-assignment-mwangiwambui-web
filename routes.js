const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authenticate, validateProduct } = require('./middleware');
const { NotFoundError, ValidationError } = require('./errors');

const router = express.Router();

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

router.use(authenticate);

// Async handler utility
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/products - List all products with filtering, pagination, and search
router.get('/products', asyncHandler(async (req, res, next) => {
  let result = products;

  // Filtering by category
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  // Searching by name (case-insensitive)
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(search));
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    products: paginated
  });
}));

// GET /api/products/stats - Get product statistics (count by category)
router.get('/products/stats', asyncHandler(async (req, res, next) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json({ countByCategory: stats });
}));

// GET /api/products/:id - Get a specific product
router.get('/products/:id', asyncHandler(async (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
}));

// POST /api/products - Create a new product
router.post('/products', validateProduct, asyncHandler(async (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    throw new ValidationError('All product fields are required');
  }
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
}));

// PUT /api/products/:id - Update a product
router.put('/products/:id', validateProduct, asyncHandler(async (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  if (!name || !description || price === undefined || !category || inStock === undefined) {
    throw new ValidationError('All product fields are required');
  }
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.inStock = inStock;
  res.json(product);
}));

// DELETE /api/products/:id - Delete a product
router.delete('/products/:id', asyncHandler(async (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) throw new NotFoundError('Product not found');
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deleted[0] });
}));

module.exports = router;