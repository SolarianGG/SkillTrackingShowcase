const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const memberRoutes = require('./routes/memberRoutes');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})

app.use(memberRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
