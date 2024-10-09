import { getAppDBConnection } from "@/lib/db/appDB";
import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  subject: string;
  chapterNumber: string;
  feedback: string;
  userId: Schema.Types.ObjectId;
}

const MessageSchema: Schema<Message> = new Schema({
  subject: {
    type: String,
    required: [true, "subject is required"],
  },
  chapterNumber: {
    type: String,
    required: [true, "chapter number is required"],
  },
  feedback: {
    type: String,
    required: [true, "feedback is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"],
  },
});

async function getMessageModel(): Promise<mongoose.Model<Message>> {
  const connection = await getAppDBConnection();

  const MessageModel =
    (connection.models.Message as mongoose.Model<Message>) ||
    connection.model<Message>("Message", MessageSchema);

  return MessageModel;
}

export { getMessageModel };
