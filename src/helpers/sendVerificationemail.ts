import { resend } from "@/lib/resend";
import VerifyEmail from "../../emails/VerifyEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code",
      react: VerifyEmail({ username, verifyCode }),
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (Emailerror) {
    console.log("Error occured while sending verification email: ", Emailerror);
    return { success: false, message: "Failed to send verification email." };
  }
}
