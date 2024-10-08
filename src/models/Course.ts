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

const CourseModel =
  (mongoose.models.Course as mongoose.Model<Course>) ||
  mongoose.model<Course>("Course", CourseSchema);

export default CourseModel;
