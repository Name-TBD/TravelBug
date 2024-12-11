const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const postRoutes = require('./src/routes/posts');
const usersRoutes = require('./src/routes/users');
const uploadRoutes = require('./src/routes/upload'); // Corrected the upload path

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'https://travelbugthugs.netlify.app' })); 
app.use(express.json());

// Use the routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/users', usersRoutes);
app.use('/upload', uploadRoutes); // Corrected the upload path

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
