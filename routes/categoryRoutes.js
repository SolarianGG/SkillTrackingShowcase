const express = require('express');
const { 
    renderCategoriesPage,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All category routes should be protected
router.use(protect);

// Categories main page
router.route('/categories')
    .get(renderCategoriesPage)
    .post(createCategory);

// Update and delete category
router.route('/categories/:id/update')
    .post(updateCategory);

router.route('/categories/:id/delete')
    .post(deleteCategory);

module.exports = router;