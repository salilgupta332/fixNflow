const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Registration endpoint
router.post("/register", registerUser);

// Login endpoint
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  console.log("User info:", req.user);

  // Return user info
  res.json({
    name: req.user?.name,
    email: req.user?.email,
    role: req.user?.role,
  });
});
module.exports = router;
