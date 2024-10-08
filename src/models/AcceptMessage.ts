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

const AcceptMessageModel =
  (mongoose.models.AcceptMessage as mongoose.Model<AcceptMessage>) ||
  mongoose.model<AcceptMessage>("AcceptMessage", AcceptMessageSchema);

export default AcceptMessageModel;
