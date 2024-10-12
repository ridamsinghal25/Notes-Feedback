"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { CircleDivideIcon, X } from "lucide-react";
import { Message } from "@/models/Message";
import { useToast } from "./ui/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );

      toast({
        title: response.data.message,
      });

      onMessageDelete(message._id);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description:
          axiosError.response?.data?.message || "Error while deleting message",
        variant: "destructive",
      });
    }
  };

  const date = new Date(message.createdAt);
  const formattedDate = date.toDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <Card className="dark:border-slate-400 dark:border-2">
      <CardHeader>
        <div className="w-full flex flex-row justify-between items-center gap-5">
          <CardTitle className="text-lg md:text-xl dark:text-slate-400 break-all">
            {message?.feedback}
          </CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-12 flex justify-end dark:bg-red-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Subject
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
              {message?.subject || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Chapter Number
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
              {message?.chapterNumber || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Full Name
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
              {message?.userInfo?.fullName || "N/A"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Date
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-gray-200 break-all">
              {formattedDate}, {formattedTime}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MessageCard;
