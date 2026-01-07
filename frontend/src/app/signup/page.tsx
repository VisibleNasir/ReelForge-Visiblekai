"use server";

import { redirect } from "next/navigation";
import { SignupForm } from "~/components/signup-form";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function Page() {
  const session = await auth();

  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true },
    });

    if (user) {
      redirect("/user/dashboard");
    }
  }

  return (
    <div className="flex h-screen  w-full items-center justify-center  md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
