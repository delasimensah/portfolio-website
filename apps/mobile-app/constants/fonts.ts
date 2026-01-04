/**
 * Font System for Mobile App
 *
 * Font loading configuration for React Native.
 * Uses expo-font for loading custom fonts.
 *
 * Usage:
 * import { FONTS, FONT_LOADING_MAP } from "@/constants";
 *
 * In app/_layout.tsx:
 * const [loaded] = useFonts(FONT_LOADING_MAP);
 *
 * In components:
 * className="font-regular" or className="font-bold"
 */

// Font name constants (generic names for easy font switching)
export const FONTS = {
  light: "Template-Light",
  regular: "Template-Regular",
  medium: "Template-Medium",
  bold: "Template-Bold",
  black: "Template-Black",
} as const;

// Font mapping for expo-font loading
// Add your font files to assets/fonts/ and update paths here
export const FONT_LOADING_MAP = {
  [FONTS.light]: require("../assets/fonts/Satoshi-Light.otf"),
  [FONTS.regular]: require("../assets/fonts/Satoshi-Regular.otf"),
  [FONTS.medium]: require("../assets/fonts/Satoshi-Medium.otf"),
  [FONTS.bold]: require("../assets/fonts/Satoshi-Bold.otf"),
  [FONTS.black]: require("../assets/fonts/Satoshi-Black.otf"),
} as const;
