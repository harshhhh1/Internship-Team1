import express from "express";
import {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} from "../controllers/payment.controller.js";
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all payment routes
router.use(authenticateToken);

// All payment operations require staff role (owners and staff can manage payments)
router.post("/", requireStaff, createPayment);
router.get("/", requireStaff, getPayments);
router.get("/:id", requireStaff, getPaymentById);
router.put("/:id", requireStaff, updatePayment);
router.delete("/:id", requireStaff, deletePayment);

export default router;
