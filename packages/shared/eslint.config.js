const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended"],
  }),
  {
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      "simple-import-sort": require("eslint-plugin-simple-import-sort"),
      import: require("eslint-plugin-import"),
      jest: require("eslint-plugin-jest"),
    },
    rules: {
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
      "prefer-const": "error",
      "no-console": ["error", { allow: ["error"] }],
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
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    ...require("eslint-plugin-jest").configs["flat/recommended"],
  },
  {
    ignores: ["node_modules/*", "dist/*"],
  },
];

