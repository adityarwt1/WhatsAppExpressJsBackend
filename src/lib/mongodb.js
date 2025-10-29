import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "WhatsAppBackednExpress",
    });
    console.log("connected to mongodb db name: WhatsAppBackednExpress");
  } catch (error) {
    console.log(error);
  }
};
