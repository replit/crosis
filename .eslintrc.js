module.exports = {
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'operator-linebreak': 'off',
    'no-param-reassign': ['error', { props: false }],
    'object-curly-newline': 'off',
  },
};
