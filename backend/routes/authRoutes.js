import express from "express";
import { signup, login, getProfile } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);

/* ROLE BASED ROUTES */

router.get(
  "/admin-only",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

router.get(
  "/staff-only",
  protect,
  authorizeRoles("staff", "admin"),
  (req, res) => {
    res.json({ message: "Welcome Staff" });
  }
);

router.get(
  "/receptionist-only",
  protect,
  authorizeRoles("receptionist", "admin"),
  (req, res) => {
    res.json({ message: "Welcome Receptionist" });
  }
);

export default router;
