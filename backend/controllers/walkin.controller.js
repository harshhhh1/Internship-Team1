import Walkin from "../models/Walkin.js";
import Salon from "../models/Salon.js";
import mongoose from "mongoose";

export const createWalkin = async (req, res) => {
    try {
        const { salonId, clientName, clientMobile, serviceId, staffId, price } = req.body;

        const salon = await Salon.findById(salonId);
        if (!salon) return res.status(404).json({ message: "Salon not found" });

        const newWalkin = new Walkin({
            ownerId: salon.ownerId,
            salonId,
            clientName,
            clientMobile,
            serviceId,
            staffId,
            price: price || 0,
            status: "waiting"
        });

        await newWalkin.save();
        res.status(201).json(newWalkin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getWalkinsBySalon = async (req, res) => {
    try {
        const { salonId } = req.query;
        const query = salonId ? { salonId } : {};

        const walkins = await Walkin.find(query)
            .sort({ date: -1 })
            .populate("staffId", "name");

        res.status(200).json(walkins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateWalkinStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const walkin = await Walkin.findById(id);
        if (!walkin) return res.status(404).json({ message: "Walk-in not found" });

        // If status is changing to completed, create a payment record
        if (status === 'completed' && walkin.status !== 'completed') {
            const Payment = mongoose.model('Payment');
            const payment = new Payment({
                ownerId: walkin.ownerId,
                salonId: walkin.salonId,
                walkinId: walkin._id, // We should probably add this to Payment schema for clarity
                appointmentId: null, // It's a walk-in, not an appointment, but we need a reference
                amount: walkin.price,
                method: 'cash'
            });
            await payment.save();

            // Increment staff count
            if (walkin.staffId) {
                await mongoose.model('Staff').findByIdAndUpdate(walkin.staffId, { $inc: { appointmentCount: 1 } });
            }
        }

        walkin.status = status;
        await walkin.save();

        res.status(200).json(walkin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteWalkin = async (req, res) => {
    try {
        const { id } = req.params;
        await Walkin.findByIdAndDelete(id);
        res.status(200).json({ message: "Walk-in deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
