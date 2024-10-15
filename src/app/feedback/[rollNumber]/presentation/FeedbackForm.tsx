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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import FormFieldInput from "@/components/FormFieldInput";

type FeedbackFormProps = {
  isSubmitting: boolean;
  onSubmit: (data: z.infer<typeof messageSchema>) => Promise<void>;
  subjects: string[];
  isLoading: boolean;
};

function FeedbackForm({
  isSubmitting,
  onSubmit,
  subjects,
  isLoading,
}: FeedbackFormProps) {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: "",
      chapterNumber: "",
      feedback: "",
    },
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-xs sm:max-w-md lg:max-w-2xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Feedback Form
            </h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                onSubmit(data).then(() => form.reset())
              )}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="subject"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error && "dark:text-red-500"}
                    >
                      Subjects
                    </FormLabel>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Enter Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects?.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage
                      className={fieldState.error && "dark:text-red-500"}
                    />
                  </FormItem>
                )}
              />
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

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

export default FeedbackForm;
