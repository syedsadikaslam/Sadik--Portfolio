require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:3000", "https://sadikaslam.in"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// Routes Import
const projectsRouter = require('./routes/ProjectRoutes');
const experienceRouter = require('./routes/ExperienceRoutes');
const mediumRouter = require('./routes/MediumRoutes');
const reviewRouter = require('./routes/ReviewRoutes');

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/medium', mediumRouter);
app.use('/api/reviews', reviewRouter);

app.get('/', (req, res) => res.send('Portfolio API is running!'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
