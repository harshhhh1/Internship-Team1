import express from "express";
import Salon from "../models/Salon.js";

const router = express.Router();

// Add Salon Branch
router.post("/add-branch", async (req, res) => {
  try {
    const salon = new Salon(req.body);
    await salon.save();

    res.status(201).json({
      message: "Salon branch added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add salon branch",
    });
  }
});

export default router;
