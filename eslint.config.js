import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        localStorage: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
      prettier: prettierPlugin,
    },
    rules: {
      "no-unused-vars": [
        "off",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off", // si React 17+
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
