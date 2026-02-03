import { createUser, findUserByEmail } from "../models/user.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = {
            username,
            email,
            password, // Storing plain text as requested
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
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await findUserByEmail(email);
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Returning user info (excluding password ideally, but for basic flow sending id is enough)
        return res.status(200).json({
            message: "Signin successful",
            userId: user._id,
            redirect: "/dashboard"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
