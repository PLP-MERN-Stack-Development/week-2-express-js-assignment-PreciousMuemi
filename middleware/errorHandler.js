const { NotFoundError, ValidationError } = require('../utils/customErrors');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof NotFoundError || err instanceof ValidationError) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: 'Something went wrong!' });
};


