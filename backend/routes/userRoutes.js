


import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name email plan maxBranches"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const planPriceMap = {
      basic: 0,
      standard: 999,
      premium: 1649,
    };

    res.json({
      planName:
        user.plan === "basic"
          ? "Basic Plan"
          : user.plan === "standard"
          ? "Standard Plan"
          : "Premium Salon",
      price: planPriceMap[user.plan],
      maxBranches: user.maxBranches,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
