import pluginJs from "@eslint/js"
import pluginImport from "eslint-plugin-import"
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import pluginReact from "eslint-plugin-react"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginPrettierRecommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  pluginImport.flatConfigs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: "readonly",
      },
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // "import/no-unresolved": "off",
      "import/no-cycle": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "@/app/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/pages/**",
              group: "external",
              position: "after",
            },
            {
              pattern: "@/shared/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]
