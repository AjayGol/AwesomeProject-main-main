module.exports = {
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    '@react-native-community',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/no-unresolved': 0,
    'no-warning-comments': 0,
    'no-console': [
      'warn',
      { allow: ['clear', 'info', 'error', 'dir', 'warn'] },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto' },
      { usePrettierrc: true },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': ['error', 'never'],
    'react/prop-types': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/require-default-props': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-alert': 'off',
    camelcase: 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-useless-escape': 'off',
    radix: 'off',
  },
};
