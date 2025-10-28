const asyncHandler = require('express-async-handler');

const Skill = require('../models/skillModel');
const Category = require('../models/categoryModel');

const renderSkillsPage = asyncHandler(async (req, res) => {
    const skills = await Skill.find({ user: req.session.user._id })
        .populate('category')
        .lean();

    const categories = await Category.find({ user: req.session.user._id }).lean();

    res.render('skills', { 
        skills, 
        categories,
        user: req.session.user 
    });
});

const renderSkillDetailPage = asyncHandler(async (req, res) => {
    const skill = await Skill.findById(req.params.id)
        .populate('category')
        .lean();

    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check if the skill belongs to the logged-in user
    if (skill.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to view this skill');
    }

    const categories = await Category.find({ user: req.session.user._id }).lean();

    res.render('skillDetail', { 
        skill, 
        categories,
        user: req.session.user 
    });
});

const createSkill = asyncHandler(async (req, res) => {
    const { 
        name, 
        description, 
        proficiencyLevel, 
        goals, 
        category 
    } = req.body;

    if (!name || !category) {
        res.status(400);
        throw new Error('Please provide name and category');
    }

    const skill = await Skill.create({
        name,
        description,
        proficiencyLevel,
        goals: [],
        category,
        user: req.session.user._id
    });

    if (skill) {
        res.redirect('/skills');
    } else {
        res.status(400);
        throw new Error('Invalid skill data');
    }
});

const updateSkill = asyncHandler(async (req, res) => {
    const { 
        name, 
        description, 
        proficiencyLevel, 
        category 
    } = req.body;

    if (!name || !category) {
        res.status(400);
        throw new Error('Please provide name and category');
    }

    // Check if the skill exists
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check if the skill belongs to the logged-in user
    if (skill.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this skill');
    }

    // Update the skill
    skill.name = name;
    skill.description = description;
    skill.proficiencyLevel = proficiencyLevel;
    // Don't update goals here - they are managed separately
    skill.category = category;

    // Calculate progress based on completed goals
    if (skill.goals.length > 0) {
        const completedGoals = skill.goals.filter(goal => goal.completed).length;
        skill.progress = Math.round((completedGoals / skill.goals.length) * 100);
    } else {
        skill.progress = 0;
    }
    skill.category = category;

    await skill.save();

    res.redirect(`/skills/${skill._id}`);
});

const deleteSkill = asyncHandler(async (req, res) => {
    // Check if the skill exists
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check if the skill belongs to the logged-in user
    if (skill.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this skill');
    }

    // Delete the skill
    await Skill.findByIdAndDelete(req.params.id);

    res.redirect('/skills');
});

const addResource = asyncHandler(async (req, res) => {
    const { title, url, type, description } = req.body;

    if (!title || !url) {
        res.status(400);
        throw new Error('Please provide title and URL for the resource');
    }

    // Check if the skill exists
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check if the skill belongs to the logged-in user
    if (skill.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this skill');
    }

    // Add the resource
    skill.resources.push({
        title,
        url,
        type,
        description
    });

    await skill.save();

    res.redirect(`/skills/${skill._id}`);
});

const removeResource = asyncHandler(async (req, res) => {
    // Check if the skill exists
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check if the skill belongs to the logged-in user
    if (skill.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this skill');
    }

    // Remove the resource
    skill.resources = skill.resources.filter(
        resource => resource._id.toString() !== req.params.resourceId
    );

    await skill.save();

    res.redirect(`/skills/${skill._id}`);
});

const toggleGoalCompletion = asyncHandler(async (req, res) => {
    // Check if the skill exists
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check if the skill belongs to the logged-in user
    if (skill.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this skill');
    }

    const goalIndex = parseInt(req.params.goalIndex);

    // Check if the goal exists
    if (goalIndex < 0 || goalIndex >= skill.goals.length) {
        res.status(404);
        throw new Error('Goal not found');
    }

    // Toggle the completion status
    skill.goals[goalIndex].completed = !skill.goals[goalIndex].completed;

    // Calculate progress based on completed goals
    if (skill.goals.length > 0) {
        const completedGoals = skill.goals.filter(goal => goal.completed).length;
        skill.progress = Math.round((completedGoals / skill.goals.length) * 100);
    } else {
        skill.progress = 0;
    }

    await skill.save();

    res.redirect(`/skills/${skill._id}`);
});

const addGoal = asyncHandler(async (req, res) => {
    const { goalText } = req.body;

    if (!goalText) {
        res.status(400);
        throw new Error('Please provide goal text');
    }

    // Check if the skill exists
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Check if the skill belongs to the logged-in user
    if (skill.user.toString() !== req.session.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this skill');
    }

    // Add the goal
    skill.goals.push({
        text: goalText,
        completed: false
    });

    // Recalculate progress
    if (skill.goals.length > 0) {
        const completedGoals = skill.goals.filter(goal => goal.completed).length;
        skill.progress = Math.round((completedGoals / skill.goals.length) * 100);
    }

    await skill.save();

    res.redirect(`/skills/${skill._id}`);
});

module.exports = {
    renderSkillsPage,
    renderSkillDetailPage,
    createSkill,
    updateSkill,
    deleteSkill,
    addResource,
    removeResource,
    toggleGoalCompletion,
    addGoal
};
