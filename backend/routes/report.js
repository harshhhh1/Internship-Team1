import express from "express";
import {
    getAppointmentsReport,
    getClientsReport,
    getRevenueReport,
    getDashboardReport
} from "../controllers/report.controller.js";
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all report routes
router.use(authenticateToken);

// All report routes require staff role
router.get("/appointments", requireStaff, getAppointmentsReport);
router.get("/clients", requireStaff, getClientsReport);
router.get("/revenue", requireStaff, getRevenueReport);
router.get("/dashboard", requireStaff, getDashboardReport);

export default router;

