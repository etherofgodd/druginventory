import expressAsyncHandler from "express-async-handler";
import Category from "../models/category.js";

// @desc Get all Category
// @route Get /api/category
// @access public

const getCategory = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    note: "All categories",
    categories,
  });
});

// @desc Get single  Category
// @route GET /api/category
// @access public

const getCategoryById = expressAsyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({
    note: "Get Category by Id",
    category,
  });
});

// @desc Create New Category
// @route POST /api/category
// @access Private

const createNewCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "No name given" });
    return;
  }
  const cateExists = await Category.findOne({ name });
  if (cateExists) {
    return res.status(400).json({
      message: "Category exists",
    });
  }

  await Category.create({
    name,
  });

  res.status(201).json({
    note: "Category created",
    success: true,
  });
});

// @desc Update Category
// @route PUT /api/category
// @access Private

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Bad request or no category found" });
    } else {
      category.name = name;

      await category.save();

      res.status(200).json({
        note: "Category Updated",
        success: true,
      });
    }
  } catch (error) {
    res.send(`errorName:${error.name},\n errorMessage: ${error.message}`);
  }
};

// @desc Delete New Category
// @route Delete /api/category/:id
// @access Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    !category
      ? res.status(400).json({
          message: "Category not found",
        })
      : res.status(200).json({
          message: "Category deleted",
        });
  } catch (error) {
    console.error(error);
  }
};

export {
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
};
