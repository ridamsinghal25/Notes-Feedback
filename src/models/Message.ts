import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  subject: string;
  chapterNumber: number;
  feedback: string;
  userId: Schema.Types.ObjectId;
}

const MessageSchema: Schema<Message> = new Schema({
  subject: {
    type: String,
    required: [true, "subject is required"],
  },
  chapterNumber: {
    type: Number,
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

const MessageModel =
  (mongoose.models.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>("Message", MessageSchema);

export default MessageModel;
