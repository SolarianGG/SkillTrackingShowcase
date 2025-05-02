const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// API endpoint to get contacts as JSON (keeping for backward compatibility)
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).lean();
    res.json(contacts);
});

// New function to render contacts page with EJS
const renderContactsPage = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).lean();
    res.render('index', { contacts });
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('Please provide name, email, and phone');
    }

    // Проверка существования контакта с таким же email
    const contactExists = await Contact.findOne({ email });

    if (contactExists) {
        res.status(400);
        throw new Error('Contact already exists');
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });

    if (contact) {
        // If the request is AJAX, return JSON
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(201).json(contact);
        } else {
            // Otherwise redirect back to the contacts page
            res.redirect('/contacts');
        }
    } else {
        res.status(400);
        throw new Error('Invalid contact data');
    }
});

module.exports = {
    getContacts,
    createContact,
    renderContactsPage,
};
