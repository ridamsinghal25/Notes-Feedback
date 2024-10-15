"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { UserRolesEnum } from "@/constants";

function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 md:p-6 shadow-md dark:shadow-gray-600 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-row md:flex-row items-center justify-between gap-5">
        <div>
          <Link
            href={
              session?.user?.role === UserRolesEnum.ADMIN ? "/dashboard" : "#"
            }
            className="text-xl font-bold mb-4 md:mb-0 dark:text-slate-200"
          >
            Notes Feedback
          </Link>
        </div>
        <div className="flex gap-2">
          {session ? (
            <>
              <Button
                className="w-full md:w-auto bg-slate-100 text-black hover:text-white hover:border-white hover:border-2"
                variant={"dark"}
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant={"dark"}>Login</Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
