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

    // ** Possible Errors
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // ** Best Practices

    // ** Strict Mode

    // ** Variables

    // ** Node.js and CommonJS

    // ** Stylistic Issues

    // 在数组开括号后和闭括号前强制换行 https://eslint.bootcss.com/docs/rules/array-bracket-newline
    'array-bracket-newline': [
      'error',
      'consistent',
    ],

    // 强制数组方括号中使用一致的空格 https://eslint.bootcss.com/docs/rules/array-bracket-spacing
    'array-bracket-spacing': [
      'error',
      'never',
      {
        'singleValue': true,
        'objectsInArrays': true,
        'arraysInArrays': true,
      },
    ],

    // 强制数组元素间出现换行 https://eslint.bootcss.com/docs/rules/array-element-newline
    'array-element-newline': [
      'error',
      'consistent',
    ],

    // 禁止或强制在代码块中开括号前和闭括号后有空格 https://eslint.bootcss.com/docs/rules/block-spacing
    'block-spacing': [
      'error',
      'always',
    ],

    // 强制在代码块中使用一致的大括号风格 https://eslint.bootcss.com/docs/rules/brace-style
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: false,
      },
    ],

    // 强制变量使用骆驼拼写法命名约定 https://eslint.bootcss.com/docs/rules/camelcase
    camelcase: [
      'error',
      {
        properties: 'always',
        ignoreDestructuring: false,
      },
    ],

    // 强制或禁止对注释的第一个字母大写 https://eslint.bootcss.com/docs/rules/capitalized-comments
    'capitalized-comments': [
      'error',
      'never',
    ],

    // 要求或禁止使用拖尾逗号 https://eslint.bootcss.com/docs/rules/comma-dangle
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],

    // 强制在逗号前后使用一致的空格 https://eslint.bootcss.com/docs/rules/comma-spacing
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],

    // 强制使用一致的逗号风格 https://eslint.bootcss.com/docs/rules/comma-style
    'comma-style': [
      'error',
      'last',
    ],

    // 强制在计算的属性的方括号中使用一致的空格 https://eslint.bootcss.com/docs/rules/computed-property-spacing
    'computed-property-spacing': [
      'error',
      'never',
    ],

    // 当获取当前执行环境的上下文this时，强制使用一致的命名 https://eslint.bootcss.com/docs/rules/consistent-this
    'consistent-this': [
      'error',
      'self',
    ],

    // 要求或禁止文件末尾存在空行 https://eslint.bootcss.com/docs/rules/eol-last
    'eol-last': [
      'error',
      'always',
    ],

    // 要求或禁止在函数标识符和其调用之间有空格 https://eslint.bootcss.com/docs/rules/func-call-spacing
    'func-call-spacing': [
      'error',
      'always',
    ],

    // 要求函数名与赋值给它们的变量名或属性名相匹配 https://eslint.bootcss.com/docs/rules/func-name-matching
    'func-name-matching': [
      'error',
      'never',
      {
        considerPropertyDescriptor: true,
        includeCommonJSModuleExports: true,
      },
    ],

    // 要求或禁止使用命名的 function 表达式 https://eslint.bootcss.com/docs/rules/func-names
    'func-names': [
      'error',
      'as-needed',
      {
        'generators': 'as-needed',
      },
    ],

    // 强制一致地使用 function 声明或表达式 https://eslint.bootcss.com/docs/rules/func-style
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],

    // 强制在函数括号内使用一致的换行 https://eslint.bootcss.com/docs/rules/function-paren-newline
    'function-paren-newline': [
      'error',
      'consistent',
    ],

    // 禁用指定的标识符 https://eslint.bootcss.com/docs/rules/id-blacklist
    'id-blacklist': [
      'error',
      'cb',
    ],

    // 强制标识符的最小和最大长度 https://eslint.bootcss.com/docs/rules/id-length
    'id-length': [
      'error',
      {
        min: 1,
        max: 25,
      },
    ],

    // 要求标识符匹配一个指定的正则表达式 https://eslint.bootcss.com/docs/rules/id-match
    'id-match': [
      'error',
      '^[a-z]+([A-Z][a-z]+)*$',
    ],

    // 强制隐式返回的箭头函数体的位置 https://eslint.bootcss.com/docs/rules/implicit-arrow-linebreak
    'implicit-arrow-linebreak': [
      'error',
      'beside',
    ],

    // 强制使用一致的缩进 https://eslint.bootcss.com/docs/rules/indent
    indent: [
      'error',
      2,
    ],

    // todo TODO
    // 强制在对象字面量的属性中键和值之间使用一致的间距 https://eslint.bootcss.com/docs/rules/key-spacing
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],

    // 强制在关键字前后使用一致的空格 https://eslint.bootcss.com/docs/rules/keyword-spacing
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],

    // 强制使用一致的换行符风格 https://eslint.bootcss.com/docs/rules/linebreak-style
    'linebreak-style': [
      'error',
      'windows',
    ],

    // 不允许多个空行 https://eslint.bootcss.com/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 1,
      },
    ],

    // 禁用行尾空格 https://eslint.bootcss.com/docs/rules/no-trailing-spaces
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: false,
        ignoreComments: false,
      },
    ],

    // 强制操作符使用一致的换行符风格 https://eslint.bootcss.com/docs/rules/operator-linebreak
    'operator-linebreak': [
      'error',
      'after',
    ],

    // 强制使用一致的反勾号、双引号或单引号 https://eslint.bootcss.com/docs/rules/quotes
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],

    // 要求或禁止使用分号代替 ASI（自动分号插入）https://eslint.bootcss.com/docs/rules/semi
    semi: [
      'error',
      'always',
    ],

    // 强制在 function的左括号之前使用一致的空格 https://eslint.bootcss.com/docs/rules/space-before-function-paren
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always',
      },
    ],

    // 强制在注释中 // 或 /* 使用一致的空格 https://eslint.bootcss.com/docs/rules/spaced-comment
    'spaced-comment': [
      'error',
      'always',
    ],

    // ** ECMAScript 6

  },
};
