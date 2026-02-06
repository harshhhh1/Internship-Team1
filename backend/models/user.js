import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'staff' },
  registeredAt: { type: Date, default: Date.now }
}, { strict: false });

const User = mongoose.model("User", userSchema);

export const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export default User;
