// @ts-check

import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginAstro from "eslint-plugin-astro"
import jsxA11y from "eslint-plugin-jsx-a11y"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config({
  ignores: [".astro", "src/env.d.ts"],
  extends: [
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
    jsxA11y.flatConfigs.recommended,
    eslintConfigPrettier,
  ],
})
