"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/user/dashboard/youtube", label: "Youtube Link" },
  { href: "/user/dashboard/upload", label: "Upload Video" },
  { href: "/user/dashboard/subtitles", label: "Burn Subtitles" },
  { href: "/user/dashboard/clips", label: "My Clips" },
  { href: "/user/dashboard/content", label: "Content Studio" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 inline-flex h-14 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 p-1.5 backdrop-blur-xl">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-8 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-white text-zinc-900 shadow-lg"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
}