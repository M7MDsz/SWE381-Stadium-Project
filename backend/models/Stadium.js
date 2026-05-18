const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isReserved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const stadiumSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    photos: [{ type: String }],
    facilities: [{ type: String }],
    slots: [slotSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stadium', stadiumSchema);
