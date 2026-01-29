const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  isApproved: { type: Boolean, default: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
