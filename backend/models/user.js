import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["staff", "admin"],
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // 🔽 ADD THESE FIELDS FOR PLAN SYSTEM
  plan: {
    type: String,
    enum: ["basic", "standard", "premium"],
    default: "basic",
  },

  maxBranches: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("User", userSchema);
