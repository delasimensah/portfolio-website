"use client";

import { Box } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
};

const SOCIAL_LINKS = [
  { href: "#", icon: IconBrandInstagram, label: "Instagram" },
  { href: "#", icon: IconBrandGithub, label: "GitHub" },
];

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-800 bg-bg-surface py-12">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="grid gap-8 md:grid-cols-3">
          <Box>
            <div className="mb-4 text-xl font-bold text-text-primary">
              delasi mensah
            </div>
            <p className="text-text-secondary">
              Web and mobile products delivered in 6–8 weeks.
            </p>
          </Box>
          <Box>
            <h4 className="mb-4 font-semibold text-text-primary">Company</h4>
            <ul className="space-y-2 text-text-secondary">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-accent-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <h4 className="mb-4 font-semibold text-text-primary">Connect</h4>
            <Box className="flex space-x-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-text-secondary transition-colors hover:text-accent-primary"
                  aria-label={label}
                >
                  <Icon size={24} />
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className="mt-8 border-t border-gray-800 pt-8 text-center text-text-secondary">
          <p>&copy; {new Date().getFullYear()} delasi mensah. All rights reserved.</p>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
