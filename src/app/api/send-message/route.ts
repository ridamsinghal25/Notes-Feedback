import { connectToAppDB } from "@/lib/db/appDB";
import { getMessageModel } from "@/models/Message";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { getAcceptMessageModel } from "@/models/AcceptMessage";

export async function POST(request: Request) {
  await connectToAppDB();
  const MessageModel = await getMessageModel();
  const AcceptMessageModel = await getAcceptMessageModel();

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

  const userId = user?._id;

  try {
    const { subject, chapterNumber, feedback } = await request.json();

    if (
      [subject, chapterNumber, feedback].some(
        (field) => field?.trim() === "" || !field
      )
    ) {
      return Response.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const isUserAcceptingMessages = await AcceptMessageModel.findOne({
      userId,
    });

    if (!isUserAcceptingMessages?.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 400 }
      );
    }

    const createNewMessage = await MessageModel.create({
      subject,
      chapterNumber,
      feedback,
      userId,
    });

    if (!createNewMessage) {
      return Response.json(
        {
          success: false,
          message: "Failed to send message",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message send successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error sending messages: ", error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
