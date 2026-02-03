import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Connect to database
connectDB()
  .then(() => {
    app.use("/api/auth", authRoutes);
    app.use("/api/dashboard", dashboardRoutes);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT} 🚀`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });


