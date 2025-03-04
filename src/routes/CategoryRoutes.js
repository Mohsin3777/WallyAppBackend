const express = require('express');
const categoryController = require('../controllers/CategoryController');

const router = express.Router();

// Category routes
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.patch('/update', categoryController.updateCategory);

module.exports = router;