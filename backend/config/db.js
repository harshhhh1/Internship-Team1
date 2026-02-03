import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
    return Promise.resolve();
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    return Promise.reject(error);
  }
};
export default connectDB;

