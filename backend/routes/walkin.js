import express from "express";
import {
    createWalkin,
    getWalkinsBySalon,
    updateWalkinStatus,
    deleteWalkin,
    getAvailableSlots,
    getWalkinStats
} from "../controllers/walkin.controller.js";
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Public route for slot availability (no auth needed for customers to check slots)
router.get("/slots", getAvailableSlots);

// All other routes require authentication
router.use(authenticateToken);

// Stats for admin dashboard
router.get("/stats", requireStaff, getWalkinStats);

// CRUD operations
router.post("/", requireStaff, createWalkin);
router.get("/", requireStaff, getWalkinsBySalon);
router.put("/:id", requireStaff, updateWalkinStatus);
router.delete("/:id", requireStaff, deleteWalkin);

export default router;
