import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import salonRoutes from "./routes/salon.js";
import staffRoutes from "./routes/staffRoutes.js";

import userRoutes from "./routes/userRoutes.js";

import planRoutes from "./routes/planRoutes.js";


dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/salon", salonRoutes);
app.use("/api/staff", staffRoutes);




app.use("/api/user", userRoutes);
app.use("/api/salon", salonRoutes);
app.use("/api/plans", planRoutes);


// database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
