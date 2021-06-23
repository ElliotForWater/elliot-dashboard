module.exports = {
  extends: ['standard', 'standard-jsx', 'plugin:prettier/recommended'],
  settings: {
    react: {
      version: '16.13',
    },
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'jest'],
  rules: {
    'no-shadow': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-handler-names': 'warn',
    'react/jsx-pascal-case': 'warn',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-indent': 'off',
    camelcase: ['error', { allow: ['alt_description'] }],
  },
}
