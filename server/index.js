// server/index.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// Middleware
// --------------------
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
  })
);
app.use(express.json());

// --------------------
// Routes
// --------------------
const projectsRouter = require('./routes/ProjectRoutes');
const experienceRouter = require('./routes/ExperienceRoutes');
const mediumRouter = require('./routes/MediumRoutes');
const reviewRouter = require('./routes/ReviewRoutes'); // ✅ ADD THIS

// --------------------
// MongoDB Connection
// --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --------------------
// Test Route
// --------------------
app.get('/', (req, res) => {
  res.send('Portfolio API is running!');
});

// --------------------
// API Routes
// --------------------
app.use('/api/projects', projectsRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/medium', mediumRouter);
app.use('/api/reviews', reviewRouter); // ✅ THIS FIXES 404

// --------------------
// Server Start
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
