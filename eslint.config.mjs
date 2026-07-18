import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Allow the leading-underscore convention for intentionally-unused bindings
      // (e.g. destructuring away dnd-kit's role/tabIndex).
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // We use a handful of legitimate mount/hydration effects that sync React
      // state from browser-only sources (localStorage, matchMedia, next-themes).
      // These are correct uses of setState-in-effect, so treat this rule as advisory.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    ignores: [".next/**", "out/**", "node_modules/**", "playwright-report/**", "test-results/**"],
  },
];

export default eslintConfig;
