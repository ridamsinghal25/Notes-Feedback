import { getAppDBConnection } from "@/lib/db/appDB";
import mongoose, { Document, Schema } from "mongoose";

export interface AcceptMessage extends Document {
  isAcceptingMessages: boolean;
  userId: Schema.Types.ObjectId;
}

const AcceptMessageSchema: Schema<AcceptMessage> = new Schema({
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

async function getAcceptMessageModel(): Promise<mongoose.Model<AcceptMessage>> {
  const connection = await getAppDBConnection();

  const AcceptMessageModel =
    (connection.models.AcceptMessage as mongoose.Model<AcceptMessage>) ||
    connection.model<AcceptMessage>("AcceptMessage", AcceptMessageSchema);

  return AcceptMessageModel;
}

export { getAcceptMessageModel };
