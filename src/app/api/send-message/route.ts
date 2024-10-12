import { connectToAppDB } from "@/lib/db/appDB";
import { getMessageModel } from "@/models/Message";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { getAcceptMessageModel } from "@/models/AcceptMessage";
import { getUserModel } from "@/models/User";

export async function POST(request: Request) {
  await connectToAppDB();
  const MessageModel = await getMessageModel();
  const AcceptMessageModel = await getAcceptMessageModel();
  const UserModel = await getUserModel();

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
    const { subject, chapterNumber, feedback, notesCreatorRollNumber } =
      await request.json();

    if (
      [subject, chapterNumber, feedback, notesCreatorRollNumber].some(
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

    const isCreatorExists = await UserModel.findOne({
      rollNumber: notesCreatorRollNumber,
    });

    if (!isCreatorExists) {
      return Response.json(
        {
          success: false,
          message: "The user does not exist to whom you are sending message",
        },
        { status: 404 }
      );
    }

    const isUserAcceptingMessages = await AcceptMessageModel.findOne({
      userId: isCreatorExists._id,
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
      notesCreatorId: isUserAcceptingMessages?.userId,
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
