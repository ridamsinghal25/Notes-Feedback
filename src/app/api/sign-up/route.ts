import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationemail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "Please fill all the entry",
        },
        { status: 400 }
      );
    }

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists",
          },
          { status: 400 }
        );
      } else {
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = expiryDate;

        await existingUserByEmail.save();
      }
    } else {
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    // send verification email
    const verificationEmailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    console.log("verificationEmailResponse: ", verificationEmailResponse);

    if (!verificationEmailResponse.success) {
      return Response.json(
        {
          success: false,
          message: verificationEmailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while registering user: ", error);
    return Response.json(
      {
        success: true,
        message: "Error while registering user",
      },
      {
        status: 500,
      }
    );
  }
}
