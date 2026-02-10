import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Staff from "./models/Staff.js";

dotenv.config();

const MONGO_URI = process.env.ATLAS_URI;

async function testPassword() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        // Test with a known staff email
        const testEmail = "jejus@gmail.com";
        console.log(`\nTesting authentication for: ${testEmail}`);

        const staff = await Staff.findOne({ email: testEmail });

        if (!staff) {
            console.log("❌ Staff member not found!");
            await mongoose.disconnect();
            process.exit(1);
        }

        console.log("\n✅ Staff member found:");
        console.log(`   Name: ${staff.name}`);
        console.log(`   Email: ${staff.email}`);
        console.log(`   Role: ${staff.role}`);
        console.log(`   Has Password: ${!!staff.password}`);
        console.log(`   Password Hash: ${staff.password}`);

        // Test a few common passwords
        const testPasswords = ["password", "123456", "jejus", "jejus123", "Password123"];

        console.log("\n🔐 Testing common passwords:");
        for (const pwd of testPasswords) {
            const isMatch = await bcrypt.compare(pwd, staff.password);
            console.log(`   "${pwd}": ${isMatch ? '✅ MATCH' : '❌ no match'}`);
        }

        console.log("\n💡 If none of these match, you need to know the actual password.");
        console.log("   Or you can reset it by updating the staff record in the database.");

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

testPassword();
