"use client";

import SignInSkeleton from "@/components/SignInSkeleton";
import SignInWrapper from "./container/SignInContainer";

function SignIn() {
  // return <SignInWrapper />;
  return (
    <>
      <SignInSkeleton />
      <SignInWrapper />
    </>
  );
}

export default SignIn;
