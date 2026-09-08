/**
 * @type {import("prettier").Config}
 */
export default {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "src/styles/index.css",
  tailwindFunctions: ["cn", "cva"],
}
