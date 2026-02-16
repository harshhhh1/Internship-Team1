import Walkin from "../models/Walkin.js";

// Define available time slots for walk-ins (9 AM to 7 PM, hourly slots)
const TIME_SLOTS = [
    "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", 
    "17:00", "18:00", "19:00"
];

export const createWalkin = async (req, res) => {
    try {
        const { salonId, clientName, clientMobile, serviceId, staffId, price, date, timeSlot } = req.body;

        // Check for slot availability if date and timeSlot are provided
        if (date && timeSlot) {
            const slotDate = new Date(date);
            slotDate.setHours(0, 0, 0, 0);
            const slotDateEnd = new Date(date);
            slotDateEnd.setHours(23, 59, 59, 999);

            // Check if slot is already booked for this date
            const existingBooking = await Walkin.findOne({
                salonId,
                date: { $gte: slotDate, $lte: slotDateEnd },
                timeSlot,
                status: { $in: ['waiting', 'in-service'] }
            });

            if (existingBooking) {
                return res.status(400).json({ 
                    message: `Time slot ${timeSlot} is already booked for this date. Please select a different time.`,
                    availableSlots: await getAvailableSlotsForSalon(salonId, date)
                });
            }
        }

        const newWalkin = new Walkin({
            salonId,
            clientName,
            clientMobile,
            serviceId,
            staffId,
            price,
            date: date || new Date(),
            timeSlot: timeSlot || null,
            status: "waiting"
        });

        await newWalkin.save();
        res.status(201).json(newWalkin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Helper function to get available slots for a salon on a specific date
const getAvailableSlotsForSalon = async (salonId, date) => {
    const slotDate = new Date(date);
    slotDate.setHours(0, 0, 0, 0);
    const slotDateEnd = new Date(date);
    slotDateEnd.setHours(23, 59, 59, 999);

    // Get all bookings for this date that are not cancelled
    const bookings = await Walkin.find({
        salonId,
        date: { $gte: slotDate, $lte: slotDateEnd },
        status: { $in: ['waiting', 'in-service'] }
    }).select('timeSlot');

    const bookedSlots = bookings.map(b => b.timeSlot).filter(Boolean);
    
    // Return available slots
    return TIME_SLOTS.filter(slot => !bookedSlots.includes(slot));
};

export const getAvailableSlots = async (req, res) => {
    try {
        const { salonId, date } = req.query;

        if (!salonId || !date) {
            return res.status(400).json({ message: "salonId and date are required" });
        }

        const availableSlots = await getAvailableSlotsForSalon(salonId, date);

        res.status(200).json({
            date,
            slots: TIME_SLOTS,
            availableSlots,
            bookedSlots: TIME_SLOTS.filter(slot => !availableSlots.includes(slot))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWalkinStats = async (req, res) => {
    try {
        const { salonId } = req.query;
        const filter = salonId ? { salonId } : {};

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // Today's stats
        const todayWalkins = await Walkin.find({
            ...filter,
            date: { $gte: today, $lte: todayEnd }
        });

        const todayWaiting = todayWalkins.filter(w => w.status === 'waiting').length;
        const todayInService = todayWalkins.filter(w => w.status === 'in-service').length;
        const todayCompleted = todayWalkins.filter(w => w.status === 'completed').length;
        const todayRevenue = todayWalkins
            .filter(w => w.status === 'completed')
            .reduce((sum, w) => sum + w.price, 0);

        // This week's stats
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        
        const weekWalkins = await Walkin.find({
            ...filter,
            date: { $gte: weekStart, $lte: todayEnd }
        });

        const weekCompleted = weekWalkins.filter(w => w.status === 'completed').length;
        const weekRevenue = weekWalkins
            .filter(w => w.status === 'completed')
            .reduce((sum, w) => sum + w.price, 0);

        // This month's stats
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        const monthWalkins = await Walkin.find({
            ...filter,
            date: { $gte: monthStart, $lte: todayEnd }
        });

        const monthCompleted = monthWalkins.filter(w => w.status === 'completed').length;
        const monthRevenue = monthWalkins
            .filter(w => w.status === 'completed')
            .reduce((sum, w) => sum + w.price, 0);

        res.status(200).json({
            today: {
                total: todayWalkins.length,
                waiting: todayWaiting,
                inService: todayInService,
                completed: todayCompleted,
                revenue: todayRevenue
            },
            thisWeek: {
                completed: weekCompleted,
                revenue: weekRevenue
            },
            thisMonth: {
                completed: monthCompleted,
                revenue: monthRevenue
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWalkinsBySalon = async (req, res) => {
    try {
        const { salonId, date } = req.query;
        let query = salonId ? { salonId } : {};

        // Filter by date if provided
        if (date) {
            const filterDate = new Date(date);
            filterDate.setHours(0, 0, 0, 0);
            const filterDateEnd = new Date(date);
            filterDateEnd.setHours(23, 59, 59, 999);
            query.date = { $gte: filterDate, $lte: filterDateEnd };
        }

        const walkins = await Walkin.find(query)
            .sort({ date: -1 })
            .populate("staffId", "name");

        res.status(200).json(walkins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateWalkinStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedWalkin = await Walkin.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedWalkin) {
            return res.status(404).json({ message: "Walk-in not found" });
        }

        res.status(200).json(updatedWalkin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteWalkin = async (req, res) => {
    try {
        const { id } = req.params;
        await Walkin.findByIdAndDelete(id);
        res.status(200).json({ message: "Walk-in deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
