module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:jsx-a11y/recommended'],
  ignorePatterns: ['dist', 'backend', 'node_modules'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['jsx-a11y'],
};
