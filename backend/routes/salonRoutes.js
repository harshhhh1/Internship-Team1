import express from "express";
import { createSalon, getSalon, getAllSalons, updateSalon, deleteSalon } from "../controllers/salonController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication and admin role
router.post("/", protect, authorizeRoles("admin"), createSalon);
router.get("/", protect, getSalon);
router.get("/all", protect, authorizeRoles("admin"), getAllSalons);
router.put("/:id", protect, authorizeRoles("admin"), updateSalon);
router.delete("/:id", protect, authorizeRoles("admin"), deleteSalon);

export default router;

