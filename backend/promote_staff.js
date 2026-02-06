import mongoose from "mongoose";
import dotenv from "dotenv";
import Staff from "./models/Staff.js";

dotenv.config();

const MONGO_URI = process.env.ATLAS_URI;

async function promoteToAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        const email = "jejus@gmail.com";
        const staff = await Staff.findOneAndUpdate({ email }, { role: 'admin' }, { new: true });

        if (staff) {
            console.log(`✅ ${staff.name} (${staff.email}) has been promoted to admin.`);
        } else {
            console.log("❌ Staff member not found.");
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

promoteToAdmin();
