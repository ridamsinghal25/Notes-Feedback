"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ApiResponse } from "@/types/ApiResponse";
import { useParams } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";

function PublicProfile() {
  const params = useParams();
  const fullName = params.fullName;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const messageContent = form.watch("content");

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/send-message", {
        fullName,
        ...data,
      });

      toast({
        title: response?.data?.message,
      });
    } catch (error) {
      console.log("Error while sending message", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError?.response?.data?.message;

      toast({
        title: "Request failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="p-4 md:p-6 shadow-md dark:shadow-gray-600 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-end">
          <ModeToggle />
        </div>
      </nav>
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl  dark:bg-black">
        <h1 className="text-4xl text-center font-bold mb-4 dark:text-gray-300">
          Public Profile Link
        </h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 dark:text-gray-400">
            Send Anonymous Messages to @{fullName}
          </h2>{" "}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 "
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here"
                        className="resize-none dark:text-gray-300 dark:border-gray-500 dark:border-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || !messageContent}
                  variant={"dark"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Send it"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PublicProfile;
