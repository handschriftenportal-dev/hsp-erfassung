import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jest from "eslint-plugin-jest";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths"
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ["**/*.css", "**/*.json"],
}, ...fixupConfigRules(compat.extends(
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:jest/recommended",
  "plugin:react-hooks/recommended",
  "prettier",
)), {
  plugins: {
    react,
    "@typescript-eslint": fixupPluginRules(typescriptEslint),
    jest: fixupPluginRules(jest),
    prettier,
    "react-hooks": fixupPluginRules(reactHooks),
    "simple-import-sort": simpleImportSort,
    "no-relative-import-paths": noRelativeImportPaths
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: tsParser,
    ecmaVersion: 2018,
    sourceType: "module",
    parserOptions: {
      project: "./tsconfig.json",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    "no-multiple-empty-lines": "error",
    "no-throw-literal": "error",
    "padded-blocks": ["error", "never"],
    "space-before-function-paren": ["error", {
      anonymous: "always",
      named: "never",
      asyncArrow: "always",
    }],

    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
    }],
    "@typescript-eslint/no-use-before-define": ["error", {
      functions: false,
    }],
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "jest/expect-expect": "error",

    "react-hooks/set-state-in-effect": "warn", // Should be error
    "react-hooks/use-memo": "warn", // Should be error
    "react-hooks/preserve-manual-memoization": "warn", // Should be error
    "react-hooks/static-components": "warn", // Should be error

    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react/self-closing-comp": "error",
    "react/jsx-boolean-value": ["error", "never"],
    "react/jsx-uses-vars": "error",

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { "allowSameFolder": true }
    ],
  },
}];
