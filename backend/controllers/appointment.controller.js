import Appointment from "../models/Appointment.js";
import mongoose from "mongoose";

export const createAppointment = async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const { salonId, staffId, date } = req.query;
        const filter = {};
        if (salonId) filter.salonId = salonId;
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
