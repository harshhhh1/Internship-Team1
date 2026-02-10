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
router.use(authenticateToken);

// Create salon - only owners can create salons
router.post("/", requireOwner, createSalon);

// Get salons - both owners and staff can view salons
router.get("/", requireStaff, getSalons);

// Get salon by ID - both owners and staff can view salon details
router.get("/:id", requireStaff, getSalonById);

// Update salon - only owners can update salons
router.put("/:id", requireOwner, updateSalon);

// Delete salon - only owners can delete salons
router.delete("/:id", requireOwner, deleteSalon);

export default router;
