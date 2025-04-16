import { getAuthDBConnection } from "@/lib/db/authDb";
import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for Subject
export interface Subject {
  subjectName: string;
  chapters: string[];
}

// Interface for Course
export interface Course extends Document {
  courseName: string;
  semester: string;
  subjects: Subject[];
  createdBy: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

// Subject Schema
const subjectSchema = new Schema<Subject>({
  subjectName: {
    type: String,
    required: [true, "Subject name is required"],
    trim: true,
  },
  chapters: {
    type: [String],
    required: [true, "Subject chapters are required"],
  },
});

// Course Schema
const CourseSchema = new Schema<Course>({
  courseName: {
    type: String,
    required: [true, "Course name is required"],
    trim: true,
  },
  semester: {
    type: String,
    required: [true, "Course semester is required"],
  },
  subjects: {
    type: [subjectSchema],
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "created by field is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
});

async function getCourseModel(): Promise<mongoose.Model<Course>> {
  const connection = await getAuthDBConnection();

  const CourseModel =
    (connection.models.Course as mongoose.Model<Course>) ||
    connection.model<Course>("Course", CourseSchema);

  return CourseModel;
}
export { getCourseModel };
