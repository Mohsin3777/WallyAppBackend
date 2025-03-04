const express = require('express');
const wallpaperController = require('../controllers/wallpaperController');

const router = express.Router();

// Wallpaper routes
router.get('/', wallpaperController.getAllWallpapers);
router.post('/upload', wallpaperController.uploadWallpaper);
router.patch('/increaseDownloadCount', wallpaperController.increaseDownloadCount); // New route
router.get('/top-downloaded', wallpaperController.getTopDownloadedWallpapers); // New route
router.get('/category', wallpaperController.getWallpapersByCategory); // New route


module.exports = router;