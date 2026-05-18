const Stadium = require('../models/Stadium');
const Reservation = require('../models/Reservation');

const reserveSlot = async (req, res, next) => {
  try {
    if (req.user.role !== 'user') {
      res.status(403);
      throw new Error('Only match organizers can reserve stadium slots');
    }

    const stadium = await Stadium.findById(req.params.stadiumId);

    if (!stadium) {
      res.status(404);
      throw new Error('Stadium not found');
    }

    const slot = stadium.slots.id(req.params.slotId);
    if (!slot) {
      res.status(404);
      throw new Error('Slot not found');
    }

    if (slot.isReserved) {
      res.status(400);
      throw new Error('Slot is already reserved');
    }

    slot.isReserved = true;
    await stadium.save();

    const reservation = await Reservation.create({
      user: req.user._id,
      stadium: stadium._id,
      slot: slot._id
    });

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

const getMyReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate('stadium', 'name location slots owner')
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

const cancelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      res.status(404);
      throw new Error('Reservation not found');
    }

    if (reservation.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only cancel your own reservation');
    }

    if (reservation.status === 'cancelled') {
      res.status(400);
      throw new Error('Reservation is already cancelled');
    }

    const stadium = await Stadium.findById(reservation.stadium);
    const slot = stadium ? stadium.slots.id(reservation.slot) : null;

    if (slot) {
      slot.isReserved = false;
      await stadium.save();
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

module.exports = { reserveSlot, getMyReservations, cancelReservation };
