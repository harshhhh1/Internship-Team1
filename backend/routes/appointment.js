import express from "express";
import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    completeAppointment
} from "../controllers/appointment.controller.js";
import { authenticateToken, requireStaff } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all appointment routes
router.use(authenticateToken);

// All appointment operations require staff role (owners and staff can manage appointments)
router.post("/", requireStaff, createAppointment);
router.get("/", requireStaff, getAppointments);
router.get("/:id", requireStaff, getAppointmentById);
router.put("/:id", requireStaff, updateAppointment);
router.delete("/:id", requireStaff, deleteAppointment);
router.put("/:id/complete", requireStaff, completeAppointment);

export default router;
