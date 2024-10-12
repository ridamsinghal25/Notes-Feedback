"use client";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { useParams } from "next/navigation";
import { decodeBase64 } from "@/helpers/encodeAndDecode";
import FeedbackForm from "../presentation/FeedbackForm";

function FeedbackFormContainer() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

      form.reset();
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

  return <FeedbackForm isSubmitting={isSubmitting} onSubmit={onSubmit} />;
}

export default FeedbackFormContainer;
