const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path according to your project structure

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId || decoded.id).select('-password'); // Adjust key if needed

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach full user to req.user
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
