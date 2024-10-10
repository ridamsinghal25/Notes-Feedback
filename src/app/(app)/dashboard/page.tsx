"use client";

import withProtectedRoute from "@/components/WithProtectedRoutes";
import DashboardContainer from "./container/DashboardContainer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserRolesEnum } from "@/constants";
import { useEffect } from "react";

function UserDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role !== UserRolesEnum.ADMIN) {
      router.replace("/access-denied");
    }
  }, [session, router]);

  return <DashboardContainer />;
}

export default withProtectedRoute(UserDashboard);
