import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  salon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Salon",
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Staff", StaffSchema);
