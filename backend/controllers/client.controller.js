import Client from "../models/Client.js";

export const createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getClients = async (req, res) => {
    try {
        const { salonId } = req.query;
        const filter = salonId ? { salonId } : {};
        const clients = await Client.find(filter).populate('salonId', 'name');
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ message: "Client not found" });
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClientStats = async (req, res) => {
    try {
        const { salonId } = req.query;
        const filter = salonId ? { salonId } : {};

        // Total clients
        const totalClients = await Client.countDocuments(filter);

        // New clients this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const newThisMonth = await Client.countDocuments({
            ...filter,
            createdAt: { $gte: startOfMonth }
        });

        // Active clients (visited in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeClients = await Client.countDocuments({
            ...filter,
            lastVisit: { $gte: thirtyDaysAgo }
        });

        // VIP clients
        const vipClients = await Client.countDocuments({
            ...filter,
            isVip: true
        });

        res.status(200).json({
            totalClients,
            newThisMonth,
            activeClients,
            vipClients
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find or create client by mobile number (used when booking appointments)
export const findOrCreateClient = async (req, res) => {
    try {
        const { salonId, name, mobile, email } = req.body;

        if (!salonId || !mobile) {
            return res.status(400).json({ message: "Salon ID and mobile number are required" });
        }

        // Try to find existing client by mobile number within this salon
        let client = await Client.findOne({ salonId, mobile });

        if (client) {
            // Update name and email if provided and different
            if (name || email) {
                client.name = name || client.name;
                if (email) client.email = email;
                await client.save();
            }
            return res.status(200).json({ client, isNew: false });
        }

        // Create new client
        client = new Client({
            salonId,
            name: name || 'Unknown',
            mobile,
            email: email || '',
            visits: 0,
            totalSpent: 0,
            isVip: false
        });
        await client.save();

        res.status(201).json({ client, isNew: true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
