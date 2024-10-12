"use client";

import MessageCard from "@/components/MessageCard";
import UserDashboardSkeletion from "@/components/UserDashboardSkeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/models/Message";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

type Props = {
  messages: Message[];
  isLoading: boolean;
  isSwitchLoading: boolean;
  profileUrl: string;
  acceptMessages: boolean;
  fetchMessages: (refresh: boolean) => void;
  handleSwitchChange: () => void;
  handleDeleteMessage: (messageId: string) => void;
  copyToClipboard: () => void;
};

function Dashboard({
  messages,
  isLoading,
  isSwitchLoading,
  profileUrl,
  acceptMessages,
  fetchMessages,
  handleSwitchChange,
  handleDeleteMessage,
  copyToClipboard,
}: Props) {
  const { data: session, status } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register } = form;

  if (status === "loading") {
    return <UserDashboardSkeletion />;
  }

  if (!session || !session.user) {
    return <div></div>;
  }

  return (
    <div className="my-8 sm:mx-4 md:mx-2 lg:mx-auto p-6 pl-6 dark:bg-black bg-white rounded w-full max-w-6xl">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 dark:text-gray-300">
        Welcome {session.user?.fullName}, your Dashboard
      </h1>

      <div className="mb-4">
        <h2 className="text-lg dark:text-gray-400 font-semibold mb-2">
          Copy Your Unique Link
        </h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="dark:border-gray-500 dark:border-2 dark:text-gray-300 rounded w-full p-2 mr-2"
          />
          <Button variant="dark" onClick={copyToClipboard}>
            Copy
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2 dark:text-gray-400">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator className="dark:bg-gray-400" />

      <Button
        className="mt-4 dark:border-gray-400 dark:border-2"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
