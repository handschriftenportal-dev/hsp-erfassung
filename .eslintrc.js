module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
    'cypress',
    'react-hooks'
  ],
  ignorePatterns: ['**/*.css', '**/*.json'],
  rules: {
    'quote-props': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
    'no-throw-literal': 1,
    'padded-blocks': 0,
    'sort-keys': 0,
    'brace-style': 0,
    'comma-dangle': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': 1,
    'react/jsx-uses-vars': 2,
    'jest/expect-expect': 0,
    'react-hooks/rules-of-hooks': ['warn'],
    'react-hooks/exhaustive-deps': ['warn']
  }
}
