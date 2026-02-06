import express from "express";
import {
    createStaff,
    getStaff,
    getStaffById,
    updateStaff,
    deleteStaff,
} from "../controllers/staff.controller.js";
import { authenticateToken, requireOwner, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all staff routes
router.use(authenticateToken);

// Create staff - only owners can create staff
router.post("/", requireOwner, createStaff);

// Get staff - both owners and staff can view
router.get("/", requireStaff, getStaff);

// Get staff by ID - both owners and staff can view
router.get("/:id", requireStaff, getStaffById);

// Update staff - only owners can update staff
router.put("/:id", requireOwner, updateStaff);

// Delete staff - only owners can delete staff
router.delete("/:id", requireOwner, deleteStaff);

export default router;
