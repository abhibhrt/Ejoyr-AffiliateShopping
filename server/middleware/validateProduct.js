const { validationResult } = require('express-validator');
const Product = require('../models/Product');

exports.validateProduct = [
  // Validate required fields
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  // Check if product exists (for update/delete)
  async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      req.product = product;
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];