// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'unused-imports': unusedImports,
      'import': importPlugin
    },
    rules: {
      // Turn off base rule to avoid conflicts
      'no-unused-vars': 'off',
      
      // Make unused imports and exports an error
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          'vars': 'all',
          'varsIgnorePattern': '^_',
          'args': 'after-used', 
          'argsIgnorePattern': '^_'
        }
      ],
      
      // Additional rule to catch unused exports specifically
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'vars': 'all',
          'args': 'after-used',
          'ignoreRestSiblings': false,
          'varsIgnorePattern': '^_',
          'argsIgnorePattern': '^_'
        }
      ],
      
      // Make unreachable code an error
      'no-unreachable': 'error',
      
      // Make unused labels an error
      'no-unused-labels': 'error',
      
      // Make unused expressions an error
      'no-unused-expressions': 'error'
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'playground/**']
  }
);