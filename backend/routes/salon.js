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

// Apply authentication to all salon routes
// Get salons - public for booking flow
router.get("/", (req, res, next) => {
    // Optional authentication to handle filtering by ownerId if logged in as owner
    // But for now, let's just make it public and handle filtering in controller
    next();
}, getSalons);

// Get salon by ID - public
router.get("/:id", getSalonById);

// Protected routes below
router.use(authenticateToken);

// Create salon - only owners can create salons
router.post("/", requireOwner, createSalon);

// Update salon - only owners can update salons
router.put("/:id", requireOwner, updateSalon);

// Delete salon - only owners can delete salons
router.delete("/:id", requireOwner, deleteSalon);

export default router;
