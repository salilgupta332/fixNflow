const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createRepairRequest, getMyRequests } = require('../controllers/repairController');

// Protect routes
router.post('/create', authMiddleware, createRepairRequest);
router.get('/my-requests', authMiddleware, getMyRequests);

module.exports = router;
