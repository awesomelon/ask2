// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default [
  {
    ignores: ['dist/**'],
  },
  // Base JS and TS recommended type-checked configurations
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    // Common language options for TS/TSX files
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json', './tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // React Hooks plugin configuration
  // Assuming reactHooks.configs['recommended-latest'] is a flat config object
  // If it's not, it might need to be { files: ..., plugins: ..., rules: ... }
  {
    files: ['**/*.{ts,tsx}'], // Apply only to ts/tsx files
    ...reactHooks.configs['recommended-latest'], // Spread the config if it's a flat config object
  },
  // React Refresh plugin configuration
  // Assuming reactRefresh.configs.vite is a flat config object
  {
    files: ['**/*.{ts,tsx}'], // Apply only to ts/tsx files
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Storybook configuration
  // storybook.configs["flat/recommended"] should be a flat config object or an array of them.
  ...(Array.isArray(storybook.configs["flat/recommended"])
    ? storybook.configs["flat/recommended"]
    : [storybook.configs["flat/recommended"]])
];
