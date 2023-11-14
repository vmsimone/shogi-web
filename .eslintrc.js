module.exports = {
  env: {
    browser: true, // Enable browser globals such as `window` and `document`
    es6: true // Enable ES6 features such as arrow functions and template literals
  },
  extends: [
    "eslint:recommended", // Use the recommended ESLint rules
    "plugin:@typescript-eslint/recommended", // Use the recommended TypeScript ESLint rules
    "prettier" // Use Prettier to format code
  ],
  plugins: ["@typescript-eslint"], // Use the TypeScript ESLint plugin
  parser: "@typescript-eslint/parser", // Use the TypeScript parser for ESLint
  parserOptions: {
    "sourceType": "module", // Allow the use of imports and exports
    "project": "./tsconfig.json" // Use the TypeScript project configuration file
  },
  root: true, // This configuration file is the root ESLint configuration file
  rules: {} // No additional rules are specified
}