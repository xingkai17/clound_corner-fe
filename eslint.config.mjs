import eslintPluginMpx from 'eslint-plugin-mpx';
import eslintPluginVue from 'eslint-plugin-vue';
import mpxEslintParser from 'mpx-eslint-parser';

export default [
  {
    files: ['**/*.mpx'],
    languageOptions: {
      parser: mpxEslintParser,
      parserOptions: {
        parser: '@babel/eslint-parser',
        sourceType: 'module',
      },
      globals: {
        setTimeout: true,
        console: true,
        process: true,
      },
    },
    plugins: {
      mpx: eslintPluginMpx,
      vue: eslintPluginVue,
    },
    rules: {
      ...eslintPluginMpx.configs['mpx-essential'].rules,

      // 基础规则
      'indent': [2, 2, { 'SwitchCase': 1 }],
      'semi': [2, 'always'],
      'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'comma-dangle': [2, 'always-multiline'],
      'comma-spacing': [2, { 'before': false, 'after': true }],
      'comma-style': [2, 'last'],
      'no-trailing-spaces': 1,
      'eol-last': 2,
      'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 1, 'maxBOF': 0 }],
      'no-console': process.env.NODE_ENV === "production" ? "warn" : "off",
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

      // 空格和格式规则
      'object-curly-spacing': [2, 'always', { objectsInObjects: true }],
      'array-bracket-spacing': [2, 'never'],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'keyword-spacing': [2, { 'before': true, 'after': true }],
      'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
      'arrow-spacing': [2, { 'before': true, 'after': true }],
      'block-spacing': [2, 'always'],
      'brace-style': [2, '1tbs', { 'allowSingleLine': true }],

      // 代码质量规则
      'camelcase': [0, { 'properties': 'always' }],
      'eqeqeq': [2, 'allow-null'],
      'curly': [2, 'multi-line'],
      'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],
      'prefer-const': 2,

      // Vue 规则
      'vue/html-closing-bracket-newline': [2],
      'vue/html-closing-bracket-spacing': ['error', {
        'startTag': 'never',
        'endTag': 'never',
        'selfClosingTag': 'never',
      }],
      'vue/html-self-closing': ['error', {
        'html': { 'void': 'never', 'normal': 'any', 'component': 'always' },
        'svg': 'always',
        'math': 'always',
      }],
      'vue/max-attributes-per-line': [2, {
        'singleline': { 'max': 5 },
        'multiline': { 'max': 1 },
      }],
      'vue/no-parsing-error': [2, { 'invalid-first-character-of-tag-name': false }],
      'vue/no-side-effects-in-computed-properties': 2,
      'vue/no-v-html': 0,
      'vue/object-curly-spacing': [2, 'always', { objectsInObjects: true }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/space-infix-ops': 2,
      'vue/component-options-name-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'off',
      'vue/v-slot-style': 'off',
      'vue/no-mutating-props': 'off',
      'vue/no-lone-template': 'error',
      'vue/no-unused-vars': 'off',
      'vue/no-template-shadow': 2,
    },
  },
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: true,
        process: true,
      },
    },
    rules: {
      'indent': [2, 2, { 'SwitchCase': 1 }],
      'semi': [2, 'always'],
      'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'comma-dangle': [2, 'always-multiline'],
      'comma-spacing': [2, { 'before': false, 'after': true }],
      'comma-style': [2, 'last'],
      'no-trailing-spaces': 1,
      'eol-last': 2,
      'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 1, 'maxBOF': 0 }],
      'no-console': process.env.NODE_ENV === "production" ? "warn" : "off",
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'object-curly-spacing': [2, 'always', { objectsInObjects: true }],
      'array-bracket-spacing': [2, 'never'],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'keyword-spacing': [2, { 'before': true, 'after': true }],
      'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],
      'arrow-spacing': [2, { 'before': true, 'after': true }],
      'block-spacing': [2, 'always'],
      'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
      'camelcase': [0, { 'properties': 'always' }],
      'eqeqeq': [2, 'allow-null'],
      'curly': [2, 'multi-line'],
      'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],
      'prefer-const': 2,
    },
  },
];
