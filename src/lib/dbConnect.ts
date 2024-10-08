import mongoose from "mongoose";
import { DB_NAME } from "@/constants";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to databse");
    return;
  }

  try {
    const db = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error while connecting to database: ", error);
    process.exit(1);
  }
}

export default dbConnect;
