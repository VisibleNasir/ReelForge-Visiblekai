import Link from "next/link";
import { ThemeToggle } from "~/components/theme-toggle";
import { UserMenu } from "~/components/user-menu";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">
            ReelForge
          </h1>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight leading-tight">
          Podcast Clips.
          <br />
          <span className="text-zinc-600 dark:text-zinc-400">
            Done Automatically.
          </span>
        </h2>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          Generate vertical clips, detect viral moments, and burn subtitles —
          all in one AI-powered workflow.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/user/dashboard"
            className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-100 dark:text-zinc-900 hover:opacity-90 transition"
          >
            Open Dashboard
          </Link>

          <Link
            href="/user/dashboard"
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            Generate Clips
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} ReelForge
        </div>
      </footer>
    </main>
  );
}
