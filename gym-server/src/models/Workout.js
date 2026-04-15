const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
  exercise: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  notes: String,
});

module.exports = mongoose.model("Workout", workoutSchema);
