import express from "express";
import {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    getExpenseStats
} from "../controllers/expense.controller.js";
import { authenticateToken, requireAdmin, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all expense routes
router.use(authenticateToken);

// Stats route - staff can view stats
router.get("/stats", requireStaff, getExpenseStats);

// CRUD operations
// Only admin/owner can create, update, delete expenses
// Staff can only view (get)
router.post("/", requireAdmin, createExpense);
router.get("/", requireStaff, getExpenses);
router.get("/:id", requireStaff, getExpenseById);
router.put("/:id", requireAdmin, updateExpense);
router.delete("/:id", requireAdmin, deleteExpense);

export default router;
