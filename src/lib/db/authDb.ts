import mongoose from "mongoose";
import { AUTH_DB } from "@/constants";

type connectionObject = {
  isConnected?: number;
  authDB?: mongoose.Connection;
};

const connection: connectionObject = {};

async function connectToAuthDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to databse");
    return;
  }

  try {
    const authDB = await mongoose.createConnection(
      `${process.env.MONGO_URI}/${AUTH_DB}`
    );

    connection.isConnected = authDB.readyState;

    connection.authDB = authDB;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error while connecting to database: ", error);
    process.exit(1);
  }
}

async function getAuthDBConnection(): Promise<mongoose.Connection> {
  if (connection.authDB && connection.isConnected) {
    console.log("Already connected to auth db");
    return connection.authDB!;
  }

  await connectToAuthDB();
  return connection.authDB!;
}

export { connectToAuthDB, getAuthDBConnection };
