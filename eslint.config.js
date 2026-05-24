import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import electronToolkit from "@electron-toolkit/eslint-config-ts";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["out/**", "dist/**", "node_modules/**", "**/*.d.ts"],
  },
  js.configs.recommended,
  ...electronToolkit.configs.recommended,
  {
    plugins: { unicorn },
    rules: {
      ...unicorn.configs.recommended.rules,
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/import-style": "off",
    },
  },
  {
    files: ["src/main/**/*.ts", "src/preload/**/*.ts", "electron.vite.config.ts"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ["src/renderer/**/*.ts"],
    languageOptions: { globals: { ...globals.browser } },
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
