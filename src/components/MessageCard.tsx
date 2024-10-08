"use client";

import React from "react";
import {
  Card,
  CardDescription,
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
import { X } from "lucide-react";
import { Message } from "@/models/User";
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
        <div className="w-full flex flex-row justify-between items-center">
          <CardTitle className="text-lg dark:text-slate-400">
            {message?.content}
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
        <CardDescription className="text-blue-950 dark:text-slate-500">
          {formattedDate}, {formattedTime}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default MessageCard;
