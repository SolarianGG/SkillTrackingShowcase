const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        studentNumber: {
            type: String,
            required: [true, 'Please add a student number'],
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        age: {
            type: Number,
            required: [true, 'Please add an age'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Student', studentSchema);