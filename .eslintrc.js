module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    'shared-node-browser': true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module',
  },
  globals: {
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
    __webpack_require__: true,
    baseURL: true,
  },
  rules: {
    semi: [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
};
