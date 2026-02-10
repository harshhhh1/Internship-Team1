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
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all inventory routes
router.use(authenticateToken);

// Stats route (must be before /:id route)
router.get("/stats", requireStaff, getInventoryStats);

// CRUD operations
router.post("/", requireStaff, createInventoryItem);
router.get("/", requireStaff, getInventory);
router.get("/:id", requireStaff, getInventoryById);
router.put("/:id", requireStaff, updateInventoryItem);
router.delete("/:id", requireStaff, deleteInventoryItem);

// Restock operation
router.post("/:id/restock", requireStaff, restockItem);

export default router;
