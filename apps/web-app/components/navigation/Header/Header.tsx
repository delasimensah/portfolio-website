"use client";

import { Box } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@/utils";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "My Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (href: string) =>
    cn(
      "transition-colors duration-200",
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "text-accent-primary font-medium"
        : "text-text-secondary hover:text-accent-primary"
    );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-bg-surface/80 backdrop-blur-sm">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-text-primary"
            aria-label="The Digital Nomad home"
          >
            The Digital{" "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-hover bg-clip-text text-transparent">
              Nomad
            </span>
          </Link>
          <nav className="hidden md:flex md:space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-hover text-white transition-opacity hover:opacity-90 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <IconMenu2 size={22} />
          </button>
        </Box>
        {mobileMenuOpen && (
          <nav className="flex flex-col space-y-4 border-t border-gray-800 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </Box>
    </header>
  );
};

export default Header;
