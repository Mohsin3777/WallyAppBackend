const mongoose = require('mongoose');

const wallpaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  src: {
    large2x: { type: String, required: true }, // Matching the frontend structure
  },
  photographer: { type: String, required: true },
  alt: { type: String, required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Reference to Category model
  downloads: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Wallpaper', wallpaperSchema);