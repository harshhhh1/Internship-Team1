import express from "express";
import { signup, signin, getProfile, updateProfile, changePassword, deleteAccount } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", getProfile);
router.put("/update", updateProfile);
router.put("/change-password", changePassword);
router.delete("/delete-account", deleteAccount);

export default router;
