const jwt = require('jsonwebtoken');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1234'; // Replace with secure password in production
const JWT_SECRET = process.env.JWT_SECRET || 'murali';

// Login
const login = (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};

module.exports = { login };