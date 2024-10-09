import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { connectToAppDB } from "@/lib/db/appDB";
import { User } from "next-auth";
import { getAcceptMessageModel } from "@/models/AcceptMessage";

export async function POST(request: Request) {
  await connectToAppDB();
  const AcceptMessageModel = await getAcceptMessageModel();

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

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const acceptMessage = await AcceptMessageModel.findOne({ userId });

    if (!acceptMessage) {
      return Response.json(
        {
          success: false,
          message: "Something went wrong while accepting messages",
        },
        { status: 404 }
      );
    }

    acceptMessage.isAcceptingMessages = acceptMessages;
    await acceptMessage.save();

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user status to accept messages", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connectToAppDB();
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

  const userId = user._id;

  try {
    const foundUser = await AcceptMessageModel.findOne({ userId });

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting message acceptance status", error);

    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status",
      },
      { status: 500 }
    );
  }
}
