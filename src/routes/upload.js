import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ fileUrl: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'File upload failed.' });
  }
});

export default router;
