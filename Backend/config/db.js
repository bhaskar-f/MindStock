import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined.");
  }

  const dbconnected = await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
  return dbconnected.connection;
};

export default connectDB;
