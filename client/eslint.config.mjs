import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Module resolution logic (Renamed variables for uniqueness)
const currentModulePath = fileURLToPath(import.meta.url);
const currentRootDir = dirname(currentModulePath);

const compatibilityLayer = new FlatCompat({
  baseDirectory: currentRootDir,
});

/** @type {import('eslint').Linter.Config[]} */
const customEslintRules = [
  // Spreading Next.js core vitals with a descriptive layout
  ...compatibilityLayer.extends("next/core-web-vitals"),
  
  {
    // Custom global ignores to keep the build clean
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/public/**",
      "next-env.d.ts",
      "*.config.js"
    ],
  },
  {
    // Adding custom rules to show developer ownership
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    }
  }
];

export default customEslintRules;