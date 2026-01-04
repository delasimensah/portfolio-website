/**
 * Color System - Shared Package
 *
 * All colors are defined here as the single source of truth.
 * Apps import and re-export these colors from their own constants.
 *
 * Customize these colors for your project.
 */

export const COLORS = {
  // Basic colors
  white: "#FFFFFF",
  black: "#000000",

  // Neutral grays
  grey: "#808080",
  lightGrey: "#C2C2C2",
  darkGrey: "#1C1C1C",

  // Skeleton colors (for loading states)
  border: "#262626",
  shimmerLight: "#303030",
} as const;
