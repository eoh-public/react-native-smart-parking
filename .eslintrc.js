module.exports = {
  root: true,
  // parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   project: './tsconfig.json',
  //   ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
  //   sourceType: "module" // Allows for the use of imports
  // },
  plugins: [
    '@typescript-eslint',
    'promise',
    //'import',
  ],
  extends: [
    '@react-native-community',
    'eslint:recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'max-len': ['error', { code: 120 }],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'only-multiline',
        functions: 'never',
      },
    ],
    'no-console': 2,
    'no-var': 2,
    eqeqeq: 2,
    'no-prototype-builtins': 1,
    'no-empty': 1,
    'no-case-declarations': 1,
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 2,
    'react-native/no-color-literals': 2,
    'react/jsx-no-bind': [
      2,
      {
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowBind: false,
      },
    ],
    //promisee
    'promise/prefer-await-to-then': 2,
    'promise/prefer-await-to-callbacks': 2,
    'promise/no-return-wrap': 2,
  },
  ignorePatterns: ['assets/**/*.js', 'coverage/**/*.js', "src/libs/**/*.js"],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
};
