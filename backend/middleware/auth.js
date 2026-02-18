import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Owner from '../models/Owner.js';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check if trial has expired and lock the application
export const checkTrialStatus = async (req, res, next) => {
  try {
    // Only check for owners
    if (req.user.role !== 'owner') {
      return next();
    }

    const owner = await Owner.findById(req.user.id);
    
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found' });
    }

    // If trial is not active (user has a paid plan), allow access
    if (!owner.isTrialActive) {
      return next();
    }

    // Check if trial has expired
    const now = new Date();
    const trialEnd = new Date(owner.trialEndDate);

    if (now > trialEnd) {
      return res.status(403).json({ 
        error: 'TRIAL_EXPIRED',
        message: 'Your 14-day free trial has expired. Please subscribe to continue using the application.',
        trialExpired: true
      });
    }

    next();
  } catch (error) {
    console.error('Trial Status Check Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to require owner role
export const requireOwner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ error: 'Access denied. Owner role required.' });
  }
  next();
};

// Middleware to require staff role (includes owners and all staff types)
export const requireStaff = (req, res, next) => {
  // Allow owners and all staff roles (stylist, assistant, admin, receptionist, etc.)
  const allowedRoles = ['owner', 'stylist', 'assistant', 'admin', 'receptionist'];

  if (allowedRoles.includes(req.user.role)) {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Staff or owner role required.' });
  }
};
// Middleware to require admin or owner role
export const requireAdmin = (req, res, next) => {
  const allowedRoles = ['owner', 'admin'];
  if (allowedRoles.includes(req.user.role)) {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Admin or owner role required.' });
  }
};

// Middleware to require receptionist role (ONLY receptionist can add/edit/delete inventory)
export const requireReceptionist = (req, res, next) => {
  // Only receptionist role can add/edit/delete inventory
  // Admin and Owner can only view
  if (req.user.role === 'receptionist') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Only receptionist can manage inventory.' });
  }
};

