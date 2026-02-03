import { findUserById } from "../models/user.js";

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await findUserById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the plain user data as requested
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
