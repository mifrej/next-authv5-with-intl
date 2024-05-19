// @ts-check

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export const eslintPluginPrettier = [
  {
    plugins: {
      prettier: eslintPluginPrettierRecommended.plugins.prettier,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto', singleQuote: true }],
    },
  },
];
