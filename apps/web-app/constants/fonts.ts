/**
 * Font System for Web App
 *
 * Uses next/font/local for optimal font loading.
 * Fonts are stored in assets/fonts/ directory.
 *
 * Usage:
 * import { satoshiFont } from "@/constants";
 *
 * In app/layout.tsx:
 * <body className={satoshiFont.className}>
 *
 * In tailwind.config.js:
 * fontFamily: { sans: [satoshiFont.style.fontFamily] }
 */

import localFont from "next/font/local";

// Primary font family - add your font files to assets/fonts/
export const appfont = localFont({
  src: [
    {
      path: "../assets/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--app-font",
  display: "swap",
});
