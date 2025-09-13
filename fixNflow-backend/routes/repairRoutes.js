const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const repairController = require('../controllers/repairController');

// Protect all routes
router.post('/create', authMiddleware, repairController.createRepairRequest);
router.get('/my-requests', authMiddleware, repairController.getMyRequests);
router.get('/:id', authMiddleware, repairController.getRepairRequestById);  
router.put('/:id', authMiddleware, repairController.updateRepairRequest);  
router.delete('/:id', authMiddleware, repairController.deleteRepairRequest);  

module.exports = router;