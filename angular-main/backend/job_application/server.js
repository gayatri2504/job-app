const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize SQLite database
const dbPath = path.join(__dirname, 'applications.db');
const db = new Database(dbPath);

console.log(`✅ Database initialized at: ${dbPath}`);

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    companyName TEXT,
    email TEXT,
    mobile TEXT,
    dob TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    pincode TEXT,
    resume TEXT,
    submittedAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Route: Submit job application
app.post('/api/apply', (req, res) => {
  console.log("📥 Incoming application:", req.body);

  const {
    fullName,
    companyName,
    email,
    mobile,
    dob,
    city,
    state,
    country,
    pincode,
    resume
  } = req.body;

  if (!fullName || !email || !mobile) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO job_applications 
      (fullName, companyName, email, mobile, dob, city, state, country, pincode, resume)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      fullName,
      companyName,
      email,
      mobile,
      dob,
      city,
      state,
      country,
      pincode,
      resume
    );

    console.log(`✅ Application stored for ${fullName}`);
    res.status(200).json({ message: 'Application stored successfully!' });
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    res.status(500).json({ message: 'Failed to save application' });
  }
});

// Route: Get all applications
app.get('/api/applications', (req, res) => {
  try {
    const apps = db.prepare('SELECT * FROM job_applications ORDER BY submittedAt DESC').all();
    res.json(apps);
  } catch (err) {
    console.error('❌ Fetch Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
