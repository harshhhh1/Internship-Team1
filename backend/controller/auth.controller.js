import User from "../models/user.js";

export const signup = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // validation
    if (!role || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // create user
    const user = await User.create({
      role,
      email,
      password, // (plain for now – hashing can be added later)
    });

    // IMPORTANT: send role back
    res.status(201).json({
      message: "Signup successful",
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;

    // validation
    if (!role || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check if user exists with email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // check role
    if (user.role !== role) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // simple password check (no hashing for now)
    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // generate token (simple for now, use JWT later)
    const token = "dummy-token-" + user._id;

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
