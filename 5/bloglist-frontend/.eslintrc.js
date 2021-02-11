module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react', 'jest', 'cypress'
  ],
  rules: {
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
