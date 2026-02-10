import express from "express";
import Staff from "../models/staff.js";

const router = express.Router();

// ➕ Add staff to branch
router.post("/add", async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📥 Get staff by branch
router.get("/salon/:salonId", async (req, res) => {
  try {
    const staff = await Staff.find({ salon: req.params.salonId });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
