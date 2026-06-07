"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import StaggeredMenu from "~/components/StaggeredMenu";
import { Badge } from "./ui/badge";
import { ModeToggle } from "./ui/mode-toggle";
import { NavbarButton } from "./ui/resizable-navbar";

const NavHeader = ({ credits, email }: { credits: number; email: string }) => {
  const menuItems = [
    {
      label: "Upload Link",
      ariaLabel: "Go to dashboard",
      link: "/user/dashboard/youtube",
    },
    {
      label: "Upload Video",
      ariaLabel: "Upload video",
      link: "/user/dashboard/upload",
    },
    {
      label: "Burn Subtitles",
      ariaLabel: "Burn subtitles",
      link: "/user/dashboard/subtitles",
    },
    {
      label: "My Clips",
      ariaLabel: "View my clips",
      link: "/user/dashboard/clips",
    },
    {
      label: "Content Studio",
      ariaLabel: "Go to content studio",
      link: "/user/dashboard/content",
    },
    {
      label: "Billing",
      ariaLabel: "Go to billing",
      link: "/billing",
    },
  ];

  const socialItems = [
    {
      label: "GitHub",
      link: "#",
    },
    {
      label: "LinkedIn",
      link: "#",
    },
    {
      label: "Support",
      link: "mailto:support@reelforge.com",
    },
  ];

  return (
    <>
      {/* Top Navbar Info */}
      <header className="fixed left-0 top-0 z-[60] w-full border-b border-zinc-800 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold text-white">
            ReelForge
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="rounded-full px-4 py-2 text-sm">
              Credits: {credits}
            </Badge>

            <ModeToggle />

            <NavbarButton variant="secondary">
              {email.charAt(0).toUpperCase()}
            </NavbarButton>

            <NavbarButton variant="primary" onClick={() => signOut({ redirectTo: "/login" })}>
              Sign out
            </NavbarButton>
          </div>
        </div>
      </header>

      {/* Animated Staggered Menu */}
      <div className="fixed right-6 top-0 z-[70] h-20 w-[120px] pointer-events-none">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen={true}
          colors={["#09090b", "#18181b", "#5227FF"]}
          accentColor="#8b5cf6"
          isFixed={true}
        />    
      </div>
    </>
  );
};

export default NavHeader;