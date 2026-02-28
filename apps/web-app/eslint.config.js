const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "simple-import-sort": require("eslint-plugin-simple-import-sort"),
      import: require("eslint-plugin-import"),
      jest: require("eslint-plugin-jest"),
    },
    rules: {
      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],

      // Code Quality
      "prefer-const": "error",
      "no-console": ["error", { allow: ["error"] }],

      // Import Organization
      "simple-import-sort/imports": "error",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"],
          ],
        },
      ],

      // File Size Management
      "max-lines": [
        "warn",
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
  {
    // Exempt test files, layout files, service files, and hook files from max-lines rule
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*layout.tsx",
      "services/**/*.ts",
      "hooks/**/*.ts",
    ],
    rules: {
      "max-lines": "off",
    },
  },
  {
    // Jest-specific configuration for test files
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    ...require("eslint-plugin-jest").configs["flat/recommended"],
    rules: {
      "import/order": "off",
    },
  },
  {
    ignores: [".next/*", "node_modules/*", "dist/*", "build/*"],
  },
];
