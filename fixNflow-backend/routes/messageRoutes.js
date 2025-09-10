const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { saveMessage, getMessages } = require('../controllers/messageController');

// Authenticated users only
router.use(authMiddleware);

router.post('/', saveMessage);
router.get('/:repairRequestId', getMessages);

module.exports = router;
