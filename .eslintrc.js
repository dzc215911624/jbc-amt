module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "ENV": true
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "no-unused-vars": "error", // 禁止未使用的变量。
    "no-mixed-spaces-and-tabs": "warn", // 禁止混合使用空格和制表符进行缩进。
    "indent": ["warn", 2], // 缩进2
    "no-useless-return": "error", // 禁止不必要的 `return` 语句
    "no-unneeded-ternary": "error", // 禁止不必要的三元表达式。
    "no-self-assign": "error", // 禁止将变量赋值给自己。
    "no-nested-ternary": "error" // 禁止使用多层嵌套的三元表达式。
  }
};