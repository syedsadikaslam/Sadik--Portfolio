const router = require('express').Router();
const Review = require('../models/Review.model');

// GET: Fetch only approved reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add a new review
router.post('/add', async (req, res) => {
  try {
    const { name, review, rating } = req.body;
    if (!name || !review || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newReview = await Review.create({ name, review, rating, isApproved: true });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
