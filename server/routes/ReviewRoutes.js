// server/routes/ReviewRoutes.js
const router = require('express').Router();
const Review = require('../models/Review.model');

// ===============================
// GET: Fetch all reviews (Public)
// ===============================
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================================
// POST: Add a new review (Public)
// =====================================
router.post('/add', async (req, res) => {
  try {
    const { name, review, rating } = req.body;

    if (!name || !review || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newReview = await Review.create({
      name,
      review,
      rating,
    });

    // return saved review (frontend needs this)
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
