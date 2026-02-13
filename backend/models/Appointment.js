import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        default: null,
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: false,
    },
    serviceId: {
        type: String, // String to support both real ObjectIds and dummy IDs like "1", "2"
        required: false,
    },
    clientName: {
        type: String,
        required: true,
    },
    clientMobile: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending",
    },
    note: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
