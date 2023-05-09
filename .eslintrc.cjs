module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
  ],
  parser: "vue-eslint-parser",
  rules: {
    "vue/no-undef-properties": [
      "error",
      {
        ignores: ["/^\\$/"],
      },
    ],
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": [
      "error",
      {
        allowProps: false,
      },
    ],
  },
};
