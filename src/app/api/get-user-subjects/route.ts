import { connectToAuthDB } from "@/lib/db/authDb";
import { getCourseModel } from "@/models/Course";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";

export async function GET() {
  await connectToAuthDB();
  const CourseModel = await getCourseModel();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const userCourse = await CourseModel.findById(user.course);

    if (!userCourse) {
      return Response.json(
        {
          success: false,
          message: "No subjects found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        subjects: userCourse.subjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while getting user subjects: ", error);
    return Response.json(
      {
        success: false,
        message: "Error while getting subjects",
      },
      { status: 500 }
    );
  }
}
