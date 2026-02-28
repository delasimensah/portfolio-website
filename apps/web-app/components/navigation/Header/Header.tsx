"use client";

import { Box } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@/utils";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
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
          <Link href="/" className="text-xl font-bold text-text-primary">
            delasi mensah
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
            className="text-text-primary hover:text-accent-primary md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <IconMenu2 size={24} />
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
