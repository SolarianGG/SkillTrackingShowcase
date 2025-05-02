const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const { renderStudentsPage, createStudent } = require('./controllers/studentController');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data

app.use(express.static(path.join(__dirname, 'public')));

// API routes if needed
app.use('/api', studentRoutes);

// Main route for students page
app.get('/students', renderStudentsPage);

// Handle new student submissions
app.post('/new', createStudent);

// Root route redirect to students
app.get('/', (req, res) => {
    res.redirect('/students');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
