import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl: string = process.env.MONGODB_URI || "";

if (!dbUrl) {
  console.error("No MongoDB connection string. Set MONGODB_URI environment variable.");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(dbUrl);
    console.log(`Database connected with ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to database: ${error.message}`);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};
