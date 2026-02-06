import mongoose from "mongoose";
import dotenv from "dotenv";
import Staff from "./models/Staff.js";
import Owner from "./models/Owner.js";

dotenv.config();

const MONGO_URI = process.env.ATLAS_URI;

async function checkStaff() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        console.log("\n=== CHECKING STAFF ACCOUNTS ===");
        const staffMembers = await Staff.find({});
        console.log(`Found ${staffMembers.length} staff members:`);
        staffMembers.forEach((staff, index) => {
            console.log(`\n${index + 1}. Staff Member:`);
            console.log(`   ID: ${staff._id}`);
            console.log(`   Name: ${staff.name}`);
            console.log(`   Email: ${staff.email}`);
            console.log(`   Role: ${staff.role}`);
            console.log(`   Has Password: ${!!staff.password}`);
            console.log(`   Is Active: ${staff.isActive}`);
        });

        console.log("\n=== CHECKING OWNER ACCOUNTS ===");
        const owners = await Owner.find({});
        console.log(`Found ${owners.length} owners:`);
        owners.forEach((owner, index) => {
            console.log(`\n${index + 1}. Owner:`);
            console.log(`   ID: ${owner._id}`);
            console.log(`   Name: ${owner.name}`);
            console.log(`   Email: ${owner.email}`);
            console.log(`   Has Password: ${!!owner.password}`);
        });

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkStaff();
