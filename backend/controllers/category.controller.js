import Category from "../models/Category.js";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, description, color, salonId } = req.body;
    
    // Check if category already exists for this salon
    const existingCategory = await Category.findOne({ name, salonId });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      description,
      color: color || '#9381ff',
      salonId
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Categories
export const getCategories = async (req, res) => {
  try {
    const { salonId } = req.query;
    let filter = { isActive: true };

    if (salonId) {
      filter.salonId = salonId;
    }

    const categories = await Category.find(filter).sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, color, isActive } = req.body;
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, color, isActive },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

