import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    discountType: {
        type: String, // 'percentage', 'flat'
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    validTill: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
