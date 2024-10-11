import mongoose from "mongoose";
import { APP_DB } from "@/constants";

type connectionObject = {
  isConnected?: number;
  appDB?: mongoose.Connection;
};

const connection: connectionObject = {};

async function connectToAppDB(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to databse");
    return;
  }

  try {
    const appDB = await mongoose.createConnection(
      `${process.env.MONGO_URI}/${APP_DB}`
    );

    connection.isConnected = appDB.readyState;

    connection.appDB = appDB;

    console.log("DB connected successfully");

    return;
  } catch (error) {
    console.log("Error while connecting to database: ", error);
    process.exit(1);
  }
}

async function getAppDBConnection(): Promise<mongoose.Connection> {
  if (connection.appDB && connection.isConnected) {
    console.log("Already connected to app db");
    return connection.appDB!;
  }

  await connectToAppDB();
  return connection.appDB!;
}

export { connectToAppDB, getAppDBConnection };
