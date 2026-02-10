import mongoose from "mongoose";

const SalonSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  city: String,
  openingTime: String,
  closingTime: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});




const salonSchema = new mongoose.Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("Salon", SalonSchema);
