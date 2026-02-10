import Inventory from "../models/Inventory.js";

export const createInventoryItem = async (req, res) => {
    try {
        const item = new Inventory(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInventory = async (req, res) => {
    try {
        const { salonId, category } = req.query;
        let filter = {};
        if (salonId) filter.salonId = salonId;
        if (category && category !== 'All') filter.category = category;

        const items = await Inventory.find(filter).populate('salonId', 'name');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInventoryById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteInventoryItem = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const restockItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.stock += quantity;
        item.lastRestocked = new Date();
        await item.save();

        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getInventoryStats = async (req, res) => {
    try {
        const { salonId } = req.query;
        const filter = salonId ? { salonId } : {};

        const totalItems = await Inventory.countDocuments(filter);

        const items = await Inventory.find(filter);
        const inStock = items.filter(i => i.stock > i.minStock).length;
        const lowStock = items.filter(i => i.stock > 0 && i.stock <= i.minStock).length;
        const outOfStock = items.filter(i => i.stock === 0).length;

        res.status(200).json({
            totalItems,
            inStock,
            lowStock,
            outOfStock
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
