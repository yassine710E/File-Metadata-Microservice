require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Set up multer for file handling
const upload = multer({ dest: 'uploads/' });

// Enable CORS
app.use(cors());
app.use(express.static('public'));

// Serve the index.html page
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload API endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract file metadata
  const filePath = path.join(__dirname, req.file.path);

  // Return the file metadata as JSON
  res.json({
    name: req.file.originalname,   // File name
    type: req.file.mimetype || 'Unknown',  // MIME type (if available)
    size: req.file.size            // File size in bytes
  });

  // Optionally, delete the file after processing (to avoid cluttering the uploads folder)
  fs.unlinkSync(filePath);
});

// Listen on the configured port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
