import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { connectToAppDB } from "@/lib/db/appDB";
import { User } from "next-auth";
import { getMessageModel } from "@/models/Message";

export async function POST(request: Request) {
  await connectToAppDB();
  const MessageModel = await getMessageModel();

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
    const getMessages = await MessageModel.find();

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
