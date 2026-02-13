import Appointment from "../models/Appointment.js";
import Client from "../models/Client.js";
import Payment from "../models/Payment.js";
import mongoose from "mongoose";
import Staff from "../models/Staff.js";

// Helper function to get date range based on filter
const getDateRange = (filter, referenceDate = new Date()) => {
    const date = new Date(referenceDate);
    let start, end;

    switch (filter) {
        case 'weekly':
            // Get start of current week (Sunday)
            start = new Date(date);
            start.setDate(date.getDate() - date.getDay());
            start.setHours(0, 0, 0, 0);
            // End of week (Saturday)
            end = new Date(start);
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
            break;
        case 'monthly':
            // Start of current month
            start = new Date(date.getFullYear(), date.getMonth(), 1);
            // End of current month
            end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
            break;
        case 'annually':
            // Start of current year
            start = new Date(date.getFullYear(), 0, 1);
            // End of current year
            end = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
            break;
        default:
            // Default to monthly
            start = new Date(date.getFullYear(), date.getMonth(), 1);
            end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    }

    return { start, end };
};

// Get appointments report
export const getAppointmentsReport = async (req, res) => {
    try {
        const { salonId, filter = 'monthly' } = req.query;
        const { start, end } = getDateRange(filter);

        let matchFilter = {
            date: { $gte: start, $lte: end }
        };

        if (req.user && req.user.role === 'owner') {
            matchFilter.ownerId = new mongoose.Types.ObjectId(req.user.id);
            if (salonId) matchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        } else if (salonId) {
            matchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        }

        const appointments = await Appointment.find(matchFilter)
            .populate('staffId', 'name')
            .populate('serviceId', 'name price')
            .sort({ date: -1 });

        // Calculate statistics
        const total = appointments.length;
        const completed = appointments.filter(a => a.status === 'completed').length;
        const pending = appointments.filter(a => a.status === 'pending').length;
        const confirmed = appointments.filter(a => a.status === 'confirmed').length;
        const cancelled = appointments.filter(a => a.status === 'cancelled').length;

        res.status(200).json({
            appointments,
            summary: {
                total,
                completed,
                pending,
                confirmed,
                cancelled,
                completionRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0
            }
        });
    } catch (error) {
        console.error("Get Appointments Report Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get clients report
export const getClientsReport = async (req, res) => {
    try {
        const { salonId, filter = 'monthly' } = req.query;
        const { start, end } = getDateRange(filter);

        let matchFilter = {
            createdAt: { $gte: start, $lte: end }
        };

        if (salonId) {
            matchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        }

        const clients = await Client.find(matchFilter).sort({ createdAt: -1 });

        // Get all clients for the salon (for active calculations)
        let allClientsFilter = {};
        if (salonId) {
            allClientsFilter.salonId = new mongoose.Types.ObjectId(salonId);
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const totalClients = await Client.countDocuments(allClientsFilter);
        const activeClients = await Client.countDocuments({
            ...allClientsFilter,
            lastVisit: { $gte: thirtyDaysAgo }
        });
        const vipClients = await Client.countDocuments({
            ...allClientsFilter,
            isVip: true
        });

        // Calculate new clients in period
        const newClients = clients.length;

        // Total revenue from all clients
        const totalSpentResult = await Client.aggregate([
            { $match: allClientsFilter },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalSpent' }
                }
            }
        ]);
        const totalRevenue = totalSpentResult[0]?.total || 0;

        res.status(200).json({
            clients,
            summary: {
                total: totalClients,
                newClients,
                activeClients,
                vipClients,
                totalRevenue
            }
        });
    } catch (error) {
        console.error("Get Clients Report Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get revenue/payments report
export const getRevenueReport = async (req, res) => {
    try {
        const { salonId, filter = 'monthly' } = req.query;
        const { start, end } = getDateRange(filter);

        let matchFilter = {
            createdAt: { $gte: start, $lte: end }
        };

        if (req.user && req.user.role === 'owner') {
            matchFilter.ownerId = new mongoose.Types.ObjectId(req.user.id);
            if (salonId) matchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        } else if (salonId) {
            matchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        }

        // Get payments in the period
        const payments = await Payment.find(matchFilter)
            .populate('appointmentId')
            .sort({ createdAt: -1 });

        // Calculate total revenue
        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

        // Get previous period for comparison
        const periodLength = end.getTime() - start.getTime();
        const prevStart = new Date(start.getTime() - periodLength);
        const prevEnd = new Date(start.getTime() - 1);

        let prevMatchFilter = {
            createdAt: { $gte: prevStart, $lte: prevEnd }
        };

        if (req.user && req.user.role === 'owner') {
            prevMatchFilter.ownerId = new mongoose.Types.ObjectId(req.user.id);
            if (salonId) prevMatchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        } else if (salonId) {
            prevMatchFilter.salonId = new mongoose.Types.ObjectId(salonId);
        }

        const prevPayments = await Payment.find(prevMatchFilter);
        const prevRevenue = prevPayments.reduce((sum, p) => sum + p.amount, 0);

        // Calculate growth
        const growth = prevRevenue > 0 
            ? (((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1)
            : (totalRevenue > 0 ? 100 : 0);

        // Daily breakdown for the period
        const dailyRevenue = [];
        const currentDate = new Date(start);
        while (currentDate <= end) {
            const dayStart = new Date(currentDate);
            dayStart.setHours(0, 0, 0, 0);
            const dayEnd = new Date(currentDate);
            dayEnd.setHours(23, 59, 59, 999);

            const dayPayments = payments.filter(p => 
                p.createdAt >= dayStart && p.createdAt <= dayEnd
            );
            const dayRevenue = dayPayments.reduce((sum, p) => sum + p.amount, 0);

            dailyRevenue.push({
                date: new Date(currentDate).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short' 
                }),
                revenue: dayRevenue,
                count: dayPayments.length
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        res.status(200).json({
            payments,
            summary: {
                totalRevenue,
                previousRevenue: prevRevenue,
                growth,
                transactionCount: payments.length,
                averageTransaction: payments.length > 0 
                    ? (totalRevenue / payments.length).toFixed(2) 
                    : 0
            },
            dailyRevenue
        });
    } catch (error) {
        console.error("Get Revenue Report Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get combined dashboard report
export const getDashboardReport = async (req, res) => {
    try {
        const { salonId, filter = 'monthly' } = req.query;
        const { start, end } = getDateRange(filter);

        let ownerFilter = req.user && req.user.role === 'owner' 
            ? { ownerId: new mongoose.Types.ObjectId(req.user.id) }
            : {};

        let salonFilter = salonId 
            ? { salonId: new mongoose.Types.ObjectId(salonId) }
            : {};

        // Appointments in period
        const appointmentFilter = {
            ...ownerFilter,
            ...salonFilter,
            date: { $gte: start, $lte: end }
        };

        const appointments = await Appointment.find(appointmentFilter);
        
        const totalAppointments = appointments.length;
        const completedAppointments = appointments.filter(a => a.status === 'completed').length;
        const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;

        // Clients in period
        const clientFilter = {
            ...salonFilter,
            createdAt: { $gte: start, $lte: end }
        };

        const newClients = await Client.countDocuments(clientFilter);

        // Revenue in period
        const paymentFilter = {
            ...ownerFilter,
            ...salonFilter,
            createdAt: { $gte: start, $lte: end }
        };

        const payments = await Payment.find(paymentFilter);
        const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

        // Get previous period for comparison
        const periodLength = end.getTime() - start.getTime();
        const prevStart = new Date(start.getTime() - periodLength);
        const prevEnd = new Date(start.getTime() - 1);

        const prevPaymentFilter = {
            ...ownerFilter,
            ...salonFilter,
            createdAt: { $gte: prevStart, $lte: prevEnd }
        };

        const prevPayments = await Payment.find(prevPaymentFilter);
        const prevRevenue = prevPayments.reduce((sum, p) => sum + p.amount, 0);

        const revenueGrowth = prevRevenue > 0 
            ? (((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1)
            : (totalRevenue > 0 ? 100 : 0);

        // Staff performance
        const staffFilter = {
            ...salonFilter,
            isActive: true
        };

        const staff = await Staff.find(staffFilter);
        
        const staffPerformance = await Promise.all(
            staff.map(async (s) => {
                const staffAppointments = appointments.filter(
                    a => a.staffId && a.staffId.toString() === s._id.toString()
                );
                const completed = staffAppointments.filter(a => a.status === 'completed').length;
                const revenue = staffAppointments
                    .filter(a => a.status === 'completed')
                    .reduce((sum, a) => sum + (a.price || 0), 0);

                return {
                    id: s._id,
                    name: s.name,
                    role: s.role || 'Staff',
                    totalAppointments: staffAppointments.length,
                    completedAppointments: completed,
                    revenue
                };
            })
        );

        res.status(200).json({
            summary: {
                totalAppointments,
                completedAppointments,
                cancelledAppointments,
                newClients,
                totalRevenue,
                revenueGrowth: parseFloat(revenueGrowth)
            },
            staffPerformance,
            period: {
                filter,
                startDate: start.toISOString(),
                endDate: end.toISOString()
            }
        });
    } catch (error) {
        console.error("Get Dashboard Report Error:", error);
        res.status(500).json({ message: error.message });
    }
};

