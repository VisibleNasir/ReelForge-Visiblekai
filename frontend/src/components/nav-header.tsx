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

const NavHeader = ({ credits, email }: { credits: number; email: string }) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-lg font-semibold tracking-tight"
        >
          ReelForge
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Credits */}
          <div className="flex items-center gap-2 rounded-full border bg-muted/40 px-2 py-1">
            <Badge
              variant="secondary"
              className="h-7 rounded-full px-3 text-xs font-medium"
            >
              {credits} credits
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-7 rounded-full px-3 text-xs"
            >
              <Link href="/dashboard/billing">Buy more</Link>
            </Button>
          </div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 w-9 rounded-full border bg-background p-0 hover:bg-muted"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-sm font-medium">
                    {email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl p-2"
            >
              <DropdownMenuLabel className="px-2 py-1.5">
                <p className="text-xs font-medium text-muted-foreground">
                  Signed in as
                </p>
                <p className="truncate text-sm font-medium">{email}</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                <Link href="/dashboard/billing">Billing</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/login" })}
                className="cursor-pointer rounded-md text-destructive focus:text-destructive"
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
