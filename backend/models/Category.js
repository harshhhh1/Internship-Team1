import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: '#9381ff'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;

