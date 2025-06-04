const express = require('express');
const { 
    getLoginPage, 
    loginToAccount, 
    getRegisterPage, 
    registerUser,
    getProfile,
    logout
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Login routes
router.get('/login', getLoginPage);
router.post('/login', loginToAccount);

// Registration routes
router.get('/register', getRegisterPage);
router.post('/register', registerUser);

// Profile route (protected)
router.get('/profile', protect, getProfile);

// Logout route
router.get('/logout', logout);

module.exports = router;
