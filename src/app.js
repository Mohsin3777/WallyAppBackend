const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const categoryRoutes = require('./routes/categoryRoutes');
const wallpaperRoutes = require('./routes/WallpaperRoutes');

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/wallpapers', wallpaperRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Wallpaper App Backend!');
});

// Export the app
module.exports = app;