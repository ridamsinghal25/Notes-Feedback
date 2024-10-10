"use client";

import { useToast } from "@/components/ui/use-toast";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Dashboard from "../presentation/Dashboard";
import ApiLogic from "./ApiLogic";

function DashboardContainer() {
  const { toast } = useToast();
  const { data: session, status } = useSession();

  const {
    messages,
    isLoading,
    isSwitchLoading,
    acceptMessages,
    fetchMessages,
    handleSwitchChange,
    handleDeleteMessage,
  } = ApiLogic();

  if (status === "loading") {
    return null;
  }

  const { fullName } = session?.user as User;

  // TODO: reserach it
  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  const profileUrl = `${baseUrl}/u/${fullName}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL copied to clipboard",
      description: "Profile copied to clipboard",
    });
  };

  return (
    <Dashboard
      messages={messages}
      isLoading={isLoading}
      isSwitchLoading={isSwitchLoading}
      profileUrl={profileUrl}
      acceptMessages={acceptMessages}
      fetchMessages={fetchMessages}
      handleSwitchChange={handleSwitchChange}
      handleDeleteMessage={handleDeleteMessage}
      copyToClipboard={copyToClipboard}
    />
  );
}

export default DashboardContainer;
