const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
	{
    languageOptions: {
      ecmaVersion: 6
    },
    rules: {
      semi: 2
    }
  }
]);
