import express from "express";
import {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
    getClientStats
} from "../controllers/client.controller.js";
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all client routes
router.use(authenticateToken);

// Stats route (must be before /:id route to avoid conflict)
router.get("/stats", requireStaff, getClientStats);

// All client operations require staff role (owners and staff can manage clients)
router.post("/", requireStaff, createClient);
router.get("/", requireStaff, getClients);
router.get("/:id", requireStaff, getClientById);
router.put("/:id", requireStaff, updateClient);
router.delete("/:id", requireStaff, deleteClient);

export default router;
