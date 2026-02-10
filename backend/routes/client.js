import express from "express";
import {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient
} from "../controllers/client.controller.js";
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all client routes
router.use(authenticateToken);

// All client operations require staff role (owners and staff can manage clients)
router.post("/", requireStaff, createClient);
router.get("/", requireStaff, getClients);
router.get("/:id", requireStaff, getClientById);
router.put("/:id", requireStaff, updateClient);
router.delete("/:id", requireStaff, deleteClient);

export default router;
