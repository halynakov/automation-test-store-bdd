import js from '@eslint/js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import playwright from 'eslint-plugin-playwright'
import prettier from 'eslint-config-prettier'
import noOnlyTagRule from './eslint-rules/no-only-tag.js'
import noInlinePageLocatorsRule from './eslint-rules/no-inline-page-locators.js'

const featureParser = {
  parse(text) {
    return {
      type: 'Program',
      body: [],
      sourceType: 'script',
      range: [0, text.length],
      loc: {
        start: { line: 1, column: 0 },
        end: { line: text.split('\n').length, column: 0 }
      },
      tokens: [],
      comments: []
    }
  }
}

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      '.features-gen/**',
      'playwright-report/**',
      'test-results/**',
      'allure-results/**',
      'allure-report/**'
    ]
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-networkidle': 'warn',
      'playwright/no-conditional-in-test': 'off'
    }
  },
  {
    files: ['**/*.feature'],
    languageOptions: {
      parser: featureParser
    },
    plugins: {
      'bdd-rules': {
        rules: {
          'no-only-tag': noOnlyTagRule
        }
      }
    },
    rules: {
      'bdd-rules/no-only-tag': 'error'
    }
  },
  {
    files: ['src/pages/**/*.ts'],
    plugins: {
      framework: {
        rules: {
          'no-inline-page-locators': noInlinePageLocatorsRule
        }
      }
    },
    rules: {
      'framework/no-inline-page-locators': 'error'
    }
  },
  prettier
]
