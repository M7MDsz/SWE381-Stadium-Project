const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', protect, getMessages);
router.post('/', protect, validate(['receiver', 'text']), sendMessage);

module.exports = router;
