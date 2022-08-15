module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // https://eslint.org/docs/rules/
    'plugin:prettier/recommended', // https://github.com/prettier/eslint-plugin-prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  rules: {
    'no-console': 'warn',
  },
};
