const Category = require('../models/Category');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query; // Default limit: 10, offset: 0

    // Convert limit and offset to numbers
    const limitNum = parseInt(limit, 10);
    const offsetNum = parseInt(offset, 10);

    // Fetch categories with pagination
    const categories = await Category.find()
      .skip(offsetNum) // Skip the first 'offset' documents
      .limit(limitNum); // Limit the number of documents returned to 'limit'

    // Get the total count of categories (optional, for frontend pagination)
    const totalCategories = await Category.countDocuments();

    res.json({
      message: 'Successfully fetched categories',
      success: true,
      data: categories,
      pagination: {
        total: totalCategories, // Total number of categories
        limit: limitNum,       // Number of categories returned
        offset: offsetNum,     // Number of categories skipped
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, image_url, slug } = req.body;

  try {
    const newCategory = new Category({ name, image_url, slug });
    const savedCategory = await newCategory.save();
    return res.json({
      message:"Sucessfully save category",
      success:true,
      data:savedCategory});  } catch (err) {
    res.status(500).json({ message: err.message, success:false, });
  }
};



// Update a category by ID
exports.updateCategory = async (req, res) => {
  const { id } = req.query;
  const { name, image_url, slug } = req.body;
console.log(id)
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found', success: false });
    }

    if (name) category.name = name;
    if (image_url) category.image_url = image_url;
    if (slug) category.slug = slug;

    const updatedCategory = await category.save();

    res.json({
      message: 'Category updated successfully',
      success: true,
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};