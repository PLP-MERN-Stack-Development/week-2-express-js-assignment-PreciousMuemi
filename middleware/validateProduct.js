// middleware/validateProduct.js

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({ 
      error: 'Invalid or missing product fields. Required: name (string), description (string), price (number), category (string), inStock (boolean)' 
    });
  }

  next();
};
