const User = require('../models/User');

const authorizeRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (user.role !== role) {
        return res.status(403).json({ message: 'Access forbidden: incorrect role' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = authorizeRole;
