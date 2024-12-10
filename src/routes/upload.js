//## Upload.js is essential for handling file upload from your front end code.
    //ran npm install multer. see package.json
    //Double check upload route added to Express App, index.js file. 
    //This is a backend route. 

const express = require('express');
const multer = require('multer');
const path = require('path');

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

module.exports = router;
