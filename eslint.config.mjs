import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Turn off warnings for 'any' type
      "@typescript-eslint/no-unsafe-assignment": "off", // Turn off warnings for assignments involving 'any'
      "@typescript-eslint/no-unsafe-member-access": "off", // Turn off warnings for property access on 'any'
      "@typescript-eslint/no-unsafe-call": "off", // Turn off warnings for calling functions of type 'any'
      "@typescript-eslint/no-unsafe-return": "off", // Turn off warnings for returning 'any'
    },
  },
];

export default eslintConfig;