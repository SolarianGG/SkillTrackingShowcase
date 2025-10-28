const express = require('express');
const { 
    getLoginPage, 
    loginToAccount, 
    getRegisterPage, 
    registerUser,
    logout
} = require('../controllers/userController');
const router = express.Router();

// Login routes
router.get('/login', getLoginPage);
router.post('/login', loginToAccount);

// Registration routes
router.get('/register', getRegisterPage);
router.post('/register', registerUser);

// Logout route
router.get('/logout', logout);

module.exports = router;
