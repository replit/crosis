import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.js", "**/*.ts"],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        'src': "./tsconfig.json",
        'src-browser': "./tsconfig.json",
      },
      globals: {
        window: true,
        browser: true,
        node: true,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'import/prefer-default-export': 'off',
      indent: 'off',
      'implicit-arrow-linebreak': 'off', // conflicts with prettier
      'no-unused-expressions': 'off', // breaks optional chaining
      '@typescript-eslint/no-unused-expressions': 'error',
      'max-len': ['error', { code: 120 }],
      '@typescript-eslint/no-empty-function': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'operator-linebreak': 'off',
      'no-param-reassign': ['error', { props: false }],
      'object-curly-newline': 'off',
    },
    ignores: [
      "*.d.ts",
      "api.js",
      "webpack.config.js",
    ],
  }
);
