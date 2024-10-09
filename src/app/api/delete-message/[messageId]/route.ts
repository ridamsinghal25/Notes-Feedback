import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { connectToAppDB } from "@/lib/db/appDB";
import { User } from "next-auth";
import { getMessageModel } from "@/models/Message";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  await connectToAppDB();
  const MessageModel = await getMessageModel();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        messsage: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const messageId = params.messageId;

    if (!mongoose.isValidObjectId(messageId)) {
      return Response.json(
        {
          success: false,
          message: "Invalid message Id",
        },
        { status: 400 }
      );
    }

    const deletedMessage = await MessageModel.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in delete message route: ", error);
    return Response.json(
      {
        success: false,
        message: "Error while deleting message",
      },
      { status: 500 }
    );
  }
}
