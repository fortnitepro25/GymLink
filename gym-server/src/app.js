const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "GymLink server running" });
});

module.exports = app;