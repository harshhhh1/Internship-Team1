import express from "express";
import { signup, login, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ✅ Protect this route so only logged-in users can access
router.get("/profile", protect, getProfile);

export default router;




