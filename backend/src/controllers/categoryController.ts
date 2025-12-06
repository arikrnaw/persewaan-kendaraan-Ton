import { Request, Response } from "express";
import MsCategory from "../models/MsCategory";
import { Op } from "sequelize";

// Helper function untuk get atau create category
export const getOrCreateCategory = async (
  categoryName: string
): Promise<MsCategory> => {
  // Cari category berdasarkan name (case-insensitive)
  let category = await MsCategory.findOne({
    where: {
      name: {
        [Op.like]: categoryName.trim(),
      },
    },
  });

  // Jika tidak ada, buat baru
  if (!category) {
    category = await MsCategory.create({
      name: categoryName.trim(),
    });
  }

  return category;
};

// GET all categories
export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await MsCategory.findAll({
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving categories",
      error: error.message,
    });
  }
};

// GET category by ID
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId) || categoryId <= 0) {
      res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
      return;
    }

    const category = await MsCategory.findByPk(categoryId);

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category retrieved successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving category",
      error: error.message,
    });
  }
};

// CREATE category
export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: "Category name is required",
      });
      return;
    }

    // Cek apakah category sudah ada
    const existingCategory = await MsCategory.findOne({
      where: {
        name: {
          [Op.like]: name.trim(),
        },
      },
    });

    if (existingCategory) {
      res.status(400).json({
        success: false,
        message: "Category already exists",
      });
      return;
    }

    const category = await MsCategory.create({
      name: name.trim(),
    });

    res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
};
