"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md dark:shadow-gray-600 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-row md:flex-row items-center justify-between">
        <div>
          <a
            href="#"
            className="text-xl font-bold mb-4 md:mb-0 dark:text-slate-200"
          >
            True Feedback
          </a>
        </div>
        <div className="flex gap-2">
          {!session && (
            <Link href="/sign-up" className="flex justify-end">
              <Button
                className="w-full md:w-auto dark:bg-black dark:text-slate-200 dark:border-2 dark:border-slate-500 dark:hover:text-slate-300 bg-slate-100 text-black"
                variant={"outline"}
              >
                Sign up
              </Button>
            </Link>
          )}
          {session ? (
            <>
              <span className="mr-4 flex items-center">
                Welcome, {user?.username || user?.email}
              </span>
              <Button
                className="w-full md:w-auto bg-slate-100 text-black"
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
