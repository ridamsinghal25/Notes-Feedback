import { AvailableUserRoles, UserRolesEnum } from "@/constants";
import { getAuthDBConnection } from "@/lib/db/authDb";
import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  email: string;
  rollNumber: string;
  password: string;
  fullName: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  course: mongoose.Schema.Types.ObjectId;
  isEmailVerified: boolean;
  emailVerificationToken: string;
  emailVerificationExpiry: Date;
  forgotPasswordToken: string;
  forgotPasswordExpiry: Date;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, "roll number is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      trim: true,
    },
    avatar: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

async function getUserModel(): Promise<mongoose.Model<User>> {
  const connection = await getAuthDBConnection();

  const UserModel =
    (connection.models.User as mongoose.Model<User>) ||
    connection.model<User>("User", UserSchema);

  return UserModel;
}

export { getUserModel };
