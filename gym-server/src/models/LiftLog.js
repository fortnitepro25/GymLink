const mongoose = require('mongoose');

const liftLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  liftName: { type: String, required: true },
  weight: { type: Number, required: true },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('LiftLog', liftLogSchema);