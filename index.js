

const express = require('express')
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
const postRoutes = require('./src/routes/posts')
const usersRoutes = require('./src/routes/users')
const uploadRoutes = require('.src/routes/upload'); // Added upload path for processing files during post creation




// Load environment variables

dotenv.config();

const app = express();

app.use(express.json());

// use the routes

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/users', usersRoutes);
app.use('/upload', uploadRoutes);   //Added upload path for processing files during post creation

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})