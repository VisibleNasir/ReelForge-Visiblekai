"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";

import { Badge } from "./ui/badge";
import { ModeToggle } from "./ui/mode-toggle";

const NavHeader = ({ credits, email }: { credits: number; email: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      link: "/user/dashboard",
    },
    {
      name: "Upload",
      link: "/user/upload",
    },
    {
      name: "Clips",
      link: "/user/clips",
    },
    {
      name: "Billing",
      link: "/billing",
    },
  ];

  return (
    <div className="relative z-50 w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className="h-20 px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-neutral-900 dark:text-white"
          >
            ReelForge
          </Link>

          <NavItems items={navItems} />

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-full px-4 py-2 text-sm"
            >
              Credits: {credits}
            </Badge>

            <ModeToggle />

            <NavbarButton variant="secondary">
              {email.charAt(0).toUpperCase()}
            </NavbarButton>

            <NavbarButton
              variant="primary"
              onClick={() => signOut({ redirectTo: "/login" })}
            >
              Sign out
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white"
            >
              ReelForge
            </Link>

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}

            <div className="flex w-full flex-col gap-4 pt-4">
              <div className="rounded-xl border border-neutral-200 p-4 text-sm dark:border-neutral-800">
                <p className="text-neutral-500">Signed in as</p>
                <p className="truncate font-medium text-neutral-900 dark:text-white">
                  {email}
                </p>
                <p className="mt-2 text-neutral-500">Credits: {credits}</p>
              </div>

              <NavbarButton variant="secondary" className="w-full">
                <Link href="/billing">Billing</Link>
              </NavbarButton>

              <NavbarButton
                variant="primary"
                className="w-full"
                onClick={() => signOut({ redirectTo: "/login" })}
              >
                Sign out
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NavHeader;