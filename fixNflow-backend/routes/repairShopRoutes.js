const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');
const {
  listAvailableRequests,
  assignRequest,
  updateRequest,
} = require('../controllers/repairShopController');

// All routes require authentication and shop role
router.use(authMiddleware, authorizeRole('shop'));

router.get('/available', listAvailableRequests);
router.post('/assign/:id', assignRequest);
router.put('/update/:id', updateRequest);

module.exports = router;
