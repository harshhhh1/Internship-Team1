import express from "express";
import { updatePlan } from "../controllers/owner.controller.js";
import { authenticateToken, requireOwner } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all owner routes
router.use(authenticateToken);

// Update Subscription Plan - Only for owners
router.put("/update-plan", requireOwner, updatePlan);

export default router;
