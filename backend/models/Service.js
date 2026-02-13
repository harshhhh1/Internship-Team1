import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    categoryName: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    malePrice: {
        type: Number,
        default: 0
    },
    femalePrice: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number, // in minutes
        default: 30
    },
    description: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

export default Service;
