"use client";

import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import ThemeToggle from "./themes/ThemeToggle";
import { Rocket } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50 dark:bg-[#0f172a]/80 dark:border-slate-900">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Rocket
                className="w-6 h-6 text-indigo-600 dark:text-indigo-200"
                size={2}
              />
              <h1 className="text-xl font-semibold bg-gradient-to-r dark:from-indigo-300 dark:to-indigo-100 bg-clip-text text-transparent from-indigo-700 to-indigo-400">
                BoostCreator
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <SignedIn>
              <Link href="/manage-plan">
                <Button
                  variant="outline"
                  className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-transparent bg-clip-text border border-indigo-500 hover:border-indigo-800 hover:cursor-pointer hover:text-indigo-800"
                >
                  Manage Plan
                </Button>
              </Link>

              <div className="w-9.5 h-9.5 flex items-center justify-center rounded-full border border-indigo-600">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="bg-gradient-to-r from-indigo-600 to-indigo-600 text-transparent bg-clip-text hover:cursor-pointer"
                >
                  Sign in
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
