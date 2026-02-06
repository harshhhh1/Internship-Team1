import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
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
