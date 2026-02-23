import Customer from "../models/Customer.js";
import Appointment from "../models/Appointment.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Use the same JWT_SECRET as the auth middleware
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// In-memory store for rate limiting (in production, use Redis)
const loginAttempts = new Map();
const SIGNUP_COOLDOWN = new Map();

// Rate limiting configuration
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const SIGNUP_COOLDOWN_DURATION = 60 * 1000; // 1 minute between signups from same IP

// Helper function to check rate limit for login
const checkLoginRateLimit = (identifier) => {
    const now = Date.now();
    const attempts = loginAttempts.get(identifier);
    
    if (!attempts) {
        return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS - 1 };
    }
    
    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
        if (now - attempts.lastAttempt < LOCKOUT_DURATION) {
            const remainingTime = Math.ceil((LOCKOUT_DURATION - (now - attempts.lastAttempt)) / 1000);
            return { allowed: false, remainingTime, message: `Account locked. Try again in ${remainingTime} seconds.` };
        } else {
            // Reset after lockout period
            loginAttempts.set(identifier, { count: 1, lastAttempt: now });
            return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS - 1 };
        }
    }
    
    return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS - attempts.count - 1 };
};

// Helper function to record failed login attempt
const recordFailedLogin = (identifier) => {
    const now = Date.now();
    const attempts = loginAttempts.get(identifier);
    
    if (!attempts) {
        loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    } else {
        attempts.count += 1;
        attempts.lastAttempt = now;
    }
};

// Helper function to reset login attempts on success
const resetLoginAttempts = (identifier) => {
    loginAttempts.delete(identifier);
};

// Helper function to check signup cooldown
const checkSignupCooldown = (email) => {
    const now = Date.now();
    const lastSignup = SIGNUP_COOLDOWN.get(email);
    
    if (lastSignup && now - lastSignup < SIGNUP_COOLDOWN_DURATION) {
        const remainingTime = Math.ceil((SIGNUP_COOLDOWN_DURATION - (now - lastSignup)) / 1000);
        return { allowed: false, remainingTime };
    }
    
    return { allowed: true };
};

// Customer Signup
export const customerSignup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one lowercase letter" });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one number" });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one special character" });
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Please enter a valid 10-digit phone number" });
        }

        // Name validation
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        if (!nameRegex.test(name)) {
            return res.status(400).json({ message: "Name must be 2-50 characters and contain only letters and spaces" });
        }

        // Check signup cooldown
        const cooldownCheck = checkSignupCooldown(email);
        if (!cooldownCheck.allowed) {
            return res.status(429).json({ 
                message: `Please wait ${cooldownCheck.remainingTime} seconds before trying to signup again.` 
            });
        }

        // Check if customer already exists
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(409).json({ message: "Customer with this email already exists" });
        }

        // Check if phone number already exists
        const existingPhone = await Customer.findOne({ phone });
        if (existingPhone) {
            return res.status(409).json({ message: "Customer with this phone number already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new customer
        const newCustomer = new Customer({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await newCustomer.save();

        // Record signup time for cooldown
        SIGNUP_COOLDOWN.set(email, Date.now());

        // Generate token
        const token = jwt.sign(
            { id: newCustomer._id, role: 'customer' },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            message: "Customer registered successfully",
            token,
            customer: {
                id: newCustomer._id,
                name: newCustomer.name,
                email: newCustomer.email,
                phone: newCustomer.phone
            }
        });
    } catch (error) {
        console.error("Customer Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Customer Signin
export const customerSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        // Check rate limit
        const rateLimitCheck = checkLoginRateLimit(email);
        if (!rateLimitCheck.allowed) {
            return res.status(429).json({ 
                message: rateLimitCheck.message,
                remainingTime: rateLimitCheck.remainingTime
            });
        }

        // Find customer
        const customer = await Customer.findOne({ email });
        if (!customer) {
            recordFailedLogin(email);
            return res.status(401).json({ 
                message: "Invalid credentials",
                remainingAttempts: rateLimitCheck.remaining
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            recordFailedLogin(email);
            const updatedRateLimit = checkLoginRateLimit(email);
            return res.status(401).json({ 
                message: "Invalid credentials",
                remainingAttempts: updatedRateLimit.remaining
            });
        }

        // Reset login attempts on successful login
        resetLoginAttempts(email);

        // Generate token
        const token = jwt.sign(
            { id: customer._id, role: 'customer' },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone
            }
        });
    } catch (error) {
        console.error("Customer Signin Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Customer Profile
export const getCustomerProfile = async (req, res) => {
    try {
        const customer = await Customer.findById(req.user.id).select('-password');
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error("Get Customer Profile Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update Customer Profile
export const updateCustomerProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        
        const customer = await Customer.findByIdAndUpdate(
            req.user.id,
            { name, phone },
            { new: true }
        ).select('-password');

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", customer });
    } catch (error) {
        console.error("Update Customer Profile Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Customer's Bookings
export const getMyBookings = async (req, res) => {
    try {
        const appointments = await Appointment.find({ customerId: req.user.id })
            .populate('salonId', 'name')
            .populate('staffId', 'name')
            .sort({ date: -1 });

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Get My Bookings Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Change Customer Password
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current password and new password are required" });
        }

        // Validate new password strength
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "New password must be at least 8 characters long" });
        }
        if (!/[A-Z]/.test(newPassword)) {
            return res.status(400).json({ message: "New password must contain at least one uppercase letter" });
        }
        if (!/[a-z]/.test(newPassword)) {
            return res.status(400).json({ message: "New password must contain at least one lowercase letter" });
        }
        if (!/[0-9]/.test(newPassword)) {
            return res.status(400).json({ message: "New password must contain at least one number" });
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            return res.status(400).json({ message: "New password must contain at least one special character" });
        }

        // Find customer
        const customer = await Customer.findById(req.user.id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, customer.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        customer.password = hashedPassword;
        await customer.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
