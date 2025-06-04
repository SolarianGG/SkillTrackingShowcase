const asyncHandler = require('express-async-handler');

const Category = require('../models/categoryModel');
const Skill = require('../models/skillModel');

// @desc    Render categories page
// @route   GET /categories
// @access  Private
const renderCategoriesPage = asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.session.user._id }).lean();
    
    res.render('categories', { 
        categories,
        user: req.session.user 
    });
});

// @desc    Create a new category
// @route   POST /categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        res.status(400);
        throw new Error('Please provide a category name');
    }
    
    // Check if category with the same name already exists for this user
    const categoryExists = await Category.findOne({ 
        name, 
        user: req.session.user._id 
    });
    
    if (categoryExists) {
        res.status(400);
        throw new Error('Category with this name already exists');
    }
    
    // Create the category
    const category = await Category.create({
        name,
        description,
        user: req.session.user._id
    });
    
    if (category) {
        res.redirect('/categories');
    } else {
        res.status(400);
        throw new Error('Invalid category data');
    }
});

// @desc    Update a category
// @route   POST /categories/:id/update
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    
    if (!name) {
        res.status(400);
        throw new Error('Please provide a category name');
    }
    
    // Check if the category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    
    // Check if the category belongs to the logged-in user
    if (category.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this category');
    }
    
    // Check if another category with the same name already exists for this user
    if (name !== category.name) {
        const categoryExists = await Category.findOne({ 
            name, 
            user: req.session.user._id 
        });
        
        if (categoryExists) {
            res.status(400);
            throw new Error('Category with this name already exists');
        }
    }
    
    // Update the category
    category.name = name;
    category.description = description;
    
    await category.save();
    
    res.redirect('/categories');
});

// @desc    Delete a category
// @route   POST /categories/:id/delete
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
    // Check if the category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(404);
        throw new Error('Category not found');
    }
    
    // Check if the category belongs to the logged-in user
    if (category.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this category');
    }
    
    // Check if there are skills using this category
    const skillsWithCategory = await Skill.countDocuments({ 
        category: req.params.id,
        user: req.session.user._id
    });
    
    if (skillsWithCategory > 0) {
        res.status(400);
        throw new Error('Cannot delete category that is being used by skills');
    }
    
    // Delete the category
    await Category.findByIdAndDelete(req.params.id);
    
    res.redirect('/categories');
});

module.exports = {
    renderCategoriesPage,
    createCategory,
    updateCategory,
    deleteCategory
};