import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import tsdoc from "eslint-plugin-tsdoc";

export default tseslint.config([
  globalIgnores(["dist", "node_modules", "vite.config.ts", "coverage", "stats.html", "__snapshots__"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: {
      react,
      prettier: eslintPluginPrettier,
      tsdoc,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": "warn",
      "react-refresh/only-export-components": "off",
      "react/prop-types": "off",
      "tsdoc/syntax": "warn",
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always",
          semi: true,
          trailingComma: "es5",
          tabWidth: 2,
          endOfLine: "auto",
          useTabs: false,
          singleQuote: false,
          printWidth: 120,
          jsxSingleQuote: true,
        },
      ],
    },
  },
]);
