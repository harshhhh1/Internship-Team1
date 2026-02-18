
import Staff from "../models/Staff.js";
import Appointment from "../models/Appointment.js";

// Helper to normalize date to just the date part (no time)
const normalizeDate = (date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
};

// Get day name from date
const getDayName = (date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date(date).getUTCDay()];
};

// Set staff availability
export const setAvailability = async (req, res) => {
    try {
        const { staffId, availability } = req.body;

        if (!staffId || !availability) {
            return res.status(400).json({ message: "Staff ID and availability are required" });
        }

        const staff = await Staff.findById(staffId);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        staff.availability = availability;
        await staff.save();

        res.status(200).json({ message: "Availability updated successfully", availability: staff.availability });
    } catch (error) {
        console.error("Set Availability Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get staff availability
export const getStaffAvailability = async (req, res) => {
    try {
        const { staffId } = req.params;

        const staff = await Staff.findById(staffId);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        res.status(200).json({ staffId, availability: staff.availability });
    } catch (error) {
        console.error("Get Staff Availability Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get all staff availability for a salon
export const getSalonStaffAvailability = async (req, res) => {
    try {
        const { salonId } = req.params;

        const staff = await Staff.find({ salonId, isActive: true }).select('name role profession availability');

        res.status(200).json(staff);
    } catch (error) {
        console.error("Get Salon Staff Availability Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Check if a specific slot is available
export const checkAvailability = async (req, res) => {
    try {
        const { staffId, date, timeSlot } = req.query;

        if (!staffId || !date || !timeSlot) {
            return res.status(400).json({ message: "Staff ID, date, and time slot are required" });
        }

        const staff = await Staff.findById(staffId);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        // Check if staff works on this day
        const dayName = getDayName(date);
        const dayAvailability = staff.availability[dayName];
        
        if (!dayAvailability || !dayAvailability.enabled) {
            return res.status(200).json({ available: false, reason: "Staff does not work on this day" });
        }

        // Check if the time slot is in the staff's available slots
        if (!dayAvailability.slots || !dayAvailability.slots.includes(timeSlot)) {
            return res.status(200).json({ available: false, reason: "Time slot not available for this staff" });
        }

        // Check if there's already an appointment at this time
        const normalizedDate = normalizeDate(date);
        const existingAppointment = await Appointment.findOne({
            staffId,
            date: normalizedDate,
            timeSlot,
            status: { $nin: ['cancelled'] }
        });

        if (existingAppointment) {
            return res.status(200).json({ available: false, reason: "Slot already booked" });
        }

        res.status(200).json({ available: true });
    } catch (error) {
        console.error("Check Availability Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get available slots for a staff member on a specific date
export const getAvailableSlots = async (req, res) => {
    try {
        const { staffId, date } = req.query;

        if (!staffId || !date) {
            return res.status(400).json({ message: "Staff ID and date are required" });
        }

        const staff = await Staff.findById(staffId);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        // Check if staff works on this day
        const dayName = getDayName(date);
        const dayAvailability = staff.availability[dayName];
        
        if (!dayAvailability || !dayAvailability.enabled) {
            return res.status(200).json({ availableSlots: [], reason: "Staff does not work on this day" });
        }

        // Get all appointments for this staff on this date
        const normalizedDate = normalizeDate(date);
        const appointments = await Appointment.find({
            staffId,
            date: normalizedDate,
            status: { $nin: ['cancelled'] }
        }).select('timeSlot');

        const bookedSlots = appointments.map(a => a.timeSlot);

        // Filter out booked slots
        const availableSlots = dayAvailability.slots.filter(slot => !bookedSlots.includes(slot));

        res.status(200).json({ 
            availableSlots, 
            dayAvailability: dayAvailability.slots,
            bookedSlots 
        });
    } catch (error) {
        console.error("Get Available Slots Error:", error);
        res.status(500).json({ message: error.message });
    }
};

