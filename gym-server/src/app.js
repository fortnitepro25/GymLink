const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gymRoutes = require('./routes/gymRoutes');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"]
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "GymLink server running - Ready for tracking & chat" });
});

// Gym tracking routes
app.use('/api/gym', gymRoutes);

module.exports = app;