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

// Get services - public
router.get("/", getServices);

// Get service by ID - public
router.get("/:id", getServiceById);

// Protected routes below
router.use(authenticateToken);

// Create service - only owners can create services
router.post("/", requireOwner, createService);

// Update service - only owners can update services
router.put("/:id", requireOwner, updateService);

// Delete service - only owners can delete services
router.delete("/:id", requireOwner, deleteService);

export default router;
