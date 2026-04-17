const express = require('express');
const router = express.Router();
const BodyWeight = require('../models/BodyWeight');
const LiftLog = require('../models/LiftLog');


// Get all body weights
router.get('/bodyweight', async (req, res) => {
  try {
    const weights = await BodyWeight.find().sort({ date: 1 });
    res.json(weights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add body weight
router.post('/bodyweight', async (req, res) => {
  try {
    const { weight } = req.body;
    const newWeight = new BodyWeight({
      userId: "67f1234567890abcdef12345", // placeholder
      weight
    });
    await newWeight.save();
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all lift logs
router.get('/lifts', async (req, res) => {
  try {
    const lifts = await LiftLog.find().sort({ date: 1 });
    res.json(lifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/lifts', async (req, res) => {
  try {
    const { liftName, weight } = req.body;
    const newLift = new LiftLog({
      userId: "67f1234567890abcdef12345", // placeholder
      liftName,
      weight
    });
    await newLift.save();
    res.status(201).json(newLift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;