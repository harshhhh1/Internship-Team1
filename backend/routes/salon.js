import express from "express";

import {
    createSalon,
    getSalons,
    getSalonById,
    updateSalon,
    deleteSalon
} from "../controllers/salon.controller.js";
import { authenticateToken, requireOwner, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Get salons - public for booking flow
router.get("/", getSalons);

// Get salon by ID - public
router.get("/:id", getSalonById);

// All routes below require authentication
router.use(authenticateToken);

// Create salon - only owners can create salons
router.post("/", requireOwner, createSalon);

// Update salon - only owners can update salons
router.put("/:id", requireOwner, updateSalon);

// Delete salon - only owners can delete salons
router.delete("/:id", requireOwner, deleteSalon);

export default router;
