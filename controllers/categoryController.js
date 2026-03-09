const Category = require('../models/Category');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    throw error;
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Upload image to Cloudinary if provided
    let imageUrl = image;
    if (req.file) {
      try {
        const uploaded = await uploadToCloudinary(req.file.path);
        imageUrl = uploaded.url;
      } catch (uploadError) {
        console.log('Cloudinary upload failed, using local path');
        imageUrl = image || 'https://via.placeholder.com/500x500?text=' + encodeURIComponent(name);
      }
    } else if (!imageUrl) {
      imageUrl = 'https://via.placeholder.com/500x500?text=' + encodeURIComponent(name);
    }

    // Check if category exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      });
    }

    const category = await Category.create({
      name,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    throw error;
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Upload new image if provided
    let imageUrl = category.image;
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.path);
      imageUrl = uploaded.url;
      
      // Delete old image from Cloudinary
      if (category.image && !category.image.startsWith('http')) {
        await deleteFromCloudinary(category.image.split('/').pop().split('.')[0]);
      }
    }

    category.name = name || category.name;
    category.image = imageUrl || category.image;

    const updatedCategory = await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    throw error;
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    throw error;
  }
};
