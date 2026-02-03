import { createUser, findUserByEmail } from "../models/user.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const userRole = role || 'staff'; // Default to staff if not provided

        const newUser = {
            username,
            email,
            password, // Storing plain text as requested
            role: userRole,
            registeredAt: new Date()
        };

        await createUser(newUser);

        return res.status(201).json({ message: "User created successfully", redirect: "/signin" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required including role" });
        }

        const user = await findUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.role && user.role !== role) {
            return res.status(403).json({ message: `Access denied. You are not a ${role}.` });
        } else if (!user.role && role !== 'staff') {
            if (role !== 'staff') {
                return res.status(403).json({ message: "Access denied. Role mismatch." });
            }
        }

        // Returning user info
        return res.status(200).json({
            message: "Signin successful",
            userId: user._id,
            role: user.role || 'staff',
            redirect: "/dashboard"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
