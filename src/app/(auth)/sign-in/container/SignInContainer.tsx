"use client";

import * as z from "zod";
import { Suspense, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import SignIn from "../presentation/SignIn";
import SignInSkeleton from "@/components/SignInSkeleton";

function SignInContainer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const router = useRouter();

  const callbackUrl = searchParams.get("callbackUrl");

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    setIsSubmitting(false);

    if (result?.error) {
      toast({
        title: "Login failed",
        description: result?.error || "Incorrect email or password",
        variant: "destructive",
      });
    }

    if (result?.url) {
      if (callbackUrl) {
        router.replace(callbackUrl);
        return;
      }

      router.replace("/dashboard");
    }
  };

  return <SignIn isSubmitting={isSubmitting} onSubmit={onSubmit} />;
}

export default function SignInWrapper() {
  return (
    <Suspense fallback={<SignInSkeleton />}>
      <SignInContainer />
    </Suspense>
  );
}
