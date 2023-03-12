module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-var-requires": 0,
  },
}
