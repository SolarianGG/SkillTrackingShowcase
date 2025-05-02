const express = require('express');
const router = express.Router();
const { getStudents, createStudent } = require('../controllers/studentController');

// These routes are for API access if needed
router.route('/students')
    .get(getStudents);

router.route('/new')
    .post(createStudent);

module.exports = router;
