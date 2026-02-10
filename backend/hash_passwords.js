import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Staff from "./models/Staff.js";
import Owner from "./models/Owner.js";

dotenv.config();

const MONGO_URI = process.env.ATLAS_URI;

async function hashPlainTextPasswords() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        console.log("\n=== CHECKING AND HASHING PLAIN TEXT PASSWORDS ===\n");

        // Check Staff
        const staffMembers = await Staff.find({});
        let staffUpdated = 0;

        console.log(`Found ${staffMembers.length} staff members. Checking passwords...`);

        for (const staff of staffMembers) {
            if (staff.password) {
                const isHashed = staff.password.startsWith('$2a$') || staff.password.startsWith('$2b$');

                if (!isHashed) {
                    console.log(`\n⚠️  Staff: ${staff.name} (${staff.email})`);
                    console.log(`   Plain text password found: "${staff.password}"`);

                    // Hash the password
                    const hashedPassword = await bcrypt.hash(staff.password, 10);
                    staff.password = hashedPassword;
                    await staff.save();

                    console.log(`   ✅ Password hashed successfully!`);
                    staffUpdated++;
                }
            }
        }

        // Check Owners
        const owners = await Owner.find({});
        let ownersUpdated = 0;

        console.log(`\nFound ${owners.length} owners. Checking passwords...`);

        for (const owner of owners) {
            if (owner.password) {
                const isHashed = owner.password.startsWith('$2a$') || owner.password.startsWith('$2b$');

                if (!isHashed) {
                    console.log(`\n⚠️  Owner: ${owner.name} (${owner.email})`);
                    console.log(`   Plain text password found: "${owner.password}"`);

                    // Hash the password
                    const hashedPassword = await bcrypt.hash(owner.password, 10);
                    owner.password = hashedPassword;
                    await owner.save();

                    console.log(`   ✅ Password hashed successfully!`);
                    ownersUpdated++;
                }
            }
        }

        console.log("\n=== SUMMARY ===");
        console.log(`Staff passwords hashed: ${staffUpdated}`);
        console.log(`Owner passwords hashed: ${ownersUpdated}`);
        console.log(`Total passwords secured: ${staffUpdated + ownersUpdated}`);

        if (staffUpdated === 0 && ownersUpdated === 0) {
            console.log("\n✅ All passwords are already hashed. No action needed.");
        } else {
            console.log("\n✅ All plain text passwords have been hashed!");
        }

        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

hashPlainTextPasswords();
