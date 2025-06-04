const mongoose = require("mongoose");

// Resource schema for links to videos, articles, books, etc.
const resourceSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title for the resource'],
        },
        url: {
            type: String,
            required: [true, 'Please add a URL for the resource'],
        },
        type: {
            type: String,
            enum: ['video', 'article', 'book', 'course', 'other'],
            default: 'other',
        },
        description: String,
    },
    { _id: true }
);

const skillSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name of the skill'],
        },
        description: String,
        proficiencyLevel: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'expert'],
            default: 'beginner',
        },
        goals: [{
            text: String,
            completed: {
                type: Boolean,
                default: false
            }
        }],
        progress: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Please select a category for this skill'],
        },
        resources: [resourceSchema],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Skill', skillSchema);
