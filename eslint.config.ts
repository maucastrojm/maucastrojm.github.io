import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfigWithVueTs(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
  ...tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],
  eslintPrettier,
  vueTsConfigs.recommended,
  eslintPluginUnicorn.configs.unopinionated,
  pluginVitest.configs.recommended,
  {
    files: ['**/*.{ts,mts,tsx,vue}', 'src/**/__tests__/*'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'vue/max-attributes-per-line': ['off'],
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/multi-word-component-names': ['off'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-console': ['error'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/require-default-prop': ['off'],
      'vue/padding-line-between-blocks': ['error', 'never'],
      'unicorn/filename-case': [
        'error',
        {
          case: 'camelCase',
          ignore: ['\.vue', '\.d\.ts', '\.spec\.ts'],
        },
      ],
      'unicorn/no-abusive-eslint-disable': ['off'],
      'unicorn/prevent-abbreviations': ['off'],
    },
  },
);
