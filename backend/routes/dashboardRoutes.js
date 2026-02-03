import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin Dashboard" });
  }
);

router.get(
  "/staff",
  protect,
  authorizeRoles("admin", "staff"),
  (req, res) => {
    res.json({ message: "Welcome Staff Dashboard" });
  }
);

router.get(
  "/receptionist",
  protect,
  authorizeRoles("admin", "receptionist"),
  (req, res) => {
    res.json({ message: "Welcome Receptionist Dashboard" });
  }
);

export default router;
