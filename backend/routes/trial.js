import express from 'express';
import Owner from '../models/Owner.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get trial status
router.get('/trial-status', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        
        const owner = await Owner.findById(userId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const now = new Date();
        const trialEnd = new Date(owner.trialEndDate);
        
        let trialStatus;
        if (owner.isTrialActive && now > trialEnd) {
            // Trial has expired
            trialStatus = {
                isTrialActive: false,
                trialExpired: true,
                message: "Your 14-day free trial has expired. Please subscribe to continue using the application.",
                trialEndDate: owner.trialEndDate
            };
        } else if (owner.isTrialActive) {
            // Calculate days remaining
            const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
            trialStatus = {
                isTrialActive: true,
                trialExpired: false,
                daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
                trialEndDate: owner.trialEndDate,
                trialStartDate: owner.trialStartDate
            };
        } else {
            trialStatus = {
                isTrialActive: false,
                trialExpired: false,
                message: "You are on a paid plan.",
                subscription: owner.subscription
            };
        }

        res.status(200).json(trialStatus);
    } catch (error) {
        console.error("Get Trial Status Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Activate plan (end trial)
router.post('/activate-plan', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const { planName, price, branchLimit, billingCycle } = req.body;

        const owner = await Owner.findById(userId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        // Update subscription and disable trial
        owner.subscription = {
            planName: planName || 'Basic Care',
            price: price || 0,
            branchLimit: branchLimit || 1,
            billingCycle: billingCycle || 'monthly',
            startDate: new Date(),
            isActive: true
        };
        owner.isTrialActive = false;
        
        await owner.save();

        res.status(200).json({ 
            message: "Plan activated successfully. Trial period ended.",
            subscription: owner.subscription,
            isTrialActive: false
        });
    } catch (error) {
        console.error("Activate Plan Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
