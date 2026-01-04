"use server";

import { redirect } from "next/navigation";
import { LoginForm } from "~/components/login-form";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function Page() {
  const session = await auth();

  if (session?.user?.id) {
    // Check if user exists in database
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true },
    });

    if (user) {
      // User exists, redirect to dashboard
      redirect("/dashboard");
    }
    // If user doesn't exist, stay on login
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
