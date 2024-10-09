import { getAuthDBConnection } from "@/lib/db/authDb";
import mongoose, { Document, Schema } from "mongoose";

export interface Course extends Document {
  courseName: string;
  semester: string;
  subjects: string[];
  startDate: Date;
  endDate: Date;
}

const CourseSchema: Schema<Course> = new Schema({
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
    type: [String],
    required: [true, "course subjects are required"],
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
