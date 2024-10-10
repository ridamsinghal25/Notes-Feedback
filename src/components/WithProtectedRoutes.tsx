import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withProtectedRoute = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
      if (!session) {
        router.push("/sign-in");
      }
    }, [router, session]);

    return session ? <WrappedComponent {...props} /> : null;
  };
};

export default withProtectedRoute;
