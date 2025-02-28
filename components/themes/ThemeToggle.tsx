"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-indigo-600 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all bg-transparent"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-indigo-600" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-600" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-950"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="text-indigo-900 dark:text-indigo-200 dark:hover:text-indigo-400! transition-all hover:cursor-pointer hover:bg-indigo-100! dark:hover:bg-indigo-900!"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="text-indigo-900 dark:text-indigo-200 dark:hover:text-indigo-400! transition-all hover:cursor-pointer hover:bg-indigo-100! dark:hover:bg-indigo-900!"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="text-indigo-900 dark:text-indigo-200 dark:hover:text-indigo-400! transition-all hover:cursor-pointer hover:bg-indigo-100! dark:hover:bg-indigo-900!"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
