import express from "express";
import {
    customerSignup,
    customerSignin,
    getCustomerProfile,
    updateCustomerProfile,
    getMyBookings,
    changePassword
} from "../controllers/customer.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/signup", customerSignup);
router.post("/signin", customerSignin);

// Protected routes
router.get("/profile", authenticateToken, getCustomerProfile);
router.put("/profile", authenticateToken, updateCustomerProfile);
router.get("/bookings", authenticateToken, getMyBookings);
router.put("/change-password", authenticateToken, changePassword);

export default router;
