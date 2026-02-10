import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: '',
    },
    visits: {
        type: Number,
        default: 0,
    },
    lastVisit: {
        type: Date,
        default: null,
    },
    totalSpent: {
        type: Number,
        default: 0,
    },
    isVip: {
        type: Boolean,
        default: false,
    },
    notes: {
        type: String,
        default: '',
    },
}, { timestamps: true });

const Client = mongoose.model("Client", clientSchema);

export default Client;
