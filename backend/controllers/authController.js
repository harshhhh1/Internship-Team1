// controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/* =========================
   Generate JWT Token
========================= */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* =========================
   SIGNUP CONTROLLER
========================= */
export const signup = async (req, res) => {
  try {
    const { username, name, email, password, confirmPassword } = req.body;
    const userName = username?.trim() || name?.trim();
    const userEmail = email?.trim().toLowerCase();

    // 1️⃣ Required fields
    if (!userName || !userEmail || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Email validation
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // 3️⃣ Password validation
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 4️⃣ Check existing user
    const existingUser = await User.findOne({
      $or: [{ email: userEmail }, { username: userName }]
    });

    if (existingUser) {
      if (existingUser.email === userEmail) return res.status(400).json({ message: "Email already registered" });
      if (existingUser.username === userName) return res.status(400).json({ message: "Username already taken" });
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create user
    const user = await User.create({
      username: userName,
      name: name?.trim() || "",
      email: userEmail,
      password: hashedPassword
    });

    // 7️⃣ Return response with token
    return res.status(201).json({
      message: "Signup successful",
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

/* =========================
   LOGIN CONTROLLER
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userEmail = email?.trim().toLowerCase();

    // 1️⃣ Required fields
    if (!userEmail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2️⃣ Email format check
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // 3️⃣ Find user
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // 4️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    // 5️⃣ Return token + user
    return res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

/* =========================
   GET PROFILE CONTROLLER
========================= */
export const getProfile = async (req, res) => {
  try {
    // 1️⃣ User should already be attached by protect middleware
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2️⃣ Return user profile
    return res.status(200).json({ user });

  } catch (error) {
    console.error("GetProfile Error:", error);
    return res.status(500).json({ message: "Server error fetching profile" });
  }
};





