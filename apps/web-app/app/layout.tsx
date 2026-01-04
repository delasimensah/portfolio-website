import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import React from "react";

import { appfont } from "@/constants";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Template App",
  description: "A starter Next.js application",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={appfont.variable} suppressHydrationWarning>
      <body className="font-regular bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
