import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number, // in minutes
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

export default Service;
