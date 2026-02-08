import Staff from "../models/Staff.js";
import bcrypt from "bcryptjs";

import Salon from "../models/Salon.js";

export const createStaff = async (req, res) => {
    try {
        // Extract fields. req.body contains name, email, etc.
        const { name, email, role, salonId } = req.body;

        if (!salonId) {
            return res.status(400).json({ message: "Salon ID is required" });
        }

        // Find the salon to get the ownerId
        const salon = await Salon.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }

        // Check if staff with this email already exists
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(400).json({ message: "Staff with this email already exists" });
        }

        // --- Credentials Generation Logic ---
        // remove spaces, lowercase
        const cleanName = name ? name.replace(/\s+/g, '').toLowerCase() : email.split('@')[0];
        const username = cleanName;
        // Default password as requested: <username>1234
        const plainPassword = `${username}1234`;

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create Staff document with hashed password AND ownerId
        const staffData = {
            ...req.body,
            password: hashedPassword,
            ownerId: salon.ownerId
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
        let filter = {};

        if (req.user.role === 'owner') {
            // Force filter by ownerId for owners
            filter.ownerId = req.user.id;
            // If they also want a specific salon, add that too
            if (salonId) {
                filter.salonId = salonId;
            }
        } else {
            // For staff/admin, continue with existing logic
            if (salonId) {
                filter.salonId = salonId;
            } else {
                // If staff member, see their own salon
                const userStaff = await Staff.findById(req.user.id);
                if (userStaff && userStaff.salonId) {
                    filter.salonId = userStaff.salonId;
                } else {
                    return res.status(200).json([]);
                }
            }
        }

        const staff = await Staff.find(filter).populate('salonId', 'name');

        res.status(200).json(staff);
    } catch (error) {
        console.error("Get Staff Error:", error);
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
        // If password is being updated, hash it first
        if (req.body.password) {
            // Check if it's already hashed
            const isHashed = req.body.password.startsWith('$2a$') || req.body.password.startsWith('$2b$');
            if (!isHashed) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
        }

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
