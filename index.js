require('dotenv').config();
const express = require('express');
const cors = require('cors');



const multer = require('multer');
const app = express();

// Middleware setup
app.use(cors());  // Enable CORS for all origins
app.use(express.static('public')); // Serve static files from public directory

// Set up Multer for file uploads (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve the index page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint to handle file uploads and return metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Extract file metadata without file-type
  const { originalname, size } = req.file;

  // Return file metadata as a JSON response
  res.json({
    name: originalname,
    type: 'Unknown',  // No file type detection
    size: size
  });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
