import express from "express";
import {
    markAttendance,
    getDailyAttendance,
    getMonthlyAttendance,
    bulkUpdateAttendance
} from "../controllers/attendance.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", markAttendance);
router.post("/bulk", bulkUpdateAttendance);
router.get("/daily", getDailyAttendance);
router.get("/monthly", getMonthlyAttendance);

export default router;