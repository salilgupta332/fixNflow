const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Registration endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `User ID: ${req.userId} authorized` });
});

module.exports = router;
