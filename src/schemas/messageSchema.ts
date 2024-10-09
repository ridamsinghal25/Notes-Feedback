import { z } from "zod";

export const messageSchema = z.object({
  subject: z
    .string()
    .min(3, { message: "subject must be atleast 3 characters" })
    .max(30, "subject must be no longer than 30 characters"),
  chapterNumber: z
    .string()
    .min(1, { message: "chapter number must be atleast 1 digit" })
    .max(10, "chapter number must be no longer than 10 digits"),
  feedback: z
    .string()
    .min(10, { message: "content must be of an atleast 10 characters" })
    .max(100, "content must be no longer than 300 characters"),
});
