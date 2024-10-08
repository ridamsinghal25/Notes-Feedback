import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import MessageModel from "@/models/Message";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const { subject } = await request.json();

    if (!subject) {
      return Response.json(
        {
          success: false,
          message: "Subject is required",
        },
        { status: 400 }
      );
    }

    const getMessages = await MessageModel.find({ subject });

    if (getMessages?.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No messages found",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: getMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while getting user message: ", error);
    return Response.json(
      {
        success: false,
        message: "Error while getting message",
      },
      { status: 500 }
    );
  }
}
