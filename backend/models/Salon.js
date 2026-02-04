import mongoose from "mongoose";

const salonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: "India" },
    },
    contact: {
      phone: { type: String, required: true },
      alternatePhone: { type: String },
      email: { type: String, required: true },
    },
    timings: {
      opening: { type: String, default: "09:00" },
      closing: { type: String, default: "20:00" },
      workingDays: {
        type: [String],
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      },
    },
    services: [
      {
        name: { type: String },
        price: { type: Number },
        duration: { type: Number }, // in minutes
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Salon", salonSchema);

