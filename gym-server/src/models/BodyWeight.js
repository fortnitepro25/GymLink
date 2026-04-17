const mongoose = require('mongoose');

const bodyWeightSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // we'll add auth later
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('BodyWeight', bodyWeightSchema);