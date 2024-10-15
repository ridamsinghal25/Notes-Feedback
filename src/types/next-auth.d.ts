import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    course?: string;
    isEmailVerified?: boolean;
    isAcceptingMessages?: boolean;
    rollNumber?: string;
    fullName?: string;
    role?: string;
  }
  interface Session {
    user: {
      _id?: string;
      course?: string;
      isEmailVerified?: boolean;
      rollNumber?: string;
      fullName?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    course?: string;
    isEmailVerified?: boolean;
    isAcceptingMessages?: boolean;
    rollNumber?: string;
    fullName?: string;
    role?: string;
  }
}
