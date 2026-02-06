import Salon from "../models/Salon.js";

// Create Salon
export const createSalon = async (req, res) => {
  try {
    const salon = new Salon(req.body);
    await salon.save();
    res.status(201).json(salon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Salons
export const getSalons = async (req, res) => {
  try {
    const salons = await Salon.find().populate('ownerId', 'name email');
    res.status(200).json(salons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Salon by ID
export const getSalonById = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id).populate('ownerId', 'name email');
    if (!salon) return res.status(404).json({ message: "Salon not found" });
    res.status(200).json(salon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Salon
export const updateSalon = async (req, res) => {
  try {
    const salon = await Salon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!salon) return res.status(404).json({ message: "Salon not found" });
    res.status(200).json(salon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Salon
export const deleteSalon = async (req, res) => {
  try {
    const salon = await Salon.findByIdAndDelete(req.params.id);
    if (!salon) return res.status(404).json({ message: "Salon not found" });
    res.status(200).json({ message: "Salon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
