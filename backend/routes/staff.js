import express from "express";
import {
    createStaff,
    getStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
} from "../controllers/staff.controller.js";
import { authenticateToken, requireAdmin, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Get staff - public
router.get("/", getStaff);

// Get staff by ID - public
router.get("/:id", getStaffById);

// Protected routes below
router.use(authenticateToken);

// Create staff - owners and admins can create staff
router.post("/", requireAdmin, createStaff);

// Update staff - owners and admins can update staff
router.put("/:id", requireAdmin, updateStaff);

// Delete staff - owners and admins can delete staff
router.delete("/:id", requireAdmin, deleteStaff);

export default router;
