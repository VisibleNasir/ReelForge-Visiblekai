import Link from "next/link";
import { redirect } from "next/navigation";
import NavHeader from "~/components/nav-header";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export  default async function HomePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true, email: true },
    });
  return (
    <div className="h-screen ">
      <NavHeader credits={user.credits} email={user.email} />

      <div className="flex flex-col  justify-center w-full h-[40rem]">
        <div className="   px-6 py-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight leading-tight">
          Podcast Clips.
          <br />
          <span className="text-zinc-600 dark:text-zinc-400">
            Done Automatically.
          </span>
        </h2>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          Generate vertical clips, detect viral moments, and burn subtitles
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/user/dashboard"  
            className="rounded-lg text-zinc-100 border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium bg-zinc-900 hover:bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 transition"
          >
            Generate Clips
          </Link>

          <Link
            href="/user/dashboard"  
            className="rounded-lg text-zinc-950 border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium  hover:bg-zinc-950  dark:text-zinc-100 transition"
          >
            Burn subtitles
          </Link>
        </div>
      </div>
      </div>
      

      
    </div>
  );
}
