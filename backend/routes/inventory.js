import express from "express";
import {
    createInventoryItem,
    getInventory,
    getInventoryById,
    updateInventoryItem,
    deleteInventoryItem,
    restockItem,
    getInventoryStats
} from "../controllers/inventory.controller.js";
import { authenticateToken, requireAdmin, requireReceptionist, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all inventory routes
router.use(authenticateToken);

// Stats route - both admin and receptionist can view
router.get("/stats", requireStaff, getInventoryStats);

// GET routes - both admin and receptionist can view
router.get("/", requireStaff, getInventory);
router.get("/:id", requireStaff, getInventoryById);

// CRUD operations - only receptionist can add/edit/delete
// Admin can only view (cannot add/edit/delete)
router.post("/", requireReceptionist, createInventoryItem);
router.put("/:id", requireReceptionist, updateInventoryItem);
router.delete("/:id", requireReceptionist, deleteInventoryItem);

// Restock operation
router.post("/:id/restock", requireReceptionist, restockItem);

export default router;
