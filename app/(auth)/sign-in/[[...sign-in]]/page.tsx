"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  return (
    <SignIn.Root>
      <SignIn.Step name="start">
        <div className="flex flex-col gap-3">
          <Clerk.Connection
            name="google"
            className="w-[220px] text-indigo-950 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 cursor-pointer py-2 rounded-lg"
          >
            <span className="flex items-center justify-center gap-2 text-sm">
              <FaGoogle />
              Continue with Google
            </span>
          </Clerk.Connection>

          <Clerk.Connection
            name="github"
            className="w-[220px] text-indigo-950 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 cursor-pointer py-2 rounded-lg"
          >
            <span className="flex items-center justify-center gap-2 text-sm">
              <FaGithub />
              Continue with GitHub
            </span>
          </Clerk.Connection>

          <Link
            href="/sign-up"
            className="text-xs text-center text-gray-400 pt-4 hover:underline"
          >
            Don't have an account?
          </Link>
        </div>
      </SignIn.Step>
    </SignIn.Root>
  );
}
