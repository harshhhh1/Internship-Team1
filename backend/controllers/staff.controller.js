import Staff from "../models/Staff.js";
import bcrypt from "bcryptjs";

export const createStaff = async (req, res) => {
    try {
        // Extract fields. req.body contains name, email, etc.
        const { name, email, role } = req.body;

        // --- Credentials Generation Logic ---
        // remove spaces, lowercase
        const cleanName = name ? name.replace(/\s+/g, '').toLowerCase() : email.split('@')[0];
        const username = cleanName;
        // Default password as requested: <username>1234
        const plainPassword = `${username}1234`;

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create Staff document with hashed password
        const staffData = {
            ...req.body,
            password: hashedPassword
        };

        const staff = new Staff(staffData);
        await staff.save();
        res.status(201).json(staff);
    } catch (error) {
        console.error("Error creating staff:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getStaff = async (req, res) => {
    try {
        const { salonId } = req.query;
        const filter = salonId ? { salonId } : {};
        const staff = await Staff.find(filter).populate('salonId', 'name');
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: "Staff not found" });
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!staff) return res.status(404).json({ message: "Staff not found" });
        res.status(200).json(staff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) return res.status(404).json({ message: "Staff not found" });
        res.status(200).json({ message: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
