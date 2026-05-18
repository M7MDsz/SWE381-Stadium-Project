const express = require('express');
const {
  getStadiums,
  getMyStadiums,
  getStadiumById,
  createStadium,
  addSlot,
  getOwnerStats
} = require('../controllers/stadiumController');
const { reserveSlot } = require('../controllers/reservationController');
const { sendStadiumMessage } = require('../controllers/messageController');
const { protect, ownerOnly } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', getStadiums);
router.get('/mine', protect, ownerOnly, getMyStadiums);
router.get('/stats', protect, ownerOnly, getOwnerStats);
router.get('/:id', getStadiumById);
router.post('/', protect, ownerOnly, validate(['name', 'description', 'location']), createStadium);
router.post('/:id/slots', protect, ownerOnly, validate(['date', 'startTime', 'endTime']), addSlot);
router.post('/:stadiumId/slots/:slotId/reserve', protect, reserveSlot);
router.post('/:stadiumId/messages', protect, validate(['text']), sendStadiumMessage);

module.exports = router;
