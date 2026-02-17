import Walkin from "../models/Walkin.js";
import Salon from "../models/Salon.js";
import mongoose from "mongoose";

import Client from "../models/Client.js";

export const createWalkin = async (req, res) => {
    try {
        const { salonId, clientName, clientMobile, serviceId, staffId, price, date } = req.body;

        const salon = await Salon.findById(salonId);
        if (!salon) return res.status(404).json({ message: "Salon not found" });

        // Find or create client (if mobile is provided)
        let client = null;
        if (clientMobile && clientMobile !== "0000000000") {
            client = await Client.findOne({ mobile: clientMobile, salonId });
            if (!client) {
                client = new Client({
                    salonId,
                    name: clientName,
                    mobile: clientMobile,
                });
                await client.save();
            }
        } else {
            // If no mobile, try to find by name within salon (less reliable but acceptable for walk-ins without mobile)
            // OR generate a dummy client? For now, let's just create a client if name provided?
            // Actually, if mobile is 0000000000, we probably shouldn't link to a real client or should create a temp one.
            // Let's create a Client entry even for walk-ins to track history if they come back with same details.
            // If mobile is default, we might multiple clients with same mobile? Client model validation might fail if unique.
            // Client model doesn't enforce unique mobile globally, but usually it should be unique per salon ideally.
            // Let's assume for now if mobile is provided we link, otherwise we leave clientId null or create a "Walk-in" client?
            // Requirement says "Client details must be visible".
            // Let's create a client.
            if (clientMobile) {
                client = await Client.findOne({ mobile: clientMobile, salonId });
                if (!client) {
                    client = new Client({
                        salonId,
                        name: clientName,
                        mobile: clientMobile,
                    });
                    await client.save();
                }
            }
        }

        const newWalkin = new Walkin({
            ownerId: salon.ownerId,
            salonId,
            clientName,
            clientMobile,
            serviceId,
            staffId,
            clientId: client ? client._id : null,
            price: price || 0,
            status: "waiting",
            date: date ? new Date(date) : new Date() // Use provided date or default to now
        });

        await newWalkin.save();

        if (client) {
            client.visits += 1;
            client.lastVisit = new Date();
            await client.save();
        }

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

            // Update client total spent
            if (walkin.clientId || walkin.clientMobile) {
                const clientId = walkin.clientId || (await mongoose.model('Client').findOne({
                    mobile: walkin.clientMobile,
                    salonId: walkin.salonId
                }))?._id;

                if (clientId) {
                    const finalPrice = Number(walkin.price) || 0;
                    console.log(`Updating totalSpent for walk-in client ${clientId} with amount ${finalPrice}`);
                    await mongoose.model('Client').findByIdAndUpdate(
                        clientId,
                        { $inc: { totalSpent: finalPrice } }
                    );
                }
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
