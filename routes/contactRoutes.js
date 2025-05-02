const express = require('express');
const router = express.Router();
const { getContacts, createContact } = require('../controllers/contactController');

// GET и POST запросы для /api/contacts
router.route('/')
    .get(getContacts)
    .post(createContact);

module.exports = router;
