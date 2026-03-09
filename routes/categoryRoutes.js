const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Public routes
router.get('/', getCategories);

// Protected routes (Admin only)
router.post('/', protect, admin, upload.single('image'), createCategory);
router.put('/:id', protect, admin, upload.single('image'), updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
