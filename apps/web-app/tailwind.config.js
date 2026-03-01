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
        "accent-secondary": COLORS.accentSecondary,
        "accent-secondary-dark": COLORS.accentSecondaryDark,
        success: COLORS.success,
        "success-dark": COLORS.successDark,
        error: COLORS.error,
        "error-dark": COLORS.errorDark,
        warm: COLORS.warm,
        "warm-dark": COLORS.warmDark,
      },
      backgroundImage: {
        "gradient-subtle": "linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, transparent 50%, rgba(6, 182, 212, 0.06) 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
      },
      fontFamily: {
        sans: ["var(--app-font)", "Inter", "system-ui", "sans-serif"],
        appFont: ["var(--app-font)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

