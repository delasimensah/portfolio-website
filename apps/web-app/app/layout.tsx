import "@mantine/core/styles.css";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import React from "react";

import { Footer, Header } from "@/components";
import { appfont } from "@/constants";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Delasi Mensah | Web and mobile products delivered in 4–8 weeks.",
  description: "I build web and mobile products for startups and businesses.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={appfont.variable} suppressHydrationWarning>
      <body
        className={`${appfont.variable} bg-bg-primary text-text-primary font-sans`}
      >
        <Providers>
          <Header />
          <main className="pt-8 md:pt-10 lg:pt-12">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
