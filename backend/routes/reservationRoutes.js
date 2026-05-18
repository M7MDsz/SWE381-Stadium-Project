const express = require('express');
const { getMyReservations, cancelReservation } = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/mine', protect, getMyReservations);
router.put('/:id/cancel', protect, cancelReservation);

module.exports = router;
