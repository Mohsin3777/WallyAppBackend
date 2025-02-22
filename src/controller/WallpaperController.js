const Wallpaper = require('../models/Wallpaper');
const Category = require('../models/Category');

// Get all wallpapers with populated categories
exports.getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.find().populate('categories');
    res.json(wallpapers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload a new wallpaper
exports.uploadWallpaper = async (req, res) => {
  const { title, description, src, photographer, alt, categories } = req.body;

  try {
    // Check if categories exist
    const categoryIds = await Promise.all(
      categories.map(async (categoryId) => {
        const category = await Category.findById(categoryId);
        if (!category) throw new Error(`Category ${categoryId} not found`);
        return categoryId;
      })
    );

    const newWallpaper = new Wallpaper({
      title,
      description,
      src,
      photographer,
      alt,
      categories: categoryIds,
    });

    const savedWallpaper = await newWallpaper.save();
    res.status(201).json(savedWallpaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};