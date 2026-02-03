import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const PORT =5050;
const app = express();

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});