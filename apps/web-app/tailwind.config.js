// Register ts-node to enable TypeScript support in Tailwind config
try {
  require("ts-node").register({
    transpileOnly: true,
    compilerOptions: {
      module: "commonjs",
      esModuleInterop: true,
      moduleResolution: "node",
      target: "es2020",
      skipLibCheck: true,
      baseUrl: ".",
      paths: { "@/*": ["./*"] },
    },
    skipProject: true,
  });

  try {
    require("tsconfig-paths").register({
      baseUrl: ".",
      paths: { "@/*": ["./*"] },
    });
  } catch (error) {
    // tsconfig-paths not available, continue without it
    console.error("tsconfig-paths not available, continue without it", error);
  }
} catch (error) {
  console.error(
    "ts-node not available, ensure constants are compiled to JS",
    error
  );
}

/** @type {import('tailwindcss').Config} */
const { COLORS } = require("./constants/colors.ts");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: COLORS.white,
        black: COLORS.black,
        grey: COLORS.grey,
        lightGrey: COLORS.lightGrey,
        darkGrey: COLORS.darkGrey,
        border: COLORS.border,
        shimmerLight: COLORS.shimmerLight,
        "bg-primary": COLORS.bgPrimary,
        "bg-surface": COLORS.bgSurface,
        "text-primary": COLORS.textPrimary,
        "text-secondary": COLORS.textSecondary,
        "accent-primary": COLORS.accentPrimary,
        "accent-hover": COLORS.accentHover,
      },
      fontFamily: {
        sans: ["var(--app-font)", "Inter", "system-ui", "sans-serif"],
        appFont: ["var(--app-font)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

