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
    visits: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Client = mongoose.model("Client", clientSchema);

export default Client;
