import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Allow nulls if some staff don't have email yet, but if they login they need it
    },
    password: {
        type: String,
        // required: true, // Optional if just a record, required if login
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true, // e.g., 'stylist', 'admin', 'receptionist'
    },
    onLeave: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    dob: { type: Date, default: null },
    gender: { type: String, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    zipCode: { type: String, default: null },
    appointmentCount: {
        type: Number,
        default: 0,
    },
    salary: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
