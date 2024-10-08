import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToAuthDB } from "@/lib/db/authDb";
import { getUserModel } from "@/models/User";
import { getAcceptMessageModel } from "@/models/AcceptMessage";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email ...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectToAuthDB();
        try {
          const UserModel = await getUserModel();
          const AcceptMessageModel = await getAcceptMessageModel();

          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (!user.isEmailVerified) {
            throw new Error("Please verify your account before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }

          const isAcceptMessageModelExists = await AcceptMessageModel.findOne({
            userId: user._id,
          });

          if (!isAcceptMessageModelExists) {
            await AcceptMessageModel.create({
              userId: user._id,
              isAcceptingMessages: true,
            });
          }

          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isEmailVerified = user.isEmailVerified;
        token.fullName = user.fullName;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isEmailVerified = token.isEmailVerified;
        session.user.fullName = token.fullName;
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
