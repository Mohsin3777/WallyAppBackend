const app = require('./src/app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const serverless = require("serverless-http");

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI
  
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// module.exports.handler = serverless(app);
