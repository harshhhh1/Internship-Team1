import Salon from "../models/Salon.js";

/* ======================
   CREATE SALON
====================== */
export const createSalon = async (req, res) => {
  try {
    const { name, address, contact, timings, services } = req.body;

    console.log("Creating salon:", req.body);

    const salon = await Salon.create({
      name,
      address,
      contact,
      timings,
      services,
    });

    console.log("Salon created:", salon._id);

    res.status(201).json({
      message: "Salon created successfully",
      salon,
    });
  } catch (error) {
    console.error("Create salon error:", error);
    res.status(500).json({ message: "Failed to create salon", error: error.message });
  }
};

/* ======================
   GET ALL SALONS
====================== */
export const getAllSalons = async (req, res) => {
  try {
    const salons = await Salon.find().sort({ createdAt: -1 });
    res.status(200).json({ salons });
  } catch (error) {
    console.error("Get all salons error:", error);
    res.status(500).json({ message: "Failed to get salons", error: error.message });
  }
};

/* ======================
   GET SALON
====================== */
export const getSalon = async (req, res) => {
  try {
    // Get the most recently created salon
    const salon = await Salon.findOne().sort({ createdAt: -1 });

    if (!salon) {
      return res.status(404).json({ message: "No salon found" });
    }

    res.status(200).json({ salon });
  } catch (error) {
    console.error("Get salon error:", error);
    res.status(500).json({ message: "Failed to get salon", error: error.message });
  }
};

/* ======================
   UPDATE SALON
====================== */
export const updateSalon = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const salon = await Salon.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    res.status(200).json({
      message: "Salon updated successfully",
      salon,
    });
  } catch (error) {
    console.error("Update salon error:", error);
    res.status(500).json({ message: "Failed to update salon", error: error.message });
  }
};

/* ======================
   DELETE SALON
====================== */
export const deleteSalon = async (req, res) => {
  try {
    const { id } = req.params;

    const salon = await Salon.findByIdAndDelete(id);

    if (!salon) {
      return res.status(404).json({ message: "Salon not found" });
    }

    res.status(200).json({ message: "Salon deleted successfully" });
  } catch (error) {
    console.error("Delete salon error:", error);
    res.status(500).json({ message: "Failed to delete salon", error: error.message });
  }
};

