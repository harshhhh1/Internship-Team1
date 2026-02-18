import Attendance from "../models/Attendance.js";
import Staff from "../models/Staff.js";

// Helper to normalize date to midnight UTC to avoid timezone issues
const normalizeDate = (date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
};

// Helper to get week start and end dates
const getWeekDates = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    const start = new Date(d.setDate(diff));
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    end.setUTCHours(23, 59, 59, 999);
    return { start, end };
};

// Get weekly attendance report
export const getWeeklyAttendance = async (req, res) => {
    try {
        const { salonId, staffId, weekStart } = req.query;

        if (!salonId) {
            return res.status(400).json({ message: "Salon ID is required" });
        }

        const { start, end } = getWeekDates(weekStart ? new Date(weekStart) : new Date());

        // Build filter
        const filter = {
            salonId,
            date: { $gte: start, $lte: end }
        };
        if (staffId) filter.staffId = staffId;

        // Get all attendance records for the week
        const records = await Attendance.find(filter).populate('staffId', 'name role profession');

        // Get all active staff for the salon
        const staffFilter = { salonId, isActive: true };
        if (staffId) staffFilter._id = staffId;
        const staffMembers = await Staff.find(staffFilter).select('name role profession');

        // Build result with all days of the week
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const weekData = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(start);
            currentDate.setDate(currentDate.getDate() + i);
            const normalizedCurrentDate = normalizeDate(currentDate);

            const dayRecords = records.filter(r => {
                const recordDate = new Date(r.date);
                return recordDate.toISOString().split('T')[0] === normalizedCurrentDate.toISOString().split('T')[0];
            });

            weekData.push({
                day: days[i],
                date: normalizedCurrentDate,
                records: dayRecords
            });
        }

        // Calculate summary
        const summary = {
            totalPresent: records.filter(r => r.status === 'Present').length,
            totalAbsent: records.filter(r => r.status === 'Absent').length,
            totalHalfDay: records.filter(r => r.status === 'Half Day').length,
            totalLeave: records.filter(r => r.status === 'Leave').length
        };

        res.status(200).json({ weekData, summary, staffMembers });
    } catch (error) {
        console.error("Get Weekly Attendance Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get monthly attendance report
export const getMonthlyAttendanceReport = async (req, res) => {
    try {
        const { salonId, staffId, month, year } = req.query;

        if (!salonId || !month || !year) {
            return res.status(400).json({ message: "Salon ID, Month, and Year are required" });
        }

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));

        // Build filter
        const filter = {
            salonId,
            date: { $gte: startDate, $lte: endDate }
        };
        if (staffId) filter.staffId = staffId;

        // Get all attendance records for the month
        const records = await Attendance.find(filter).populate('staffId', 'name role profession');

        // Get all active staff for the salon
        const staffFilter = { salonId, isActive: true };
        if (staffId) staffFilter._id = staffId;
        const staffMembers = await Staff.find(staffFilter).select('name role profession');

        // Group by staff
        const staffAttendance = staffMembers.map(staff => {
            const staffRecords = records.filter(r => r.staffId && r.staffId._id.toString() === staff._id.toString());
            return {
                staff: {
                    _id: staff._id,
                    name: staff.name,
                    role: staff.role,
                    profession: staff.profession
                },
                present: staffRecords.filter(r => r.status === 'Present').length,
                absent: staffRecords.filter(r => r.status === 'Absent').length,
                halfDay: staffRecords.filter(r => r.status === 'Half Day').length,
                leave: staffRecords.filter(r => r.status === 'Leave').length,
                total: staffRecords.length,
                records: staffRecords
            };
        });

        // Calculate overall summary
        const summary = {
            totalPresent: records.filter(r => r.status === 'Present').length,
            totalAbsent: records.filter(r => r.status === 'Absent').length,
            totalHalfDay: records.filter(r => r.status === 'Half Day').length,
            totalLeave: records.filter(r => r.status === 'Leave').length,
            totalRecords: records.length
        };

        // Get month name
        const monthName = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        res.status(200).json({ 
            month: monthName, 
            staffAttendance, 
            summary,
            totalStaff: staffMembers.length
        });
    } catch (error) {
        console.error("Get Monthly Attendance Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get yearly attendance report
export const getYearlyAttendanceReport = async (req, res) => {
    try {
        const { salonId, staffId, year } = req.query;

        if (!salonId || !year) {
            return res.status(400).json({ message: "Salon ID and Year are required" });
        }

        const startDate = new Date(Date.UTC(year, 0, 1));
        const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59));

        // Build filter
        const filter = {
            salonId,
            date: { $gte: startDate, $lte: endDate }
        };
        if (staffId) filter.staffId = staffId;

        // Get all attendance records for the year
        const records = await Attendance.find(filter).populate('staffId', 'name role profession');

        // Get all active staff for the salon
        const staffFilter = { salonId, isActive: true };
        if (staffId) staffFilter._id = staffId;
        const staffMembers = await Staff.find(staffFilter).select('name role profession');

        // Group by month
        const monthlyData = [];
        for (let month = 0; month < 12; month++) {
            const monthStart = new Date(Date.UTC(year, month, 1));
            const monthEnd = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));
            
            const monthRecords = records.filter(r => {
                const recordDate = new Date(r.date);
                return recordDate >= monthStart && recordDate <= monthEnd;
            });

            const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });

            monthlyData.push({
                month: monthName,
                monthNum: month + 1,
                present: monthRecords.filter(r => r.status === 'Present').length,
                absent: monthRecords.filter(r => r.status === 'Absent').length,
                halfDay: monthRecords.filter(r => r.status === 'Half Day').length,
                leave: monthRecords.filter(r => r.status === 'Leave').length,
                total: monthRecords.length
            });
        }

        // Calculate yearly summary
        const summary = {
            totalPresent: records.filter(r => r.status === 'Present').length,
            totalAbsent: records.filter(r => r.status === 'Absent').length,
            totalHalfDay: records.filter(r => r.status === 'Half Day').length,
            totalLeave: records.filter(r => r.status === 'Leave').length,
            totalRecords: records.length
        };

        res.status(200).json({ 
            year: year, 
            monthlyData, 
            summary,
            totalStaff: staffMembers.length
        });
    } catch (error) {
        console.error("Get Yearly Attendance Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get attendance calendar view for a specific month
export const getAttendanceCalendar = async (req, res) => {
    try {
        const { salonId, staffId, month, year } = req.query;

        if (!salonId || !month || !year) {
            return res.status(400).json({ message: "Salon ID, Month, and Year are required" });
        }

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 0)); // Last day of month
        const daysInMonth = endDate.getDate();

        // Build filter
        const filter = {
            salonId,
            date: { $gte: startDate, $lte: endDate }
        };
        if (staffId) filter.staffId = staffId;

        // Get all attendance records for the month
        const records = await Attendance.find(filter).populate('staffId', 'name role profession');

        // Get all active staff for the salon
        const staffFilter = { salonId, isActive: true };
        if (staffId) staffFilter._id = staffId;
        const staffMembers = await Staff.find(staffFilter).select('name role profession');

        // Build calendar data
        const calendarData = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(Date.UTC(year, month - 1, day));
            const normalizedDate = normalizeDate(currentDate);

            const dayRecords = records.filter(r => {
                const recordDate = new Date(r.date);
                return recordDate.toISOString().split('T')[0] === normalizedDate.toISOString().split('T')[0];
            });

            calendarData.push({
                day: day,
                date: normalizedDate,
                records: dayRecords
            });
        }

        // Calculate summary for the month
        const summary = {
            present: records.filter(r => r.status === 'Present').length,
            absent: records.filter(r => r.status === 'Absent').length,
            halfDay: records.filter(r => r.status === 'Half Day').length,
            leave: records.filter(r => r.status === 'Leave').length,
            total: records.length
        };

        const monthName = startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        res.status(200).json({
            month: monthName,
            calendarData,
            summary,
            staffMembers,
            totalStaff: staffMembers.length
        });
    } catch (error) {
        console.error("Get Attendance Calendar Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Existing functions remain the same
export const markAttendance = async (req, res) => {
    try {
        const { staffId, salonId, date, status, checkIn, checkOut, remarks, leaveType } = req.body;

        if (!staffId || !salonId || !date) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const normalizedDate = normalizeDate(date);

        const filter = { staffId, date: normalizedDate };
        const update = {
            salonId,
            status,
            remarks,
            leaveType: status === 'Leave' ? leaveType : null
        };

        // Only update times if provided
        if (checkIn !== undefined) update.checkIn = checkIn;
        if (checkOut !== undefined) update.checkOut = checkOut;

        const attendance = await Attendance.findOneAndUpdate(
            filter,
            update,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(200).json(attendance);
    } catch (error) {
        console.error("Mark Attendance Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getDailyAttendance = async (req, res) => {
    try {
        const { salonId, date } = req.query;

        if (!salonId || !date) {
            return res.status(400).json({ message: "Salon ID and Date are required" });
        }

        const normalizedDate = normalizeDate(date);

        // Fetch all active staff for this salon
        const staffMembers = await Staff.find({ salonId, isActive: true }).select('name role profession avatarUrl mobile');

        // Fetch existing attendance records for this date
        const attendanceRecords = await Attendance.find({
            salonId,
            date: normalizedDate
        });

        // Merge staff with their attendance record
        const result = staffMembers.map(staff => {
            const record = attendanceRecords.find(a => a.staffId.toString() === staff._id.toString());
            return {
                staff,
                attendance: record || null
            };
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Get Daily Attendance Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getMonthlyAttendance = async (req, res) => {
    try {
        const { staffId, month, year } = req.query;

        if (!staffId || !month || !year) {
            return res.status(400).json({ message: "Staff ID, Month, and Year are required" });
        }

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59));

        const records = await Attendance.find({
            staffId,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 });

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const bulkUpdateAttendance = async (req, res) => {
    try {
        const { salonId, date, updates } = req.body;
        // updates: Array of { staffId, status, checkIn, checkOut, remarks, ... }

        if (!updates || !Array.isArray(updates)) {
            return res.status(400).json({ message: "Invalid updates format" });
        }

        const normalizedDate = normalizeDate(date);
        const operations = updates.map(update => ({
            updateOne: {
                filter: { staffId: update.staffId, date: normalizedDate },
                update: {
                    $set: {
                        salonId,
                        status: update.status,
                        checkIn: update.checkIn,
                        checkOut: update.checkOut,
                        remarks: update.remarks,
                        leaveType: update.status === 'Leave' ? update.leaveType : null
                    }
                },
                upsert: true
            }
        }));

        if (operations.length > 0) {
            await Attendance.bulkWrite(operations);
        }

        res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
        console.error("Bulk Update Error:", error);
        res.status(500).json({ message: error.message });
    }
};