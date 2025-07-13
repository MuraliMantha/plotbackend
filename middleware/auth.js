const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'murali';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = auth;