import express from "express";
import {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
} from "../controllers/service.controller.js";
import { authenticateToken, requireOwner, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all service routes
router.use(authenticateToken);

// Create service - only owners can create services
router.post("/", requireOwner, createService);

// Get services - both owners and staff can view services
router.get("/", requireStaff, getServices);

// Get service by ID - both owners and staff can view service details
router.get("/:id", requireStaff, getServiceById);

// Update service - only owners can update services
router.put("/:id", requireOwner, updateService);

// Delete service - only owners can delete services
router.delete("/:id", requireOwner, deleteService);

export default router;
