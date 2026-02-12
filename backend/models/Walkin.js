import mongoose from "mongoose";

const walkinSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    clientName: {
        type: String,
        required: true,
    },
    clientMobile: {
        type: String,
        required: false, // Walk-ins might not always provide mobile
        default: "0000000000"
    },
    serviceId: {
        type: String, // Supporting both real IDs and predefined IDs
        required: false,
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["waiting", "in-service", "completed", "cancelled"],
        default: "waiting",
    },
    date: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const Walkin = mongoose.model("Walkin", walkinSchema);

export default Walkin;
