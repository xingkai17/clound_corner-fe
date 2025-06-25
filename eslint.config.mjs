import eslintPluginMpx from 'eslint-plugin-mpx';
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
