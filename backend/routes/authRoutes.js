const express = require('express');
const { register, login, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/register', validate(['name', 'email', 'password', 'role']), register);
router.post('/login', validate(['email', 'password']), login);
router.get('/me', protect, me);

module.exports = router;
