// @ts-check

import { defineConfig, globalIgnores } from "eslint/config"
import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import jsxA11y from "eslint-plugin-jsx-a11y"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig(
  globalIgnores([".astro/", "dist/", "src/env.d.ts"]),
  {
    files: ["astro.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  eslintPluginAstro.configs.recommended,
  {
    extends: [jsxA11y.flatConfigs.recommended],
    settings: {
      "jsx-a11y": {
        attributes: {
          for: ["for"],
        },
      },
    },
  },
  eslintConfigPrettier,
)
