import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import { eslintPluginPrettier } from './config/eslint/prettier.mjs';
import { eslintPluginReactConfig } from './config/eslint/react.mjs';
import { eslintPluginTypescriptConfig } from './config/eslint/typescript.mjs';
import { globals } from './config/eslint/globals.mjs';

const compat = new FlatCompat();

export default [
  ...eslintPluginTypescriptConfig,
  ...eslintPluginReactConfig,
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')),
  ...eslintPluginPrettier,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
    ignores: ['.next/'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
  },
];
