const express = require('express');
const { 
    renderSkillsPage,
    renderSkillDetailPage,
    createSkill,
    updateSkill,
    deleteSkill,
    addResource,
    removeResource,
    toggleGoalCompletion,
    addGoal
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All skill routes should be protected
router.use(protect);

// Skills main page
router.route('/skills')
    .get(renderSkillsPage)
    .post(createSkill);

// Skill detail page
router.route('/skills/:id')
    .get(renderSkillDetailPage);

// Update and delete skill
router.route('/skills/:id/update')
    .post(updateSkill);

router.route('/skills/:id/delete')
    .post(deleteSkill);

// Resource management
router.route('/skills/:id/resources')
    .post(addResource);

router.route('/skills/:id/resources/:resourceId/delete')
    .post(removeResource);

// Goal management
router.route('/skills/:id/goals')
    .post(addGoal);

router.route('/skills/:id/goals/:goalIndex/toggle')
    .post(toggleGoalCompletion);

module.exports = router;
