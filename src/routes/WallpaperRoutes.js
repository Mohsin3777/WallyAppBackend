const express = require('express');
const wallpaperController = require('../controllers/wallpaperController');

const router = express.Router();

// Wallpaper routes
router.get('/', wallpaperController.getAllWallpapers);
router.post('/upload', wallpaperController.uploadWallpaper);

module.exports = router;