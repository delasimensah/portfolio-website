"use client";

import { Box } from "@mantine/core";
import {
  IconBrandGithub,
  // IconBrandInstagram,
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
  // { href: "https://www.instagram.com/_delasimensah/", icon: IconBrandInstagram, label: "Instagram" },
  {
    href: "https://github.com/delasimensah",
    icon: IconBrandGithub,
    label: "GitHub",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-surface border-t border-gray-800 py-12">
      <Box className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="grid gap-8 md:grid-cols-3">
          <Box>
            <div className="text-text-primary mb-4 text-xl font-bold">
              delasi mensah
            </div>
            <p className="text-text-secondary">
              Web and mobile products delivered in 4–8 weeks.
            </p>
          </Box>
          <Box>
            <h4 className="text-text-primary mb-4 font-semibold">Company</h4>
            <ul className="text-text-secondary space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-accent-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <h4 className="text-text-primary mb-4 font-semibold">Connect</h4>
            <Box className="flex space-x-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-hover text-white transition-opacity hover:opacity-90"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className="text-text-secondary mt-8 border-t border-gray-800 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} delasi mensah. All rights
            reserved.
          </p>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
