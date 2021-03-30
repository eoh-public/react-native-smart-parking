module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 72.54,
      branches: 66.08,
      functions: 62.48,
      lines: 73.02,
    },
  },
  coveragePathIgnorePatterns: ['/Images/', '/\\.json/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/libs/**',
  ],
  transformIgnorePatterns: ['node_modules/(?!react\b)\bw+\b'],
  setupFiles: [
    'dotenv/config',
    './jest/setup.js',
    './jest/google_signin.setup.js',
    './jest/fbsdk.setup.js',
    './jest/react-native-reanimated.setup.js',
    './jest/react-native-stripe.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['./jest/test-setup.js'],
  globalSetup: './jest/global-setup.js',
  testEnvironment: 'jsdom',
};
