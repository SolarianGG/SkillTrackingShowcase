const asyncHandler = require('express-async-handler');

const Member = require('../models/memberModel');

const renderMembersPage = asyncHandler(async (req, res) => {
    const members = await Member.find({}).lean();
    res.render('members', {members});
})

const renderMemberDetailPage = asyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id).lean();
    res.render('memberDetail', {member});
})

const createMember = asyncHandler(async (req, res) => {
    const {name, age, email, phone, avatar} = req.body;
    if (!name || !age || !email || !phone || !avatar) {
        res.status(400);
        throw new Error('Please provide name, age, email, phone, and avatar');
    }
    const studentExists = await Member.findOne({email});
    if (studentExists) {
        res.status(400);
        throw new Error('Member with this email already exists');
    }
    const member = await Member.create({
        name,
        age: Number(age),
        email,
        phone,
        avatar
    })

    if (member) {
        res.redirect('/members');
    } else {
        res.status(400);
        throw new Error('Invalid member data');
    }
})

// Update a member
const updateMember = asyncHandler(async (req, res) => {
    const { name, age, email, phone, avatar } = req.body;

    if (!name || !age || !email || !phone || !avatar) {
        res.status(400);
        throw new Error('Please provide name, age, email, phone, and avatar');
    }

    // Check if the member exists
    const member = await Member.findById(req.params.id);
    if (!member) {
        res.status(404);
        throw new Error('Member not found');
    }

    // Check if email is already taken by another member
    if (email !== member.email) {
        const emailExists = await Member.findOne({ email });
        if (emailExists) {
            res.status(400);
            throw new Error('Member with this email already exists');
        }
    }

    // Update the member
    member.name = name;
    member.age = Number(age);
    member.email = email;
    member.phone = phone;
    member.avatar = avatar;

    await member.save();

    res.status(200).json({ success: true, message: 'Member updated successfully' });
})

// Delete a member
const deleteMember = asyncHandler(async (req, res) => {
    // Check if the member exists
    const member = await Member.findById(req.params.id);
    if (!member) {
        res.status(404);
        throw new Error('Member not found');
    }

    // Delete the member
    await Member.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Member deleted successfully' });
})

module.exports = {
    renderMembersPage,
    renderMemberDetailPage,
    createMember,
    updateMember,
    deleteMember
}
