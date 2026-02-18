import express from 'express';
import { 
    setAvailability, 
    getStaffAvailability, 
    getSalonStaffAvailability, 
    checkAvailability,
    getAvailableSlots 
} from '../controllers/availability.controller.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Set staff availability (requires authentication)
router.post('/', authenticateToken, setAvailability);

// Get staff availability
router.get('/:staffId', authenticateToken, getStaffAvailability);

// Get all staff availability for a salon
router.get('/salon/:salonId', authenticateToken, getSalonStaffAvailability);

// Check if a slot is available
router.get('/check', authenticateToken, checkAvailability);

// Get available slots for a staff member on a specific date
router.get('/slots', authenticateToken, getAvailableSlots);

export default router;

