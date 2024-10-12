import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { connectToAppDB } from "@/lib/db/appDB";
import { User } from "next-auth";
import { getMessageModel } from "@/models/Message";
import { getUserModel } from "@/models/User";

export async function GET(request: Request) {
  await connectToAppDB();
  const MessageModel = await getMessageModel();
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

  try {
    const notesCreatorMessages = await MessageModel.find({
      notesCreatorId: user._id,
    }).lean();

    if (notesCreatorMessages?.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No messages found",
        },
        { status: 200 }
      );
    }

    const feedbackUserId = [
      ...new Set(
        notesCreatorMessages.map((message) => message.userId?.toString())
      ),
    ];

    const feedbackUser = await UserModel.find({
      _id: { $in: feedbackUserId },
    }).lean();

    const userMap = new Map(
      feedbackUser.map((user) => [user._id.toString(), user])
    );

    const messagesWithFeedbackUser = notesCreatorMessages.map((message) => {
      return {
        _id: message?._id,
        subject: message.subject,
        chapterNumber: message.chapterNumber,
        feedback: message.feedback,
        notesCreatorId: message.notesCreatorId,
        userInfo: userMap.get(message.userId?.toString()),
        createdAt: message.createdAt,
      };
    });

    return Response.json(
      {
        success: true,
        messages: messagesWithFeedbackUser,
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
