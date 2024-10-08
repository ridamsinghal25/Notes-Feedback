import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./ui/separator";

function UserDashboardSkeletion() {
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 dark:bg-black bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 dark:text-gray-300">
        <Skeleton className="w-[300px] h-12 rounded-lg" />
      </h1>

      <div className="mb-4">
        <h2 className="text-lg dark:text-gray-400 font-semibold mb-2">
          <Skeleton className="h-4 w-[250px] mb-1" />
        </h2>{" "}
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-11/12" />

          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      <div className="mb-4 gap-2 flex">
        <Skeleton className="h-5 w-10 rounded-full" />
        <span className="ml-2 dark:text-gray-400">
          <Skeleton className="h-6 w-48" />
        </span>
      </div>
      <Separator className="dark:bg-gray-400" />

      <div>
        <Skeleton className="h-9 w-10 mt-5 rounded-md" />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-3/4 rounded-xl" />
        </div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-3/4 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default UserDashboardSkeletion;
