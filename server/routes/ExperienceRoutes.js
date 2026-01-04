// server/routes/ExperienceRoutes.js
const router = require('express').Router();
const Experience = require('../models/experience.model');

// GET: Fetch all experience
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// ADD experience (NO AUTH)
router.post('/add', async (req, res) => {
  try {
    const { role, company, duration, description, type } = req.body;

    const descArray = Array.isArray(description)
      ? description
      : description.split(',').map(d => d.trim());

    await Experience.create({
      role,
      company,
      duration,
      description: descArray,
      type,
    });

    res.json('Experience added!');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// UPDATE experience (NO AUTH)
router.post('/update/:id', async (req, res) => {
  try {
    await Experience.findByIdAndUpdate(req.params.id, {
      role: req.body.role,
      company: req.body.company,
      duration: req.body.duration,
      type: req.body.type,
      description: req.body.description.split(',').map(d => d.trim()),
    });

    res.json('Experience updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// DELETE experience (NO AUTH)
router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json('Experience deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

module.exports = router;
