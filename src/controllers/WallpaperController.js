const Wallpaper = require('../models/Wallpaper');
const Category = require('../models/Category');

// Get all wallpapers with populated categories
exports.getAllWallpapers = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query; // Default limit: 10, offset: 0

    // Convert limit and offset to numbers
    const limitNum = parseInt(limit, 10);
    const offsetNum = parseInt(offset, 10);

    // Fetch wallpapers with pagination
    const wallpapers = await Wallpaper.find()
      .populate('categories')
      .skip(offsetNum)
      .limit(limitNum);

    // Get the total count of wallpapers (for frontend pagination)
    const totalWallpapers = await Wallpaper.countDocuments();

    return res.json({
      message: 'Successfully fetched wallpapers',
      success: true,
      data: wallpapers,
      pagination: {
        total: totalWallpapers,
        limit: limitNum,
        offset: offsetNum,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
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

    return res.json({
      message:"Sucessfully upload wallpaper",
      success:true,
      data:savedWallpaper});
  } catch (err) {
    return   res.status(500).json({ message: err.message, success:false, });
  }
};



exports.increaseDownloadCount = async (req, res) => {
  const { id } = req.query;

  try {
    const wallpaper = await Wallpaper.findById(id).populate('categories');
    if (!wallpaper) {
      return res.status(404).json({ message: 'Wallpaper not found' });
    }

    wallpaper.downloads += 1; // Increment the download count
    const updatedWallpaper = await wallpaper.save();

    return res.json({
      message:"Sucessfully update download",
      success:true,
      data:updatedWallpaper});
  } catch (err) {
    res.status(500).json({ message: err.message, success:false, });
  }
};





// Get top downloaded wallpapers
exports.getTopDownloadedWallpapers = async (req, res) => {
  try {
    const { limit = 10 } = req.query; // Default limit: 10

    // Convert limit to a number
    const limitNum = parseInt(limit, 10);

    // Fetch top downloaded wallpapers
    const topWallpapers = await Wallpaper.find()
      .sort({ downloads: -1 }) // Sort by downloads in descending order
      .limit(limitNum) // Limit the number of results
      .populate('categories'); // Populate categories if needed

    res.json({
      message: 'Successfully fetched top downloaded wallpapers',
      success: true,
      data: topWallpapers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};



// Get wallpapers by category
const mongoose = require('mongoose');

exports.getWallpapersByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query; // Category ID from query params
    const { limit = 10, offset = 0 } = req.query; // Pagination parameters

    // Validate categoryId
    if (!mongoose.isValidObjectId(categoryId)) {
      return res.status(400).json({
        message: 'Invalid category ID',
        success: false,
      });
    }

    // Convert limit and offset to numbers
    const limitNum = parseInt(limit, 10);
    const offsetNum = parseInt(offset, 10);

    // Fetch wallpapers for the specified category
    const wallpapers = await Wallpaper.find({ categories: categoryId })
      .skip(offsetNum) // Skip the first 'offset' documents
      .limit(limitNum) // Limit the number of documents returned
      .populate('categories'); // Populate category details

    // Get the total count of wallpapers in this category
    const totalWallpapers = await Wallpaper.countDocuments({ categories: categoryId });

    res.json({
      message: 'Successfully fetched wallpapers by category',
      success: true,
      data: wallpapers,
      pagination: {
        total: totalWallpapers, // Total number of wallpapers in this category
        limit: limitNum,       // Number of wallpapers returned
        offset: offsetNum,     // Number of wallpapers skipped
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};