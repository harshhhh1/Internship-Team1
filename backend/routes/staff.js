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

// Apply authentication to all staff routes
router.use(authenticateToken);

// Create staff - owners and admins can create staff
router.post("/", requireAdmin, createStaff);

// Get staff - both owners and staff can view
router.get("/", requireStaff, getStaff);

// Get staff by ID - both owners and staff can view
router.get("/:id", requireStaff, getStaffById);

// Update staff - owners and admins can update staff
router.put("/:id", requireAdmin, updateStaff);

// Delete staff - owners and admins can delete staff
router.delete("/:id", requireAdmin, deleteStaff);

export default router;
