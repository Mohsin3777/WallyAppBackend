const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Import routes
const categoryRoutes = require('./src/routes/categoryRoutes');
const wallpaperRoutes = require('./src/routes/WallpaperRoutes');

// Use routes
app.use('/api/categories', categoryRoutes);
app.use('/api/wallpapers', wallpaperRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Wallpaper App Backend!');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
