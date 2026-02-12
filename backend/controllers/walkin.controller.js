import Walkin from "../models/Walkin.js";

export const createWalkin = async (req, res) => {
    try {
        const { salonId, clientName, clientMobile, serviceId, staffId, price } = req.body;

        const newWalkin = new Walkin({
            salonId,
            clientName,
            clientMobile,
            serviceId,
            staffId,
            price,
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

        const updatedWalkin = await Walkin.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedWalkin) {
            return res.status(404).json({ message: "Walk-in not found" });
        }

        res.status(200).json(updatedWalkin);
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
