import express from "express";
import User from "../models/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const PLAN_LIMITS = {
  basic: 1,
  standard: 5,
  premium: 10,
};

router.post("/upgrade", authMiddleware, async (req, res) => {
  try {
    const { plan } = req.body;

    if (!PLAN_LIMITS[plan]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.plan = plan;
    user.maxBranches = PLAN_LIMITS[plan];
    await user.save();

    res.json({
      message: "Plan updated successfully",
      plan: user.plan,
      maxBranches: user.maxBranches,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error upgrading plan" });
  }
});

export default router;
