// server/routes/ProjectRoutes.js
const router = require('express').Router();
const Project = require('../models/project.model');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary helper
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// GET all projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// ADD project (NO AUTH)
router.post('/add', upload.single('snapshot'), async (req, res) => {
  try {
    let snapshotUrl = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      snapshotUrl = result.secure_url;
    }

    await Project.create({
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies
        ? req.body.technologies.split(',').map(t => t.trim())
        : [],
      liveUrl: req.body.liveUrl,
      githubUrl: req.body.githubUrl,
      featured: req.body.featured === 'true',
      snapshotUrl,
    });

    res.json('Project added!');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// UPDATE project (NO AUTH)
router.post('/update/:id', upload.single('snapshot'), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies
        ? req.body.technologies.split(',').map(t => t.trim())
        : [],
      liveUrl: req.body.liveUrl,
      githubUrl: req.body.githubUrl,
      featured: req.body.featured === 'true',
    };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.snapshotUrl = result.secure_url;
    }

    await Project.findByIdAndUpdate(req.params.id, updateData);
    res.json('Project updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

// DELETE project (NO AUTH)
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json('Project deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

module.exports = router;
