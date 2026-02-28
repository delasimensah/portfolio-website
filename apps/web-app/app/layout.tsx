import "@mantine/core/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import React from "react";

import { Footer, Header } from "@/components";
import { appfont } from "@/constants";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Delasi Mensah",
  description:
    "I build web and mobile products for startups and businesses.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={appfont.variable} suppressHydrationWarning>
      <body className={`${appfont.variable} bg-bg-primary font-sans text-text-primary`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
