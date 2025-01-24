const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();

// Set up multer for file upload with custom storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination directory for uploaded files
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        // Set the filename to the original name of the file
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Middleware to serve static files (like your HTML and uploads)
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle file upload
app.post('/upload', upload.single('uploaded_file'), function (req, res) {
    // 'uploaded_file' is the name attribute in the form for the file input
    console.log(req.body);  // form fields data
    console.log(req.file);  // uploaded file info, including the original name
    res.send('File uploaded successfully!');
});

// Serve the HTML form to upload files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Upload</title>
</head>
<body>
    <h1>Upload a file</h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="uploaded_file" />
        <button type="submit">Upload</button>
    </form>
</body>
</html>
