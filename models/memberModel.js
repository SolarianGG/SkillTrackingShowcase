const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        age: {
            type: Number,
            required: [true, 'Please add an age'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        avatar: {
            type: String,
            required: [true, 'Please add a profile picture'],
        }
    },
    {
        timestamps: true,
    }
    );

module.exports = mongoose.model('Member', memberSchema);