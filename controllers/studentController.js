const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');

// Render students page with EJS
const renderStudentsPage = asyncHandler(async (req, res) => {
    const students = await Student.find({}).lean();
    res.render('students', { students });
});

// Get all students as JSON
const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find({}).lean();
    res.json(students);
});

// Create a new student
const createStudent = asyncHandler(async (req, res) => {
    const { name, studentNumber, phoneNumber, age } = req.body;

    if (!name || !studentNumber || !phoneNumber || !age) {
        res.status(400);
        throw new Error('Please provide name, student number, phone number, and age');
    }

    // Check if student with the same student number already exists
    const studentExists = await Student.findOne({ studentNumber });

    if (studentExists) {
        res.status(400);
        throw new Error('Student with this student number already exists');
    }

    const student = await Student.create({
        name,
        studentNumber,
        phoneNumber,
        age: Number(age)
    });

    if (student) {
        // If the request is AJAX, return JSON
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(201).json(student);
        } else {
            // Otherwise redirect back to the students page
            res.redirect('/students');
        }
    } else {
        res.status(400);
        throw new Error('Invalid student data');
    }
});

module.exports = {
    renderStudentsPage,
    getStudents,
    createStudent,
};