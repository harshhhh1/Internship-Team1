import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
    },
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    date: {
        type: Date,
        required: true,
        // Ensure time is normalized to midnight for consistency
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Half Day', 'Leave'],
        default: 'Present'
    },
    leaveType: {
        type: String,
        enum: ['Paid', 'Sick', 'Unpaid', 'Other'],
        default: null
    },
    checkIn: {
        type: Date,
        default: null
    },
    checkOut: {
        type: Date,
        default: null
    },
    remarks: {
        type: String,
        default: ""
    }
}, { timestamps: true });

// Ensure one attendance record per staff per day
attendanceSchema.index({ staffId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;