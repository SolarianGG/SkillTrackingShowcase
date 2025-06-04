const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel');

// @desc    Render login page
// @route   GET /login
// @access  Public
const getLoginPage = asyncHandler(async (req, res) => {
    // If user is already logged in, redirect to home
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('login');
});

// @desc    Login to account
// @route   POST /login
// @access  Public
const loginToAccount = asyncHandler(async (req, res) => {
    const {login, password} = req.body;

    if (!login || !password) {
        res.status(400);
        throw new Error('invalid login');
    }

    const user = await UserModel.findOne({ login }).lean();
    if (!user) {
        return res.render('login', { error: 'Неправильный логин' });
    }

    if (user.password !== password) {
        return res.render('login', { error: 'Неправильный пароль' });
    }

    // Store user in session
    req.session.user = {
        _id: user._id,
        login: user.login,
        createdAt: user.createdAt,
        skills: user.skills
    };

    res.redirect('/');
});

// @desc    Render registration page
// @route   GET /register
// @access  Public
const getRegisterPage = asyncHandler(async (req, res) => {
    // If user is already logged in, redirect to home
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('register');
});

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {login, password} = req.body;

    if (!login || !password) {
        return res.render('register', { error: 'Please fill in all fields' });
    }

    // Check if user already exists
    const userExists = await UserModel.findOne({ login });
    if (userExists) {
        return res.render('register', { error: 'User already exists' });
    }

    // Create user
    const user = await UserModel.create({
        login,
        password,
    });

    if (user) {
        // Store user in session
        req.session.user = {
            _id: user._id,
            login: user.login,
            createdAt: user.createdAt,
            skills: user.skills
        };

        res.status(201).redirect('/');
    } else {
        return res.render('register', { error: 'Invalid user data' });
    }
});

// @desc    Get user profile
// @route   GET /profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.session.user._id).lean();

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.render('user', { user });
});

// @desc    Logout user
// @route   GET /logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = {
    getLoginPage,
    loginToAccount,
    getRegisterPage,
    registerUser,
    getProfile,
    logout
};
