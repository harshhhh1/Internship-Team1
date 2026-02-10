import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
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
        type: String,
        enum: ['Hair Products', 'Skincare', 'Nail Care', 'Spa Products', 'Consumables', 'Equipment', 'Other'],
        default: 'Other',
    },
    stock: {
        type: Number,
        default: 0,
    },
    minStock: {
        type: Number,
        default: 10,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        default: 'pcs',
    },
    supplier: {
        type: String,
        default: '',
    },
    lastRestocked: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

// Virtual for status
inventorySchema.virtual('status').get(function () {
    if (this.stock === 0) return 'Out of Stock';
    if (this.stock <= this.minStock) return 'Low Stock';
    return 'In Stock';
});

// Ensure virtuals are included in JSON
inventorySchema.set('toJSON', { virtuals: true });
inventorySchema.set('toObject', { virtuals: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
