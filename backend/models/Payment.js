import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String, // 'cash', 'card', 'online'
        required: true,
    },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
