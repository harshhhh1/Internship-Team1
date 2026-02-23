import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customer.js";
import salonRoutes from "./routes/salon.js";
import staffRoutes from "./routes/staff.js";
import serviceRoutes from "./routes/service.js";
import appointmentRoutes from "./routes/appointment.js";
import paymentRoutes from "./routes/payment.js";
import clientRoutes from "./routes/client.js";
import offerRoutes from "./routes/offer.js";
import ownerRoutes from "./routes/owner.js";
import inventoryRoutes from "./routes/inventory.js";
import expenseRoutes from "./routes/expense.js";
import attendanceRoutes from "./routes/attendance.js";
import walkinRoutes from "./routes/walkin.js";
import reportRoutes from "./routes/report.js";
import categoryRoutes from "./routes/category.js";
import trialRoutes from "./routes/trial.js";
import availabilityRoutes from "./routes/availability.js";
import { authenticateToken, checkTrialStatus } from "./middleware/auth.js";

dotenv.config();

const PORT = 5050;
const app = express();

// Connect to Database
connectDB();

app.use(cors());
app.use(express.json());

// Routes - Public (no authentication required)
app.use("/auth", authRoutes);

// Customer routes (public for signup/signin)
app.use("/customer", customerRoutes);

// Trial routes (public but will check on login response)
app.use("/auth", trialRoutes);

// Public routes for customer booking flow - no authentication required
app.use("/salons", salonRoutes);
app.use("/staff", staffRoutes);
app.use("/services", serviceRoutes);

// Appointments - POST is public (for customer booking), other routes require auth
app.use("/appointments", appointmentRoutes);

// Availability routes - some public, some protected
app.use("/availability", availabilityRoutes);

// Routes that require authentication AND trial check (for admin/owner operations)
app.use("/payments", authenticateToken, checkTrialStatus, paymentRoutes);
app.use("/clients", authenticateToken, checkTrialStatus, clientRoutes);
app.use("/offers", authenticateToken, checkTrialStatus, offerRoutes);
app.use("/owner", authenticateToken, checkTrialStatus, ownerRoutes);
app.use("/inventory", authenticateToken, checkTrialStatus, inventoryRoutes);
app.use("/expenses", authenticateToken, checkTrialStatus, expenseRoutes);
app.use("/attendance", authenticateToken, checkTrialStatus, attendanceRoutes);
app.use("/walkins", authenticateToken, checkTrialStatus, walkinRoutes);
app.use("/reports", authenticateToken, checkTrialStatus, reportRoutes);
app.use("/categories", authenticateToken, checkTrialStatus, categoryRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

