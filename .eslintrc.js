module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint'],
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    "browser": true,
    "node": true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    indent: 'off',
    'max-len': ['error', { code: 120 }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'operator-linebreak': 'off',
    'no-param-reassign': ['error', { props: false }],
    'object-curly-newline': 'off',
  },
};
