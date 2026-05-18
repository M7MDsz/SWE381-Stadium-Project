const Stadium = require('../models/Stadium');
const Reservation = require('../models/Reservation');

const splitTextList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(',').map((item) => item.trim()).filter(Boolean);
};

const getStadiums = async (req, res, next) => {
  try {
    const { location, date, time } = req.query;
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    if (date || time) {
      filter.slots = {
        $elemMatch: {
          isReserved: false,
          ...(date ? { date } : {}),
          ...(time ? { startTime: time } : {})
        }
      };
    }

    const stadiums = await Stadium.find(filter).populate('owner', 'name email');
    res.json(stadiums);
  } catch (error) {
    next(error);
  }
};

const getMyStadiums = async (req, res, next) => {
  try {
    const stadiums = await Stadium.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(stadiums);
  } catch (error) {
    next(error);
  }
};

const getStadiumById = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.id).populate('owner', 'name email');

    if (!stadium) {
      res.status(404);
      throw new Error('Stadium not found');
    }

    res.json(stadium);
  } catch (error) {
    next(error);
  }
};

const createStadium = async (req, res, next) => {
  try {
    const stadium = await Stadium.create({
      owner: req.user._id,
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      photos: splitTextList(req.body.photos),
      facilities: splitTextList(req.body.facilities)
    });

    res.status(201).json(stadium);
  } catch (error) {
    next(error);
  }
};

const addSlot = async (req, res, next) => {
  try {
    const stadium = await Stadium.findById(req.params.id);

    if (!stadium) {
      res.status(404);
      throw new Error('Stadium not found');
    }

    if (stadium.owner.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('You can only update your own stadium');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastDay = new Date(today);
    lastDay.setDate(today.getDate() + 7);
    const requestedDate = new Date(req.body.date);

    if (requestedDate < today || requestedDate > lastDay) {
      res.status(400);
      throw new Error('Slot date must be within the upcoming 7 days');
    }

    stadium.slots.push({
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime
    });

    await stadium.save();
    res.status(201).json(stadium);
  } catch (error) {
    next(error);
  }
};

const getOwnerStats = async (req, res, next) => {
  try {
    const stadiums = await Stadium.find({ owner: req.user._id });
    const stadiumIds = stadiums.map((stadium) => stadium._id);
    const activeReservations = await Reservation.countDocuments({ stadium: { $in: stadiumIds }, status: 'active' });
    const cancelledReservations = await Reservation.countDocuments({ stadium: { $in: stadiumIds }, status: 'cancelled' });
    const totalSlots = stadiums.reduce((sum, stadium) => sum + stadium.slots.length, 0);
    const reservedSlots = stadiums.reduce(
      (sum, stadium) => sum + stadium.slots.filter((slot) => slot.isReserved).length,
      0
    );

    res.json({
      stadiumCount: stadiums.length,
      totalSlots,
      reservedSlots,
      availableSlots: totalSlots - reservedSlots,
      activeReservations,
      cancelledReservations
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStadiums,
  getMyStadiums,
  getStadiumById,
  createStadium,
  addSlot,
  getOwnerStats
};
