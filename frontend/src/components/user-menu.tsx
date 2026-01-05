"use client";

import {  signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link
        href="/login"
        className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-100 dark:text-zinc-900"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
        <span className="text-sm">Hello, {session.user?.name}</span>
      <button
        onClick={() => signOut()}
        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        Logout
      </button>
    </div>
  );
}
