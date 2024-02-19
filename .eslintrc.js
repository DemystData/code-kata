module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    quotes: ["error", "single"],
    indent: ["error", 4],
    semi: ["error", "always"],
    "no-console": "error",
  },
  ignorePatterns: ["package-lock.json", "package.json"],
  plugins: ["jest"],
};
