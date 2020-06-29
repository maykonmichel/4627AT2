module.exports = {
  root: true,
  extends: ["airbnb", "prettier"],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": [
      "error",
      {
        ignore: ["children"],
      },
    ],
    "no-console": "error",
  },
};
