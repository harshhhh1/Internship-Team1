import Owner from "../models/Owner.js";

// Update Owner Subscription Plan
export const updatePlan = async (req, res) => {
    try {
        const ownerId = req.user.id; // From auth middleware
        const { planName, price, branchLimit, billingCycle } = req.body;

        if (!planName) {
            return res.status(400).json({ message: "Plan name is required" });
        }

        const updatedOwner = await Owner.findByIdAndUpdate(
            ownerId,
            {
                $set: {
                    subscription: {
                        planName,
                        price: Number(price) || 0,
                        branchLimit: Number(branchLimit) || 1,
                        billingCycle: billingCycle || 'monthly',
                        startDate: new Date(),
                        isActive: true
                    }
                }
            },
            { new: true }
        ).select("-password");

        if (!updatedOwner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        res.status(200).json({
            message: "Plan updated successfully",
            subscription: updatedOwner.subscription
        });

    } catch (error) {
        console.error("Error updating plan:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
