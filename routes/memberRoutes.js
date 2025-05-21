const express = require('express');

const router = express.Router();

const {
    renderMembersPage, 
    createMember, 
    renderMemberDetailPage, 
    updateMember, 
    deleteMember
} = require('../controllers/memberController');

router.route('/members').get(renderMembersPage).post(createMember);

router.route('/members/:id').get(renderMemberDetailPage);

// Add routes for updating and deleting members
router.route('/members/:id/update').post(updateMember);
router.route('/members/:id/delete').post(deleteMember);

module.exports = router;
