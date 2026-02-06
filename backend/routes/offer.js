import express from "express";
import {
    createOffer,
    getOffers,
    getOfferById,
    updateOffer,
    deleteOffer
} from "../controllers/offer.controller.js";
import { authenticateToken, requireOwner, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all offer routes
router.use(authenticateToken);

// Create offer - only owners can create offers
router.post("/", requireOwner, createOffer);

// Get offers - both owners and staff can view offers
router.get("/", requireStaff, getOffers);

// Get offer by ID - both owners and staff can view offer details
router.get("/:id", requireStaff, getOfferById);

// Update offer - only owners can update offers
router.put("/:id", requireOwner, updateOffer);

// Delete offer - only owners can delete offers
router.delete("/:id", requireOwner, deleteOffer);

export default router;
