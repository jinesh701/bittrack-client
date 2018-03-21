module.exports = {
  extends: ['airbnb-base', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    jest: true,
    browser: true
  },
  rules: {
    'comma-dangle': 0,
    'react/jsx-uses-vars': 1,
    'react/display-name': 1,
    'no-console': 1,
    'arrow-parens': ['error', 'as-needed'],
    'import/no-named-as-default': 0
  }
};
