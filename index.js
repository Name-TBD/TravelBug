import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';
import postRoutes from './src/routes/posts.js';
import usersRoutes from './src/routes/users.js';
import uploadRoutes from './src/routes/upload.js'; // Corrected the upload path
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: 'https://travelbugthugs.netlify.app' }));
app.use(express.json());

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Use the routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/users', usersRoutes);
app.use('/upload', uploadRoutes); // Corrected the upload path

// Fallback to index.html for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
