import Appointment from "../models/Appointment.js";
import mongoose from "mongoose";
import Salon from "../models/Salon.js";
import Staff from "../models/Staff.js";

export const createAppointment = async (req, res) => {
    try {
        const { salonId } = req.body;

        if (!salonId) {
            return res.status(400).json({ message: "Salon ID is required" });
        }

        const salon = await Salon.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }

        const appointment = new Appointment({
            ...req.body,
            ownerId: salon.ownerId
        });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const { salonId, staffId, date } = req.query;
        let filter = {};

        if (req.user && req.user.role === 'owner') {
            // Force owner isolation
            filter.ownerId = req.user.id;
            if (salonId) filter.salonId = salonId;
        } else if (req.user) {
            // Check if specific salon requested, otherwise default to staff's salon
            if (salonId) {
                filter.salonId = salonId;
            } else {
                // Handle staff roles (receptionist, stylist, etc.)
                const userStaff = await Staff.findById(req.user.id);
                if (userStaff && userStaff.salonId) {
                    filter.salonId = userStaff.salonId;
                } else {
                    return res.status(200).json([]);
                }
            }
        }

        if (staffId) filter.staffId = staffId;
        if (date) {
            // Simple date matching (start of day to end of day)
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            filter.date = { $gte: start, $lte: end };
        }

        const appointments = await Appointment.find(filter)
            .populate('salonId', 'name')
            .populate('staffId', 'name')
            .populate('serviceId', 'name price duration');

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const completeAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        if (appointment.status === 'completed') {
            return res.status(400).json({ message: "Appointment already completed" });
        }

        // Update appointment status
        appointment.status = 'completed';
        await appointment.save();

        // Increment staff appointment count
        if (appointment.staffId) {
            await mongoose.model('Staff').findByIdAndUpdate(
                appointment.staffId,
                { $inc: { appointmentCount: 1 } }
            );
        }

        res.status(200).json({ message: "Appointment completed successfully", appointment });
    } catch (error) {
        console.error("Complete Appointment Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getTodayStats = async (req, res) => {
    try {
        const { salonId } = req.query;
        let filter = {};

        // Set up date filter for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        filter.date = { $gte: today, $lt: tomorrow };

        // Apply role-based filtering
        if (req.user && req.user.role === 'owner') {
            filter.ownerId = req.user.id;
            if (salonId) filter.salonId = salonId;
        } else if (req.user) {
            // For staff (including receptionist), filter by their salon
            if (salonId) {
                filter.salonId = salonId;
            } else {
                const userStaff = await Staff.findById(req.user.id);
                if (userStaff && userStaff.salonId) {
                    filter.salonId = userStaff.salonId;
                } else {
                    return res.status(200).json({ customerCount: 0, revenue: 0 });
                }
            }
        }

        // Get all appointments for today
        const appointments = await Appointment.find(filter)
            .populate('serviceId', 'price');

        // Calculate customer count (total appointments today)
        const customerCount = appointments.length;

        // Calculate revenue (only from completed appointments)
        const revenue = appointments
            .filter(app => app.status === 'completed')
            .reduce((sum, app) => {
                const price = app.serviceId?.price || 0;
                return sum + price;
            }, 0);

        res.status(200).json({ customerCount, revenue });
    } catch (error) {
        console.error("Get Today Stats Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getRevenueStats = async (req, res) => {
    try {
        const { salonId } = req.query;
        let matchFilter = {};

        // Apply role-based filtering
        if (req.user && req.user.role === 'owner') {
            matchFilter.ownerId = new mongoose.Types.ObjectId(req.user.id);
            if (salonId) matchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        } else if (salonId) {
            matchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        }

        // Get data for the last 7 months
        const months = [];
        const now = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                name: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
            });
        }

        // Monthly revenue from completed appointments
        const revenueData = await Appointment.aggregate([
            {
                $match: {
                    ...matchFilter,
                    status: 'completed',
                    date: { $gte: new Date(months[0].year, months[0].month - 1, 1) }
                }
            },
            {
                $lookup: {
                    from: 'services',
                    localField: 'serviceId',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            { $unwind: { path: '$service', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' }
                    },
                    revenue: { $sum: { $ifNull: ['$service.price', 0] } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Map revenue data to months
        const monthlyRevenue = months.map(m => {
            const found = revenueData.find(r => r._id.year === m.year && r._id.month === m.month);
            return {
                name: m.name,
                value: found ? found.revenue : 0
            };
        });

        // Calculate this month's revenue
        const currentMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1]?.value || 0;
        const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2]?.value || 0;
        const revenueTrend = lastMonthRevenue > 0
            ? (((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(0)
            : (currentMonthRevenue > 0 ? 100 : 0);

        // Total income (all time)
        const totalIncomeResult = await Appointment.aggregate([
            {
                $match: {
                    ...matchFilter,
                    status: 'completed'
                }
            },
            {
                $lookup: {
                    from: 'services',
                    localField: 'serviceId',
                    foreignField: '_id',
                    as: 'service'
                }
            },
            { $unwind: { path: '$service', preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $ifNull: ['$service.price', 0] } }
                }
            }
        ]);
        const totalIncome = totalIncomeResult[0]?.total || 0;

        // Monthly income trend (cumulative)
        let cumulative = 0;
        const incomeData = monthlyRevenue.map(m => {
            cumulative += m.value;
            return { name: m.name, value: cumulative };
        });

        // Client count by month
        const Client = mongoose.model('Client');
        const clientFilter = salonId ? { salonId: new mongoose.Types.ObjectId(salonId) } : {};

        const clientData = await Client.aggregate([
            { $match: clientFilter },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        // Map client data - show cumulative growth
        let cumulativeClients = 0;
        const monthlyClients = months.map(m => {
            const found = clientData.find(c => c._id.year === m.year && c._id.month === m.month);
            cumulativeClients += found ? found.count : 0;
            return {
                name: m.name,
                value: cumulativeClients
            };
        });

        const totalClients = await Client.countDocuments(clientFilter);
        const thisMonthClients = clientData.find(c =>
            c._id.year === now.getFullYear() && c._id.month === now.getMonth() + 1
        )?.count || 0;
        const lastMonthClients = clientData.find(c =>
            c._id.year === (now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()) &&
            c._id.month === (now.getMonth() === 0 ? 12 : now.getMonth())
        )?.count || 0;
        const clientTrend = lastMonthClients > 0
            ? (((thisMonthClients - lastMonthClients) / lastMonthClients) * 100).toFixed(0)
            : (thisMonthClients > 0 ? 100 : 0);

        res.status(200).json({
            revenueThisMonth: {
                value: currentMonthRevenue,
                trend: revenueTrend,
                data: monthlyRevenue
            },
            totalIncome: {
                value: totalIncome,
                trend: revenueTrend,
                data: incomeData
            },
            clients: {
                value: totalClients,
                trend: clientTrend,
                data: monthlyClients
            }
        });
    } catch (error) {
        console.error("Get Revenue Stats Error:", error);
        res.status(500).json({ message: error.message });
    }
};
