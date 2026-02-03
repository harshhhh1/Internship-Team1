import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collection = db.collection("users");

export const createUser = async (user) => {
  return await collection.insertOne(user);
};

export const findUserByEmail = async (email) => {
  return await collection.findOne({ email });
};

export const findUserById = async (id) => {
  return await collection.findOne({ _id: new ObjectId(id) });
};
