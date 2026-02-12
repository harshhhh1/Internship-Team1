import express from "express";
import {
    createWalkin,
    getWalkinsBySalon,
    updateWalkinStatus,
    deleteWalkin
} from "../controllers/walkin.controller.js";

const router = express.Router();

router.post("/", createWalkin);
router.get("/", getWalkinsBySalon);
router.put("/:id", updateWalkinStatus);
router.delete("/:id", deleteWalkin);

export default router;
