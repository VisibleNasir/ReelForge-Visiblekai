import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "~/components/providers";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "ReelForge - Podcast Clipper",
  description: "Create reels from your podcast episodes with AI",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`} suppressHydrationWarning>
      <head>
        {/* Razorpay Payment Script */}
        <script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          async 
        />
      </head>
      <body className="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 selection:bg-zinc-500">
        <SessionProvider> 
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}