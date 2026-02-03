// 1️⃣ Load environment variables
import "dotenv/config"; // This automatically calls dotenv.config()

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// 2️⃣ Middleware
app.use(cors());
app.use(express.json());

// 3️⃣ Connect to database
await connectDB();

// 4️⃣ Routes
app.use("/api/auth", authRoutes);

// 5️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);

