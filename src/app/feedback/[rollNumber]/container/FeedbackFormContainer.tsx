"use client";

import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { messageSchema } from "@/schemas/messageSchema";
import * as z from "zod";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { useParams } from "next/navigation";
import { decodeBase64 } from "@/helpers/encodeAndDecode";
import FeedbackForm from "../presentation/FeedbackForm";

function FeedbackFormContainer() {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchUserSubjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/get-user-subjects");

      if (response?.data?.subjects) {
        setSubjects(response?.data?.subjects!);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Error",
        description:
          axiosError.response?.data?.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserSubjects();
  }, [fetchUserSubjects]);

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
    <FeedbackForm
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      subjects={subjects}
      isLoading={isLoading}
    />
  );
}

export default FeedbackFormContainer;
