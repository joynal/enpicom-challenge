module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "no-console": 0,
    "no-underscore-dangle": 0,
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "no-use-before-define": ["error", { "variables": false }],
    "no-multi-str": 0,
    "no-continue": 0,
    "no-return-await": 0
  },
  "env": {
    "node": true,
    "mocha": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "project": ["./tsconfig.json"]
  },
  "extends": [
    "airbnb-typescript"
  ]
}
