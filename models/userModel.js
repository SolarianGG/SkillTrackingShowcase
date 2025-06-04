const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: [true, 'Please add a login'],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        skills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Skill',
            }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);