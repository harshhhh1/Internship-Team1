import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        // Removed 'admin' from enum as requested
        enum: ['staff', 'receptionist'],
        default: 'staff'
    },
    profession: {
        type: String,
        required: true,
        enum: ['Stylist', 'Barber', 'Masseuse', 'Beautician', 'Nail Technician'],
        default: 'Stylist'
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
    accessToTabs: [{
        type: String,
        enum: [
            'profile', 'dashboard', 'appointment', 'earning', 'report',
            'services', 'settings', 'staff', 'walkin', 'client',
            'inventory', 'expenses', 'offers', 'reviews', 'receptionist', 'revenue-and-report'
        ],
    }],
    avatarUrl: {
        type: String,
        default: null,
    },
    // Availability management
    availability: {
        monday: { enabled: { type: Boolean, default: true }, slots: { type: [String], default: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"] } },
        tuesday: { enabled: { type: Boolean, default: true }, slots: { type: [String], default: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"] } },
        wednesday: { enabled: { type: Boolean, default: true }, slots: { type: [String], default: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"] } },
        thursday: { enabled: { type: Boolean, default: true }, slots: { type: [String], default: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"] } },
        friday: { enabled: { type: Boolean, default: true }, slots: { type: [String], default: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"] } },
        saturday: { enabled: { type: Boolean, default: true }, slots: { type: [String], default: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"] } },
        sunday: { enabled: { type: Boolean, default: false }, slots: { type: [String], default: [] } }
    }
}, { timestamps: true });

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;