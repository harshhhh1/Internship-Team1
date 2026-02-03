import db from "./db/connection.js";

async function testConnection() {
    try {
        console.log("Attempting to access collection...");
        const collection = db.collection("users");
        console.log("Collection accessed. Finding one user...");
        const user = await collection.findOne({});
        console.log("Found user (or null):", user);

        console.log("Attempting to insert dummy user...");
        const result = await collection.insertOne({
            username: "debug_user_" + Date.now(),
            email: "debug_" + Date.now() + "@example.com",
            password: "password",
            registeredAt: new Date()
        });
        console.log("Insert successful:", result);
        process.exit(0);
    } catch (error) {
        console.error("DEBUG ERROR:", error);
        process.exit(1);
    }
}

testConnection();
