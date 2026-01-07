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
      paths: {
        "@/*": ["./*"],
        shared: ["../../packages/shared/src/index.ts"],
        "shared/*": ["../../packages/shared/src/*"],
      },
    },
    skipProject: true,
  });

  try {
    require("tsconfig-paths").register({
      baseUrl: ".",
      paths: {
        "@/*": ["./*"],
        shared: ["../../packages/shared/src/index.ts"],
        "shared/*": ["../../packages/shared/src/*"],
      },
    });
  } catch (e) {
    // tsconfig-paths not available, continue without it
  }
} catch (e) {
  console.warn("ts-node not available, ensure constants are compiled to JS");
}

/** @type {import('tailwindcss').Config} */
const { COLORS } = require("./constants/colors.ts");
// Only import FONTS (font names), not FONT_LOADING_MAP (which requires .otf files)
let FONTS;
try {
  const fontsModule = require("./constants/fonts.ts");
  FONTS = fontsModule.FONTS;
} catch (e) {
  // Fallback font names if fonts.ts can't be loaded
  console.warn("Could not load fonts.ts:", e.message);
  FONTS = {
    light: "Font-Light",
    regular: "Font-Regular",
    medium: "Font-Medium",
    bold: "Font-Bold",
    black: "Font-Black",
  };
}

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [require("nativewind/preset")],
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
      },
      fontFamily: {
        "app-light": [FONTS.light],
        "app-regular": [FONTS.regular],
        "app-medium": [FONTS.medium],
        "app-bold": [FONTS.bold],
        "app-black": [FONTS.black],
      },
    },
  },
  plugins: [],
};

