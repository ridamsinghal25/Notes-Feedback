"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ApiResponse } from "@/types/ApiResponse";
import { useParams } from "next/navigation";
import withProtectedRoute from "@/components/WithProtectedRoutes";
import FormFieldInput from "@/components/FormFieldInput";
import { decodeBase64 } from "@/helpers/encodeAndDecode";

function PublicProfile() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  console.log(params);
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      chapterNumber: "",
      feedback: "",
    },
  });

  const ParamRollNumber = String(params.rollNumber);

  const decodedRollNumber: string = decodeBase64(ParamRollNumber);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/send-message", {
        notesCreatorRollNumber: decodedRollNumber,
        ...data,
      });

      toast({
        title: response?.data?.message,
      });

      // form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError?.response?.data?.message;

      toast({
        title: "Request failed",
        description:
          errorMessage || "Something went wrong while sending message",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Feedback Form
            </h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormFieldInput
                form={form}
                label="Subject"
                name="subject"
                placeholder="Enter subject"
              />

              <FormFieldInput
                form={form}
                label="Chapter Number"
                name="chapterNumber"
                placeholder="Enter chapter number"
              />

              <FormField
                control={form.control}
                name="feedback"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error && "dark:text-red-500"}
                    >
                      Feedback
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your feedback here"
                        {...field}
                        className="resize-none h-32 "
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button variant="dark" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Feedback"
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

export default withProtectedRoute(PublicProfile);
