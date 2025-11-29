const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const tailwindcss = require("eslint-plugin-tailwindcss");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    plugins: {
      tailwindcss: tailwindcss,
    },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off", // Allow custom styles + Tailwind
      // Additional React Native rules if needed
      "react-native/no-unused-styles": "warn",
      "react-native/split-platform-components": "warn",
      "react-native/no-inline-styles": "warn",
    },
    // Specify file extensions to lint (optional)
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
]);
