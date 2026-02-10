import express from "express";
import { getUserProfile } from "../controllers/profile.controller.js";
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all profile routes
router.use(authenticateToken);

// Get user profile - both owners and staff can view profiles
router.get("/:id", requireStaff, getUserProfile);

export default router;
