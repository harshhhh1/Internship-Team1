const express = require("express");
const router = express.Router();
const Salon = require("../models/Salon");

router.get("/count/:userId", async (req, res) => {
  try {
    const count = await Salon.countDocuments({
      owner: req.params.userId
    });

    res.json({ usedBranches: count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
