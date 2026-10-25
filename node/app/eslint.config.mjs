import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jest from "eslint-plugin-jest";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";
import { fileURLToPath } from "node:url";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));
const files = ["**/*.{js,jsx,ts,tsx}"];

export default [
  includeIgnoreFile(gitignorePath),
  // Next が再生成する。triple-slash の path 参照は recommended に触れる
  { ignores: ["next-env.d.ts"] },
  {
    files,
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { ...js.configs.recommended, files },
  ...tseslint.configs["flat/recommended"].map((config) => ({
    ...config,
    files: config.files ?? files,
  })),
  { ...react.configs.flat.recommended, files },
  { ...react.configs.flat["jsx-runtime"], files },
  { ...reactHooks.configs["recommended-latest"], files },
  { ...jest.configs["flat/recommended"], files },
  { ...prettier, files },
  {
    // tsconfig include は ts/tsx だけ。js に project を渡すと parser が落ちる
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    files,
    rules: {
      "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
