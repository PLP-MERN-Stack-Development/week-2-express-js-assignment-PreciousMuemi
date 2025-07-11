// middleware/validateProduct.js
const { ValidationError } = require('../utils/customErrors');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
    return next(new ValidationError('Invalid or missing product fields. Required: name (string), description (string), price (number), category (string), inStock (boolean)'));
  }

  next();
};
