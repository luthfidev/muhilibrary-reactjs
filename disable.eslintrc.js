module.exports = {
  parser:'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    "plugin:jsx-a11y/recommended",
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['error','windows'],
    "semi": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
};
