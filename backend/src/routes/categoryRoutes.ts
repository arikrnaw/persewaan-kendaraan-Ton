import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
} from "../controllers/categoryController";

const router = Router();

// Routes untuk CRUD categories
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);

export default router;
