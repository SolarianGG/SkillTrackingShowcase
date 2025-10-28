const asyncHandler = require('express-async-handler');

const UserModel = require('../models/userModel');


const getLoginPage = asyncHandler(async (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('login');
});


const loginToAccount = asyncHandler(async (req, res) => {
    const {login, password} = req.body;

    if (!login || !password) {
        res.status(400);
        throw new Error('invalid login');
    }

    const user = await UserModel.findOne({ login }).lean();
    if (!user) {
        return res.render('login', { error: 'Incorrect login' });
    }

    if (user.password !== password) {
        return res.render('login', { error: 'Incorrect password' });
    }

    req.session.user = {
        _id: user._id,
        login: user.login,
        createdAt: user.createdAt,
        skills: user.skills
    };

    res.redirect('/');
});


const getRegisterPage = asyncHandler(async (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('register');
});


const registerUser = asyncHandler(async (req, res) => {
    const {login, password} = req.body;

    if (!login || !password) {
        return res.render('register', { error: 'Please fill in all fields' });
    }

    const userExists = await UserModel.findOne({ login });
    if (userExists) {
        return res.render('register', { error: 'User already exists' });
    }

    const user = await UserModel.create({
        login,
        password,
    });

    if (user) {
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


const logout = asyncHandler(async (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = {
    getLoginPage,
    loginToAccount,
    getRegisterPage,
    registerUser,
    logout
};
