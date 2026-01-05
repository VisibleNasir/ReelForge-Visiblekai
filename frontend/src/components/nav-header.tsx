"use client";

import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./ui/mode-toggle";

const NavHeader = ({ credits, email }: { credits: number; email: string }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          ReelForge
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Credits: {credits}
          </Badge>

          {/* Mode Toggle */}
          <div className="flex items-center">
            <ModeToggle />
          </div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-10 rounded-full border border-zinc-200 bg-white p-0 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-zinc-900 text-sm font-medium text-white dark:bg-white dark:text-zinc-900">
                    {email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 rounded-xl border border-zinc-200 bg-white p-3 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              <DropdownMenuLabel className="px-2 py-1.5">
                <p className="text-xs text-zinc-500">Signed in as</p>
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {email}
                </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

              <DropdownMenuItem className="text-sm">
                Add credits via UPI:
                <span className="ml-1 font-mono text-xs">7822952595@ibl</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Link href="/dashboard/billing">Billing</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />

              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/login" })}
                className="cursor-pointer rounded-md text-sm text-red-600 hover:bg-red-50 focus:text-red-600 dark:hover:bg-red-950"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default NavHeader;
