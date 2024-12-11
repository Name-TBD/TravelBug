import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save files
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName); // Generate unique file name
  },
});

const upload = multer({ storage });

// Route for handling file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const fileUrl = `/uploads/${req.file.filename}`; // URL to access the file
    res.status(200).json({ fileUrl });
  } catch (err) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

export default router;
