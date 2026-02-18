import express from "express";
import {
    markAttendance,
    getDailyAttendance,
    getMonthlyAttendance,
    bulkUpdateAttendance,
    getWeeklyAttendance,
    getMonthlyAttendanceReport,
    getYearlyAttendanceReport,
    getAttendanceCalendar
} from "../controllers/attendance.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", markAttendance);
router.post("/bulk", bulkUpdateAttendance);
router.get("/daily", getDailyAttendance);
router.get("/monthly", getMonthlyAttendance);

// New report routes
router.get("/report/weekly", getWeeklyAttendance);
router.get("/report/monthly", getMonthlyAttendanceReport);
router.get("/report/yearly", getYearlyAttendanceReport);
router.get("/calendar", getAttendanceCalendar);

export default router;
