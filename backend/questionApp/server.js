const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;
app.use(cors());
// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '%*gWKWo4yjMSHB7zZ.6l3OHSmoE2zUzE6cj7FxnAvDKh/',
    database: 'datatable'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.use(bodyParser.json());

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    const { file } = req;

    // Check if a file was uploaded
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Process the uploaded file and save data to the database
    // (Placeholder: You need to implement the actual logic for parsing the file content
    // and saving it to the 'questionbank' table)

    // Example: Save file details to the database
    const fileName = file.filename;
    const filePath = file.path;

    // Placeholder: Save fileName and filePath to the 'questionbank' table
    // Replace this with your actual database insert logic
    const insertQuery = 'INSERT INTO questionbank (question, option1, option2, option3, option4, correctanswer) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertQuery, [fileName, 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Correct Answer'], (insertErr, result) => {
        if (insertErr) {
            console.error('Error inserting into database:', insertErr);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'File uploaded and data saved to the database successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});