import { Message } from "@/models/Message";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>;
  subjects?: Array<string>;
}
